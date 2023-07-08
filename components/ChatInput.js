import dynamic from "next/dynamic"
import Link from "next/link"
import { useState } from "react"

import { FiRefreshCcw } from "@react-icons/all-files/fi/FiRefreshCcw"

const InputField = dynamic(() => import("./InputField"))
const Button = dynamic(() => import("./Button"))
import Tooltip from "./Tooltip"
import Dictaphone from "./Dictaphone"

export default function ChatInput({ onSubmit, regenerateMessage, showButton, loading, text, setText}){
    const [previewSpeech, setPreviewSpeech] = useState("")
    const handleSpeechEnd = () => {
        setText(text + previewSpeech)
        setPreviewSpeech("")
    }
    return(
        <div className="w-full flex flex-col gap-2 md:gap-3 items-center absolute bottom-0 left-0 px-4 pb-3 md:pb-6 bg-gradient-to-t from-gray-200 dark:from-gray-800">
            {showButton && <Button label={"Regenerate response"} icon={<FiRefreshCcw size={12}/>} onClick={loading ? null  : regenerateMessage}/>}
            <div className="relative w-full lg:max-w-2xl xl:max-w-3xl flex gap-4 items-center">
                <form 
                    onSubmit={onSubmit}
                    className="w-full"
                >
                    <InputField
                        name={"message"}
                        value={text + previewSpeech}
                        setValue={setText}
                        placeholder={"Send a message.."}
                        autoFocus
                        disabled={loading || previewSpeech.length}
                        disableInput={previewSpeech.length}
                    />
                </form>
                <div className="absolute left-0 -top-3 -translate-y-full">
                    <Tooltip content={"Text using your voice"}>
                        <Dictaphone setPreviewSpeech={setPreviewSpeech} handleSpeechEnd={handleSpeechEnd}/>
                    </Tooltip>
                </div>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 text-center">
                Educational purposes only, made by <span className="underline"><Link href={"https://github.com/ervin-sungkono"} target="_blank">Ervin Cahyadinata Sungkono.</Link></span> Original ChatGPT website <span className="underline"><Link href={"https://chat.openai.com"} target="_blank">here</Link></span>
            </p>
        </div>
    )
}