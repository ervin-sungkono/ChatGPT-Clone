"use client"
import { useEffect, useState } from "react";
import useLocalStorage from "@/app/lib/use-local-storage";

import Sidebar from "../components/Sidebar";
import ChatLayout from "../components/ChatLayout";
import { initFlowbite } from "flowbite";
import { getChatResponse } from "./lib/api";

export default function Home() {
  const [chatHistory, setChatHistory] = useLocalStorage('chat-history', [])
  const [activeChat, setActiveChat] = useState({
    chatId: null,
    messages: [],
    created: null,
    updated: null,
  })

  useEffect(() => {
    initFlowbite()
  })

  useEffect(() => {
    if(activeChat.updated && activeChat.updated === Date.now()){
      updateChat()
    }
  }, [activeChat.updated])

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
    setChatHistory([...newChatHistory, activeChat])
  }

  const insertMessage = async(id, message) => {
    setActiveChat((prevChat) => ({
      ...prevChat,
      messages: [
        ...prevChat.messages,
        {role: "user", content: message}
      ]
    }))
    const chatResult = await getChatResponse([...activeChat.messages, {role: "user", content: message}])
    const chatId = id ?? chatResult.id ?? `chatcmpl-${Date.now()}`
    setActiveChat((prevChat) => ({
      chatId,
      messages: [
        ...prevChat.messages,
        chatResult.choices[0]?.message ?? {role: "assistant", content: "Unable to respond to your answer at the moment"}
      ],
      created: activeChat.created ?? Date.now(),
      updated: Date.now()
    }))
  }
  return (
    <main className="flex">
      <Sidebar chatHistory={chatHistory} handleSetActiveChat={handleSetActiveChat}/>
      <ChatLayout id={activeChat.chatId} messages={activeChat.messages} handleInsertMessage={insertMessage}/>
    </main>
  )
}
