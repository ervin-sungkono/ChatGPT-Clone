"use client"
import { getChatResponse } from "./lib/api"

export default async function Home() {

  const fetchChat = async() => {
    const chatResponse = await getChatResponse([{role: "user", content: "Hello"}])
    console.log(chatResponse)
  }
  
  return (
    <main>
      <button onClick={fetchChat}>Get Chat Data</button>
    </main>
  )
}
