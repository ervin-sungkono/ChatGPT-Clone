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

    try{
        await limiter.check(NextResponse.next(), 100, 'CACHE_TOKEN')
        const data = await fetch(url, {
            ...options,
            body: JSON.stringify({ messages })
        })
        .then(res => res.json())
        if(data) return NextResponse.json(data)
        return NextResponse.json({ message: "Bad Request" })
    }catch(error){
        console.log(error)
        return NextResponse.json({ message: error.message })
    }
}