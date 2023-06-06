"use client"
import { useEffect, useState } from "react"
import useLocalStorage from "@/app/lib/use-local-storage"
import { initFlowbite } from "flowbite"
import { getChatResponse } from "./lib/api"
import { createParser } from "eventsource-parser"

import Sidebar from "../components/Sidebar"
import ChatLayout from "../components/ChatLayout"

export default function Home() {
  const [chatHistory, setChatHistory] = useLocalStorage('chat-history', [])
  const [activeChat, setActiveChat] = useState({
    chatId: null,
    messages: [],
    created: null,
    updated: false,
  })
  const [response, setResponse] = useState("")

  useEffect(() => {
    initFlowbite()
  })

  useEffect(() => {
    console.log(response)
  }, [response])

  useEffect(() => {
    if(activeChat.updated){
      updateChat()
    }
  },[activeChat.updated])

  const handleSetActiveChat = (chat) => {
    if(!chat) {
      setActiveChat({
        chatId: null,
        messages: [],
        created: null
      })
    }
    else setActiveChat(chat)
  }

  const updateChat = () => {
    const newChatHistory = [...chatHistory].filter(chat => chat.chatId !== activeChat.chatId)
    setChatHistory([...newChatHistory, {...activeChat, updated: false}])
  }

  const insertMessage = async(e) => {
    e.preventDefault()

    const message = new FormData(e.target).get("message")
    setActiveChat((prevChat) => ({
      ...prevChat,
      messages: [
        ...prevChat.messages,
        {role: "user", content: message}
      ]
    }))
    
    const chat = await getChatResponse([...activeChat.messages, {role: "user", content: message}])
    if (!chat) {
      return;
    }

    const onParse = (event) => {
      if (event.type === "event") {
        const data = event.data;
        try {
          const text = JSON.parse(data) ?? ""
          setResponse((prev) => prev + text)
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
      const chunkValue = decoder.decode(value)
      parser.feed(chunkValue)
    }
    // const chatId = id ?? chatResult.id ?? `chatcmpl-${Date.now()}`
    // setActiveChat((prevChat) => ({
    //   chatId,
    //   messages: [
    //     ...prevChat.messages,
    //     chatResult.choices[0]?.message ?? {role: "assistant", content: "Unable to respond to your answer at the moment"}
    //   ],
    //   created: activeChat.created ?? Date.now(),
    //   updated: true
    // }))
  }
  return (
    <main className="flex">
      <Sidebar chatHistory={chatHistory} handleSetActiveChat={handleSetActiveChat}/>
      <ChatLayout id={activeChat.chatId} messages={activeChat.messages} handleFormSubmit={insertMessage}/>
    </main>
  )
}
