import { NextResponse } from "next/server"
import rateLimit from "@/app/lib/rate-limit"

const url = "https://chatgpt53.p.rapidapi.com/"
const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
      'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
    }
}

const limiter = rateLimit({
  interval: 60 * 60 * 24 * 1000, // 1 day
  uniqueTokenPerInterval: 50, // Max 50 users per second
})

export async function POST(request){
    const { messages } = await request.json()

    const newHeaders = new Headers({'content-type': 'application/json'})

    try{
        await limiter.check(newHeaders, 60, 'CACHE_TOKEN') // limit usage to 60 per interval
    }catch(error){
        return NextResponse.json({ message: "Exceeded daily usage limit" }, { status: 429 })
    }

    try{
        const data = await fetch(url, {
            ...options,
            body: JSON.stringify({ messages })
        })
        .then(res => res.json())
        if(data) 
        return new NextResponse(JSON.stringify(data), { 
            headers: newHeaders
        })
        return NextResponse.json({ message: "Bad Request" }, { status: 400 })
    }catch(error){
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}