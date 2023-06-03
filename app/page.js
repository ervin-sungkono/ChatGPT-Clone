"use client"
import { useEffect, useState } from "react";
import useLocalStorage from "@/app/lib/use-local-storage";

import Sidebar from "../components/Sidebar";
import ChatLayout from "../components/ChatLayout";
import { initFlowbite } from "flowbite";

export default function Home() {
  const [chatHistory, setChatHistory] = useLocalStorage('chat-history', [])
  const [activeChat, setActiveChat] = useState({})

  useEffect(() => {
    initFlowbite()
  })

  const handleSetActiveChat = (chat) => {
    setActiveChat(chat)
  }

  const insertNewChat = (messages) => {
    const newChatHistory = [...chatHistory]
  }

  const insertMessage = (chatId, message) => {

  }
  // const fetchChat = async() => {
  //   const chatResponse = await getChatResponse([{role: "user", content: "Hello"}])
  //   console.log(chatResponse)
  // }
  return (
    <main className="flex">
      <Sidebar handleClick={handleSetActiveChat}/>
      <ChatLayout messages={activeChat.message}/>
    </main>
  )
}
