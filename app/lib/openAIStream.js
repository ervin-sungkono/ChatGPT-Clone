import { createParser } from "eventsource-parser";

const url = "https://api.pawan.krd/v1/chat/completions"
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${process.env.OPENAI_KEY}`
    }
}
  
export async function OpenAIStream(payload) {
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()
  
    const res = await fetch(url, {
        ...options,
        body: JSON.stringify(payload),
    })
  
    const readableStream = new ReadableStream({
      async start(controller) {
        function onParse(event) {
            if (event.type === "event") {
                const data = event.data;
                controller.enqueue(encoder.encode(data));
            }
        }

        if (res.status !== 200) {
            const data = {
              status: res.status,
              statusText: res.statusText,
              body: await res.text(),
            }
            console.log(`Error: recieved non-200 status code, ${JSON.stringify(data)}`);
            controller.close();
            return
        }
  
        const parser = createParser(onParse)
        for await (const chunk of res.body) {
            parser.feed(decoder.decode(chunk))
        }
      },
    })

    let counter = 0;
    const transformStream = new TransformStream({
        async transform(chunk, controller) {
            const data = decoder.decode(chunk)

            if (data === "[DONE]") {
                controller.terminate()
                return
            }
            try {
                const json = JSON.parse(data);
                const text = json.choices[0].delta?.content || ""
                if (counter < 2 && (text.match(/\n/) || []).length) return
                controller.enqueue(encoder.encode(`data: ${JSON.stringify(text)}\n\n`))
                counter++
            } catch (e) {
                controller.error(e)
            }
        },
    })

  
    return readableStream.pipeThrough(transformStream)
}