import { NextResponse } from "next/server"
import rateLimit from "@/app/lib/rate-limit"
import { OpenAIStream } from "@/app/lib/openAIStream"

export const runtime = "edge"

const defaultPayload = {
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
}

const limiter = rateLimit({
  interval: 60 * 60 * 24 * 1000, // 1 day
  uniqueTokenPerInterval: 100, // Max 100 users per second
})

export async function POST(request){
    const { messages } = await request.json()

    const newHeaders = new Headers({'cache-control': 'no-cache'})
    try{
        await limiter.check(newHeaders, 100, 'CACHE_TOKEN') // limit usage to 100 per interval
    }catch(error){
        return NextResponse.json({ message: "Exceeded daily usage limit" }, { status: 429 })
    }

    try{
        const payload = {
            ...defaultPayload,
            messages
        }
        const stream = await OpenAIStream(payload)
        return new NextResponse(stream, { headers: { ...newHeaders } })
    }catch(error){
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}