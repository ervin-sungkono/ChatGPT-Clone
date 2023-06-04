"use client"
import Image from "next/image"

import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus"
import { BsThreeDots } from "@react-icons/all-files/bs/BsThreeDots"
import { useEffect, useState } from "react"

export default function Sidebar({ chatHistory, handleSetActiveChat }){
    const [todayChat, setTodayChat] = useState([])
    const [yesterdayChat, setYesterdayChat] = useState([])
    const [lastWeekChat, setLastWeekChat] = useState([])
    const [lastMonthChat, setLastMonthChat] = useState([])

    useEffect(() => {
        setTodayChat([...chatHistory].filter(chat => {
            console.log(chat)
            console.log(new Date(chat.created).toDateString())
            return new Date(chat.created).toDateString() === new Date().toDateString()
        }))
    },[chatHistory])

    useEffect(() => {
        console.log(todayChat)
    }, [todayChat])

    return(
        <section className="relative w-[260px] h-screen flex flex-col gap-2 dark:bg-gray-900 p-2 group">
            <button onClick={() => handleSetActiveChat(null)} className="w-full flex items-center gap-2 p-3 border dark:border-white/20 rounded-lg dark:hover:bg-white/5 transition-colors duration-300">
                <AiOutlinePlus size={16}/>
                <p className="text-sm font-medium">New Chat</p>
            </button>
            <div className="flex flex-col flex-grow overflow-hidden group-hover:overflow-y-scroll border-b dark:border-b-white/20">
               {todayChat.length > 0 && <div className="flex flex-col gap-2">
                    <p className="text-xs text-gray-500 font-semibold pt-2 px-3">Today</p>
                    {todayChat.map(chat => (
                        <button className="cursor-pointer" onClick={() => handleSetActiveChat(chat)}>New Chat Generated {chat.chatId}</button>
                    ))}
                </div>}
            </div> 
            <button 
                id="profileDropdownButton"
                data-dropdown-toggle="profileDropdown"
                className="flex justify-between items-center dark:hover:bg-gray-800 dark:text-white rounded-md px-[10px] py-3 transition-colors duration-300" 
                type="button"
            >
                <div className="flex items-center gap-2">
                    <Image src={"/placeholder_user.jpg"} width={20} height={20} alt="" className="rounded object-cover"/>
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
        </section>
    )
}