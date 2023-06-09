import Link from "next/link"

import { AiOutlineMessage } from "@react-icons/all-files/ai/AiOutlineMessage"

export default function ChatLink({ chat, active}){
    return(
        <Link href={`/chat/${chat.chatId}`} className="group/link">
            <div 
                className={`flex items-center px-3 py-3 gap-3 rounded-md ${active ? "bg-gray-800" : "dark:hover:bg-gray-800/50"}
                `}
            >
                <div><AiOutlineMessage size={16}/></div>
                <p className={`flex-grow relative overflow-hidden text-sm text-elipsis break-all max-h-5
                    after:w-1/4 after:h-full after:absolute after:top-0 after:right-0 after:bg-gradient-to-l
                    ${active ? "after:from-gray-800" : "after:from-gray-900 group-hover/link:after:from-gray-800/50"}
                    `}
                >
                    {chat.title}
                </p>
            </div>
        </Link>
    )
}