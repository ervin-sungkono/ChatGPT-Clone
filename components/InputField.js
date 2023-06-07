"use client"
import { onExpandableTextareaInput } from "@/app/lib/textarea-expandable"

import Tooltip from "./Tooltip"
import { AiFillFileText as TxtIcon } from "@react-icons/all-files/ai/AiFillFileText"
import { IoSend as SendIcon } from "@react-icons/all-files/io5/IoSend"
import { useEffect, useState, useRef } from "react"

export default function InputField({ name, placeholder, autoFocus = false, disabled = false }){
    const textAreaRef = useRef()
    const [text, setText] = useState("")
    const uploadTxt = () => {
        const fileInput = document.createElement('input')
        fileInput.type = 'file'
        fileInput.accept = '.txt'
        fileInput.multiple = true
        fileInput.onchange = _ => {
            const files =   Array.from(fileInput.files)
            files.forEach((file, index)=> {
                const reader = new FileReader()
                reader.onload = () => {
                    setText(prevValue => `${prevValue}${index > 0 ? "\n" : ""}${reader.result.trim()}`)
                }
                if(file) reader.readAsText(file)
            })
        }
        fileInput.click()
    }
    useEffect(() => {
        textAreaRef.current.dispatchEvent(new Event('input', {bubbles: true}))
    }, [text])
    return(
        <div className="relative w-full flex items-end py-3 md:py-4 pl-4 bg-gray-700 rounded-xl shadow-md border border-white/0 focus-within:border-white/30">
            <textarea
                id={name}
                name={name}
                ref={textAreaRef}
                placeholder={placeholder}
                value={text}
                rows={1}
                data-min-rows="1"
                className="auto_expand bg-transparent w-full p-0 pr-20 border-none focus:ring-0 resize-none h-auto max-h-[200px]"
                onChange={(e) => setText(e.target.value)}
                onInput={(e) => {
                    onExpandableTextareaInput(e)
                }}
                onKeyDown={(e) => {
                    if(!disabled && e.key === 'Enter' && !e.shiftKey){
                        e.preventDefault()
                        document.getElementById('submit-btn').click()
                    }
                }}
                autoFocus={autoFocus}
            >
            </textarea>
            <div className="absolute right-3 bottom-3 flex gap-2">
                <Tooltip content={"Add .txt file"}>
                    <button type="button" className="p-2 hover:bg-gray-900 rounded-md text-gray-400 transition-colors duration-200" onClick={uploadTxt}><TxtIcon size={16}/></button>
                </Tooltip>
                <Tooltip content={"Send message"}>
                    <button id="submit-btn" type="submit" className="p-2 disabled:bg-transparent disabled:text-gray-400/40 text-white bg-green rounded-md transition-colors duration-200" disabled={text.trim() === ""}><SendIcon size={16}/></button>
                </Tooltip>
            </div>
        </div>
    )
}