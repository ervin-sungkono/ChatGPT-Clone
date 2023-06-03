"use client"
import { useEffect } from "react"
import { initDropdowns } from "flowbite"
import Image from "next/image"

import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus"
import { BsThreeDots } from "@react-icons/all-files/bs/BsThreeDots"

export default function Sidebar(){
    useEffect(() => {
        initDropdowns()
    })
    
    return(
        <section className="relative w-[260px] h-screen flex flex-col gap-2 dark:bg-gray-900 p-2 group">
            <button className="w-full flex items-center gap-2 p-3 border dark:border-white/20 rounded-lg dark:hover:bg-white/5 transition-colors duration-300">
                <AiOutlinePlus size={16}/>
                <p className="text-sm font-medium">New Chat</p>
            </button>
            <div className="flex flex-col flex-grow overflow-hidden group-hover:overflow-y-scroll border-b dark:border-b-white/20">

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
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
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