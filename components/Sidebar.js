"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { initDropdowns } from "flowbite"

import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus"
import { AiOutlineMenu } from "@react-icons/all-files/ai/AiOutlineMenu"
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose"
import { BsThreeDots } from "@react-icons/all-files/bs/BsThreeDots"

import ChatLink from "./ChatLink"

export default function Sidebar({ chatId, chatHistory }){
    const [sortedChat, setSortedChat] = useState([])
    const [title, setTitle] = useState("")
    const [showSidebar, setShowSidebar] = useState(false)

    useEffect(() => {
        initDropdowns()
    }, [])

    const compareDate = (date) => {
        const then = new Date(date)
        const now = new Date()

        const msDay = (24 * 60 * 60 * 1000)
        const daysBetweenDates = Math.abs(Math.floor(then.getTime()/msDay) - Math.floor(now.getTime()/msDay))

        return daysBetweenDates
    }

    useEffect(() => {
        const todayChat = []
        const yesterdayChat = []
        const lastWeekChat = []
        const lastMonthChat = []
        const olderChat = []
        chatHistory.forEach(chat => {
            const days = compareDate(chat.created)
            if(days === 0) todayChat.push(chat)
            else if(days === 1) yesterdayChat.push(chat)
            else if(days <= 7) lastWeekChat.push(chat)
            else if(days <= 30) lastMonthChat.push(chat)
            else olderChat.push(chat)
        })
        setSortedChat([
            {label: "Today", data: todayChat},
            {label: "Yesterday", data: yesterdayChat},
            {label: "Last 7 days", data: lastWeekChat},
            {label: "Last 30 days", data: lastMonthChat},
            {label: "Older chats", data: olderChat}
        ])
        setTitle(chatHistory.find(chat => chat.chatId === chatId)?.title)
    },[chatHistory])

    return(
        <section className="relative">
            <div className="w-full fixed top-0 border-b border-b-white/20 bg-gray-800 p-2 flex md:hidden justify-between items-center gap-1 z-50">
                <button className="p-1" onClick={() => setShowSidebar(true)}>
                    <AiOutlineMenu size={20}/>
                </button>
                <p className="text-center text-base line-clamp-1">{title}</p>
                <Link href="/" className="p-1">
                    <AiOutlinePlus size={20}/>
                </Link>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-black"></div>
            <div className={`absolute top-0 left-0 ${showSidebar ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static w-[260px] h-screen flex flex-col gap-2 dark:bg-gray-900 p-2 z-50 group transition-transform duration-300`}>
                <button className={`${showSidebar ? "block": "hidden"} absolute top-2 -right-2 translate-x-full z-50 p-[10px] focus:ring-2 ring-white flex justify-center items-center transition-opacity duration-300`} onClick={() => setShowSidebar(false)}>
                    <AiOutlineClose size={20}/>
                </button>
                <Link href="/" className="w-full flex items-center gap-2 p-3 border dark:border-white/20 rounded-lg dark:hover:bg-white/5 transition-colors duration-300">
                    <AiOutlinePlus size={16}/>
                    <p className="text-sm font-medium">New Chat</p>
                </Link>
                <div className="flex flex-col flex-grow overflow-y-auto -mr-2 border-b dark:border-b-white/20">
                {sortedChat && sortedChat.map(chats => chats.data.length > 0 && (
                        <div className="flex flex-col gap-2 h-auto" key={chats.label}>
                            <p className="text-xs text-gray-500 font-semibold pt-2 px-3 sticky top-0">{chats.label}</p>
                            <div className="flex flex-col">
                                {chats.data.map(chat => (
                                    <ChatLink chat={chat} active={chat.chatId === chatId} key={chat.chatId}/>
                                ))}
                            </div>
                        </div>
                ))}
                </div> 
                <button 
                    id="profileDropdownButton"
                    data-dropdown-toggle="profileDropdown"
                    className="flex justify-between items-center dark:hover:bg-gray-800 dark:text-white rounded-md px-[10px] py-3 transition-colors duration-300" 
                    type="button"
                >
                    <div className="flex items-center gap-2">
                        <Image src={"/placeholder_user.jpg"} width={20} height={20} alt="" className="rounded-sm object-cover"/>
                        <p className="text-sm font-medium">Unknown User</p>
                    </div>
                    <BsThreeDots size={16} className="text-gray-500"/>
                </button>
                <div id="profileDropdown" className="w-[244px] z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-black">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">Dashboard</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">Settings</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">Earnings</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">Sign out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}