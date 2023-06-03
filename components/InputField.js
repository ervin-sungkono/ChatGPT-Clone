"use client"
import { IoSend } from "@react-icons/all-files/io5/IoSend"
import { useState } from "react"
import { onExpandableTextareaInput } from "@/app/lib/textarea-expandable"
import Link from "next/link"

export default function InputField({ name, placeholder, value, setValue, autoFocus = false }){
    return(
        <div className="w-full flex flex-col gap-2 md:gap-3 items-center absolute bottom-0 left-0 px-4 pb-3 md:pb-6 bg-gradient-to-t from-gray-900/30">
            <div className="relative w-full flex py-3 md:py-4 pl-4 md:max-w-2xl lg:max-w-3xl bg-gray-700 rounded-xl shadow-xs border border-white/0 focus-within:border-white/30">
                <textarea 
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    rows={1}
                    data-min-rows="1"
                    className="auto_expand bg-transparent w-full p-0 pr-12 border-none focus:ring-0 resize-none h-auto max-h-[200px]"
                    onChange={(e) => setValue(e.target.value)}
                    onInput={(e) => onExpandableTextareaInput(e)}
                    autoFocus={autoFocus}
                >
                </textarea>
                <button type="button" className="absolute right-3 bottom-3 p-2 bg-green rounded-md"><IoSend size={16}/></button>
            </div>
            <p className="text-xs text-gray-300 text-center">
                For educational purposes only, all rights belongs to rightful owners. Visit the original ChatGPT website&nbsp;
                <span className="underline"><Link href={"https://chat.openai.com"} target="_blank">here</Link></span>
            </p>
        </div>
    )
}