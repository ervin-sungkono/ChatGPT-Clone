import dynamic from "next/dynamic";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import remarkGfm from "remark-gfm"

import { BsSun as SunIcon } from "@react-icons/all-files/bs/BsSun"
import { BsLightningFill as LightningIcon } from "@react-icons/all-files/bs/BsLightningFill"
import { AiFillWarning as WarningIcon } from "@react-icons/all-files/ai/AiFillWarning"

const InputField = dynamic(() => import("./InputField"))

export default function ChatLayout({ id, messages, handleFormSubmit }){
    const [text, setText] = useState("")

    const introductions = [
        {
            title: "Examples",
            icon: <SunIcon size={24}/>,
            data: [
                {
                    label: "Explain quantum computing in simple terms",
                    interactionType: 'click',
                    onClick: setText
                },
                {
                    label: "Got any creative ideas for a 10 year old’s birthday?",
                    interactionType: 'click',
                    onClick: setText
                },
                {
                    label: "How do I make an HTTP request in Javascript?",
                    interactionType: 'click',
                    onClick: setText
                }
            ]
        },
        {
            title: "Capabilities",
            icon: <LightningIcon size={24}/>,
            data: [
                {
                    label: "Remembers what user said earlier in the conversation",
                    interactionType: 'none'
                },
                {
                    label: "Allows user to provide follow-up corrections",
                    interactionType: 'none'
                },
                {
                    label: "Trained to decline inappropriate requests",
                    interactionType: 'none'
                },
            ]
        },
        {
            title: "Limitations",
            icon: <WarningIcon size={24}/>,
            data: [
                {
                    label: "May occasionally generate incorrect information",
                    interactionType: 'none'
                },
                {
                    label: "May occasionally produce harmful instructions or biased content",
                    interactionType: 'none'
                },
                {
                    label: "Limited knowledge of world and events after 2021",
                    interactionType: 'none'
                },
            ]
        }
    ]

    return(
        <section className="relative flex flex-col flex-grow h-screen bg-gray-800">
            <div className="w-full h-full overflow-y-scroll">
                {messages.length > 0 ?
                <div className="w-full h-full flex flex-col">
                    {messages.map((message, index) => (
                        <ReactMarkdown remarkPlugins={[remarkGfm]} key={index}>{message.content}</ReactMarkdown>
                    ))}
                    <div className="w-full h-96"></div>
                </div>
                :
                <div className="w-full h-full mx-auto md:max-w-2xl lg:max-w-3xl flex flex-col gap-16 px-6 pt-[20vh] items-center">
                    <h2 className="text-4xl font-bold">ChatGPT</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {introductions.map(introduction => (
                            <div className="flex flex-col gap-4" key={introduction.title}>
                                <div className="flex flex-col items-center text-center gap-2">
                                    {introduction.icon}
                                    <h3 className="text-lg">{introduction.title}</h3>
                                </div>
                                <div className="flex flex-col gap-3">
                                    {introduction.data.map((entry, index) => (
                                        <div 
                                            className={`w-full p-3 dark:bg-white/5 rounded-md text-sm text-center ${entry.interactionType === 'click' && "dark:hover:bg-gray-900 cursor-pointer"}`}
                                            onClick={entry.interactionType === 'click' ? () => entry.onClick(entry.label) : null}
                                            key={index}
                                        >
                                            {entry.interactionType === 'click' ? <>&quot;{entry.label}&rdquo;&nbsp;<span>→</span></> : entry.label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>} 
            </div>
            <form onSubmit={(e) => {
                handleFormSubmit(e)
                setText("")
            }}>
                <InputField
                    name={"message"}
                    placeholder={"Send a message.."}
                    value={text}
                    setValue={setText}
                    autoFocus
                />
            </form>
        </section>
    )
}