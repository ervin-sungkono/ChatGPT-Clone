import dynamic from "next/dynamic"
import Link from "next/link"

import { FiRefreshCcw } from "@react-icons/all-files/fi/FiRefreshCcw"

const InputField = dynamic(() => import("./InputField"))
const Button = dynamic(() => import("./Button"))

export default function ChatInput({ onSubmit, regenerateMessage, showButton, loading, text, setText}){ 
    return(
        <div className="w-full flex flex-col gap-2 md:gap-3 items-center absolute bottom-0 left-0 px-4 pb-3 md:pb-6 bg-gradient-to-t from-gray-800">
            {showButton && <Button label={"Regenerate response"} icon={<FiRefreshCcw size={12}/>} onClick={loading ? null  : regenerateMessage}/>}
            <form 
                onSubmit={onSubmit}
                className="w-full lg:max-w-2xl xl:max-w-3xl"
            >
                <InputField
                    name={"message"}
                    value={text}
                    setValue={setText}
                    placeholder={"Send a message.."}
                    autoFocus
                    disabled={loading}
                />
            </form>
            <p className="text-xs text-gray-300 text-center">
                Educational purposes only, made by <span className="underline"><Link href={"https://github.com/ervin-sungkono"} target="_blank">Ervin Cahyadinata Sungkono.</Link></span> Original ChatGPT website <span className="underline"><Link href={"https://chat.openai.com"} target="_blank">here</Link></span>
            </p>
        </div>
    )
}