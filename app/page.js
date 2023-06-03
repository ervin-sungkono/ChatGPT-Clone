"use client"
import { useState } from "react";
import useLocalStorage from "@/app/lib/use-local-storage";

import Sidebar from "../components/Sidebar";
import ChatLayout from "../components/ChatLayout";

export default function Home() {
  const [chatHistory, setChatHistory] = useLocalStorage('chat-history', [])
  const [activeChat, setActiveChat] = useState({})

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
