"use client"
import { onExpandableTextareaInput } from "@/app/lib/textarea-expandable"
import Link from "next/link"

import Tooltip from "./Tooltip"
import { AiFillFileText as TxtIcon } from "@react-icons/all-files/ai/AiFillFileText"
import { IoSend as SendIcon } from "@react-icons/all-files/io5/IoSend"

export default function InputField({ name, placeholder, value, setValue, autoFocus = false }){
    return(
        <div className="w-full flex flex-col gap-2 md:gap-3 items-center absolute bottom-0 left-0 px-4 pb-3 md:pb-6 bg-gradient-to-t from-gray-900/30">
            <div className="relative w-full flex items-end py-3 md:py-4 pl-4 md:max-w-2xl lg:max-w-3xl bg-gray-700 rounded-xl shadow-xs border border-white/0 focus-within:border-white/30">
                <textarea 
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    rows={1}
                    data-min-rows="1"
                    className="auto_expand bg-transparent w-full p-0 pr-20 border-none focus:ring-0 resize-none h-auto max-h-[200px]"
                    onChange={(e) => setValue(e.target.value)}
                    onInput={(e) => onExpandableTextareaInput(e)}
                    autoFocus={autoFocus}
                >
                </textarea>
                <div className="absolute right-3 bottom-3 flex gap-2">
                    <Tooltip content={"Add .txt file"}>
                        <button type="button" className="p-2 bg-gray-900 rounded-md"><TxtIcon size={16}/></button>
                    </Tooltip>
                    <Tooltip content={"Send message"}>
                        <button type="button" className="p-2 bg-green rounded-md"><SendIcon size={16}/></button>
                    </Tooltip>
                </div>
            </div>
            <p className="text-xs text-gray-300 text-center">
                For educational purposes only, all rights belongs to rightful owners. Visit the original ChatGPT website&nbsp;
                <span className="underline"><Link href={"https://chat.openai.com"} target="_blank">here</Link></span>
            </p>
        </div>
    )
}