"use client"
import useLocalStorage from "./lib/hooks/use-local-storage"

import Sidebar from "@/components/Sidebar"
import ChatLayout from "@/components/ChatLayout"

export default function Page() {
  const [chatHistory, setChatHistory] = useLocalStorage('chat-history', [])
  return (
    <main className="flex">
      <Sidebar chatHistory={chatHistory}/>
      <ChatLayout chatHistory={chatHistory} setChatHistory={setChatHistory}/>
    </main>
  )
}
