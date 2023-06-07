"use client"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect, memo } from "react"
import useLocalStorage from "@/app/lib/use-local-storage"
import { getChatResponse } from "@/app/lib/api"
import { createParser } from "eventsource-parser"

const InputField = dynamic(() => import("./InputField"))
const ChatBox = dynamic(() => import("./ChatBox"))
const IntroSection = dynamic(() => import("./IntroSection"))

export default function ChatLayout({ chatId }){
    const [chatHistory, setChatHistory] = useLocalStorage('chat-history', [])
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    
    const MemoizedChatBox = memo(ChatBox)
    const router = useRouter()

    useEffect(() => {
        console.log("render chatlayout")
        if(chatId){
            const activeChat = [...chatHistory].find(chat => chat.chatId === chatId)
            if(!activeChat) router.push('/')
            else(
                setMessages([...activeChat.messages])
            )
        }
    }, [])

    const changeText = (text) => {
        const textarea = document.getElementById('message')
        textarea.value = text
    }
    
    const handleFormSubmit = async(e) => {
        e.preventDefault()
    
        const message = new FormData(e.target).get("message")
        setMessages(prevMessages => ([
            ...prevMessages,
            {role: "user", content: message},
            {role: "assistant", content: ""}
        ]))

        const chat = await getChatResponse([...messages, {role: "user", content: message}])
        if (!chat) {
          return
        }
    
        const onParse = (event) => {
          if (event.type === "event") {
            const data = event.data;
            try {
                const text = JSON.parse(data) ?? ""
                setMessages(prevMessages => {
                    const {role, content} = [...prevMessages].slice(-1)[0]
                    return [
                        ...prevMessages.slice(0, -1),
                        {role, content: content + text}
                    ]
                })
            } catch (e) {
              console.error(e);
            }
          }
        }
    
        const reader = chat.getReader()
        const decoder = new TextDecoder()
        const parser = createParser(onParse)
        let done = false
    
        while(!done){
          const { value, done: doneReading } = await reader.read()
          done = doneReading
          console.log(done)
          const chunkValue = decoder.decode(value)
          parser.feed(chunkValue)
        }
    }

    return(
        <section className="relative flex flex-col flex-grow h-screen bg-gray-800">
            <div className="w-full h-full">
                {chatId || messages.length > 0 ?
                <div className="w-full h-screen flex flex-col overflow-y-auto">
                    {messages.map((message, index) => (
                        <MemoizedChatBox role={message.role} content={message.content} key={index}/>
                    ))}
                    <div className="absolute w-full h-32 md:h-48 bottom-0 bg-gradient-to-t from-gray-800 via-gray-800 via-40% to-transparent"></div>
                </div>
                :
                <IntroSection handleClick={changeText}/>} 
            </div>
            <div className="w-full flex flex-col gap-2 md:gap-3 items-center absolute bottom-0 left-0 px-4 pb-3 md:pb-6 bg-gradient-to-t from-gray-800">
                <form 
                    onSubmit={handleFormSubmit}
                    className="w-full lg:max-w-2xl xl:max-w-3xl"
                >
                    <InputField
                        name={"message"}
                        placeholder={"Send a message.."}
                        autoFocus
                    />
                </form>
                <p className="text-xs text-gray-300 text-center">
                    For educational purposes only, all rights belongs to rightful owners. Visit the original ChatGPT website&nbsp;
                    <span className="underline"><Link href={"https://chat.openai.com"} target="_blank">here</Link></span>
                </p>
            </div>
        </section>
    )
}