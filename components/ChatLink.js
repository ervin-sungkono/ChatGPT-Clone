import Link from "next/link"
import { useState, memo, useEffect } from "react"

import { AiOutlineMessage, AiOutlineEdit, AiOutlineDelete, AiOutlineCheck, AiOutlineClose } from "react-icons/ai"

const ChatLink = ({ chatId, title, active, editAction, deleteAction }) => {
    const [action, setAction] = useState("")
    const [chatTitle, setTitle] = useState(title)

    useEffect(() => {
        if(action === "edit"){
            document.getElementById(`input-${chatId}`).focus()
        }
    }, [action])

    const renderIcon = () => {
        switch(action){
            case 'edit':
                return <AiOutlineEdit size={16}/>
            case 'delete':
                return <AiOutlineDelete size={16}/>
            default:
                return <AiOutlineMessage size={16}/>
        }
    }

    const handleAction = () => {
        switch(action){
            case 'edit':
                editAction(chatId, chatTitle)
                break
            case 'delete':
                deleteAction(chatId)
                break
        }
        setAction("")
    }

    return(
        <Link href={`/chat/${chatId}`} className="group/link" aria-current="page">
            <div 
                className={`flex items-center px-3 py-3 gap-2 rounded-md ${active ? "bg-gray-800" : "hover:bg-gray-800/50"} text-white`}
            >
                <div className="p-1">
                    {renderIcon()}
                </div>
                <div className="w-full flex items-center">
                   {action !== "edit" ? <p 
                        id={`text-${chatId}`}
                        className={`flex-grow relative overflow-hidden text-sm text-elipsis break-all max-h-5
                        after:w-1/4 after:h-full after:absolute after:top-0 after:right-0 after:bg-gradient-to-l
                        ${active ? "after:from-gray-800" : "after:from-gray-900 group-hover/link:after:from-gray-800/50"}
                        `}
                    >
                        {action === "delete" ? `Delete "${title}"?` : title}
                    </p> :
                    <input id={`input-${chatId}`} type="text" className={`w-full p-0 bg-transparent border-0 text-sm max-h-5`}
                        value={chatTitle}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={(e) => {
                            if(e.key === 'Enter' && !e.shiftKey){
                                e.preventDefault()
                                document.getElementById('action-btn').click()
                            }
                        }}
                        // onBlur={() => setAction("")}
                    />}
                    {active && !action && <div className="flex">
                        <button 
                            className="p-1 text-gray-400 hover:text-white" 
                            onClick={() => setAction("edit")}
                        >
                            <AiOutlineEdit size={16}/>
                        </button>
                        <button 
                            className="p-1 text-gray-400 hover:text-white" 
                            onClick={() => setAction("delete")}
                        >
                            <AiOutlineDelete size={16}/>
                        </button>
                    </div>}
                    {active && action && <div className="flex">
                        <button id="action-btn" className="p-1 text-gray-400 hover:text-white" onClick={handleAction}>
                            <AiOutlineCheck size={16}/>
                        </button>
                        <button className="p-1 text-gray-400 hover:text-white" onClick={() => setAction("")}>
                            <AiOutlineClose size={16}/>
                        </button>
                    </div>}
                </div>
            </div>
        </Link>
    )
}

export default memo(ChatLink)