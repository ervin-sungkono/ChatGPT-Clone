"use client"
import useLocalStorage from "./lib/hooks/use-local-storage"

import Sidebar from "@/components/Sidebar"
import ChatLayout from "@/components/ChatLayout"

export default function Page() {
  const [chatHistory, setChatHistory] = useLocalStorage('chat-history', [])
  return (
    <main className="flex fixed top-0 left-0 bottom-0 right-0">
      <Sidebar chatHistory={chatHistory} setChatHistory={setChatHistory}/>
      <ChatLayout chatHistory={chatHistory} setChatHistory={setChatHistory}/>
    </main>
  )
}
