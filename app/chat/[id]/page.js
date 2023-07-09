"use client"
import useLocalStorage from "@/app/lib/hooks/use-local-storage"

import Sidebar from "@/components/Sidebar"
import ChatLayout from "@/components/ChatLayout"

export default function Page({ params }){
    const [chatHistory, setChatHistory] = useLocalStorage('chat-history', [])
    return(
        <main className="flex fixed top-0 left-0 bottom-0 right-0">
            <Sidebar chatId={params.id} chatHistory={chatHistory} setChatHistory={setChatHistory}/>
            <ChatLayout chatId={params.id} chatHistory={chatHistory} setChatHistory={setChatHistory}/>
        </main>
    )
}