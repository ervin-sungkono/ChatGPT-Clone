import { createParser } from "eventsource-parser";

const url = process.env.API_URL
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_KEY}`
    }
}
  
export async function OpenAIStream(payload) {
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()
    let counter = 0
  
    const res = await fetch(url, {
        ...options,
        body: JSON.stringify(payload),
    })
  
    const stream = new ReadableStream({
        async start(controller) {
          function onParse(event) {
            if (event.type === "event") {
              const data = event.data
              const json = JSON.parse(data)
              // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
              if (data === "[DONE]" || json.choices[0].finish_reason) {
                controller.close();
                return
              }
              try {
                const text = json.choices[0].delta?.content || "";
                if (counter < 2 && (text.match(/\n/) || []).length) return

                controller.enqueue(encoder.encode(text));
                counter++;
              } catch (e) {
                // maybe parse error
                controller.error(e);
              }
            }
          }
    
          // stream response (SSE) from OpenAI may be fragmented into multiple chunks
          // this ensures we properly read chunks and invoke an event for each SSE event stream
          const parser = createParser(onParse)
          // https://web.dev/streams/#asynchronous-iteration
          for await (const chunk of res.body) {
            parser.feed(decoder.decode(chunk))
          }
        },
      });

  
    return stream
}