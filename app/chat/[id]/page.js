"use client"
import useLocalStorage from "@/app/lib/hooks/use-local-storage"

import Sidebar from "@/components/Sidebar"
import ChatLayout from "@/components/ChatLayout"

export default function Page({ params }){
    const [chatHistory, setChatHistory] = useLocalStorage('chat-history', [])
    return(
        <main className="flex">
            <Sidebar chatId={params.id} chatHistory={chatHistory}/>
            <ChatLayout chatId={params.id} chatHistory={chatHistory} setChatHistory={setChatHistory}/>
        </main>
    )
}