"use client"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { getChatResponse } from "@/app/lib/api"

import { FiRefreshCcw } from "@react-icons/all-files/fi/FiRefreshCcw"

const InputField = dynamic(() => import("./InputField"))
const ChatBox = dynamic(() => import("./ChatBox"))
const IntroSection = dynamic(() => import("./IntroSection"))
const Button = dynamic(() => import("./Button"))

export default function ChatLayout({ chatId, chatHistory, setChatHistory }){
    const router = useRouter()
    const [messages, setMessages] = useState([])
    const [id, setId] = useState(chatId)
    const [textAreaValue, setTextAreaValue] = useState("")
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
        setLoading(true)

        setMessages(prevMessages => ([
            ...prevMessages.slice(0, -1),
            {role: "assistant", content: ""}
        ]))
        await sendMessage()

        setLoading(false)
    }
    
    const handleFormSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        
        const message = new FormData(e.target).get("message")
        setTextAreaValue("")
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
                <div className="w-full h-screen flex flex-col overflow-y-auto">
                    {messages.map((message, index) => (
                        <ChatBox role={message.role} content={message.content} streaming={loading && index === messages.length - 1} key={index}/>
                    ))}
                    <div ref={bottomRef} className="h-32 md:h-48 flex-shrink-0"></div>
                </div>
                :
                <IntroSection handleClick={setTextAreaValue}/>} 
            </div>
            <div className="absolute w-full h-32 md:h-48 bottom-0 bg-gradient-to-t from-gray-800 via-gray-800 via-40% to-transparent"></div>
            <div className="w-full flex flex-col gap-2 md:gap-3 items-center absolute bottom-0 left-0 px-4 pb-3 md:pb-6 bg-gradient-to-t from-gray-800">
                <Button label={"Regenerate response"} icon={<FiRefreshCcw size={12}/>} onClick={regenerateMessage}/>
                <form 
                    onSubmit={handleFormSubmit}
                    className="w-full lg:max-w-2xl xl:max-w-3xl"
                >
                    <InputField
                        name={"message"}
                        value={textAreaValue}
                        placeholder={"Send a message.."}
                        autoFocus
                        disabled={loading}
                    />
                </form>
                <p className="text-xs text-gray-300 text-center">
                    Educational purposes only, made by <span className="underline"><Link href={"https://github.com/ervin-sungkono"} target="_blank">Ervin Cahyadinata Sungkono.</Link></span> Visit the original ChatGPT website <span className="underline"><Link href={"https://chat.openai.com"} target="_blank">here</Link></span>
                </p>
            </div>
        </section>
    )
}