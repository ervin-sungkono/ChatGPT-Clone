"use client"
import dynamic from "next/dynamic"

import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { getChatResponse } from "@/app/lib/api"

const ChatBox = dynamic(() => import("./ChatBox"))
const ChatInput = dynamic(() => import("./ChatInput"))
const IntroSection = dynamic(() => import("./IntroSection"))

export default function ChatLayout({ chatId, chatHistory, setChatHistory }){
    const router = useRouter()
    const [messages, setMessages] = useState([])
    const [text, setText] = useState("")
    const [id, setId] = useState(chatId)
    const [loading, setLoading] = useState(false)

    const bottomRef = useRef()
    
    useEffect(() => {
        if(id){
            const activeChat = [...chatHistory].find(chat => chat.chatId === id)
            if(!activeChat) router.push('/')
            else(
                setMessages([...activeChat.messages])
            )
        }
    }, [id])

    useEffect(() => {
        // Store only last 50 messages
        if(messages.length > 50) {
            setMessages([...messages].slice(0,50))
        }
        if(!loading && messages.length !== 0){
            const chatId = id ?? crypto.randomUUID() // Generate random id for chat
            if(!id) {
                setId(chatId)
                setChatHistory([
                    ...chatHistory,
                    {
                        title: messages[0].content.slice(0,255),
                        chatId,
                        messages: messages,
                        created: Date.now()
                    }
                ])
                router.push(`/chat/${chatId}`)
            }
            else{
                const newChatHistory = [...chatHistory].map(chat => {
                    if(chat.chatId === chatId){
                        return({
                            ...chat,
                            messages
                        })
                    }
                    return chat
                })
                setChatHistory(newChatHistory)
            }
        }
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        if(!bottomRef.current) return
        bottomRef.current.scrollIntoView({
            behaviour: "smooth",
            block: "end"
        })
    }

    const sendMessage = async(message, regenerate = true) => {
        const content = regenerate ? messages.slice(-1)[0].content : message
        const chat = await getChatResponse(regenerate ? [...messages.slice(0,-1)] : [...messages, {role: "user", content: content}])
        if (!chat) {
          return
        }
    
        const reader = chat.getReader()
        const decoder = new TextDecoder()
        let done = false
    
        while(!done){
            const { value, done: doneReading } = await reader.read()
            done = doneReading
            const chunkValue = decoder.decode(value)
            setMessages(prevMessages => {
                const {role, content} = [...prevMessages].slice(-1)[0]
                return [
                    ...prevMessages.slice(0, -1),
                    {role, content: content + chunkValue}
                ]
            })
        }
    }

    const regenerateMessage = async() => {
        if(messages.length === 0) return
        setLoading(true)

        setMessages(prevMessages => ([
            ...prevMessages.slice(0, -1),
            {role: "assistant", content: ""}
        ]))
        await sendMessage()

        setLoading(false)
    }
    
    const handleFormSubmit = async(e, callback) => {
        e.preventDefault()
        setLoading(true)
        
        const message = new FormData(e.target).get("message")
        setText("")
        setMessages(prevMessages => ([
            ...prevMessages,
            {role: "user", content: message},
            {role: "assistant", content: ""}
        ]))
        
        await sendMessage(message, false)
        setLoading(false)
    }

    return(
        <section className="relative flex flex-col flex-grow h-screen bg-gray-800">
            <div className="w-full h-full">
                {id || messages.length > 0 ?
                <div className="w-full h-full flex flex-col overflow-y-auto">
                    {messages.map((message, index) => (
                        <ChatBox role={message.role} content={message.content} streaming={loading && index === messages.length - 1} key={index}/>
                    ))}
                    <div ref={bottomRef} className="h-32 md:h-48 flex-shrink-0"></div>
                </div>
                :
                <IntroSection handleClick={setText}/>} 
            </div>
            <div className="absolute w-full h-32 md:h-48 bottom-0 bg-gradient-to-t from-gray-800 via-gray-800/70 via-50% to-transparent"></div>
            <ChatInput onSubmit={handleFormSubmit} regenerateMessage={regenerateMessage} showButton={(messages.length > 0)} loading={loading} text={text} setText={setText}/>
        </section>
    )
}