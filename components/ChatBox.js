import Image from "next/image"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import remarkGfm from "remark-gfm"
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter"
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import { memo, useState } from "react"
// import CopyToClipboard from "react-copy-to-clipboard"

function ChatBox({ role, content, streaming = false }){
    // const [copied, setCopied] = useState(false)
    // const copy = () => {
    //     setCopied(true)
    //     setTimeout(() => setCopied(false), 5000)
    // }
    return (
        <div className={`w-full flex justify-center border-b dark:border-b-black/10 ${role === "user" ? "dark:bg-gray-800" : "dark:bg-gray-700"}`}>
            <div className="w-full flex p-4 md:py-6 items-start md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl gap-4 md:gap-6">
                <div className="relative min-w-[32px] aspect-square rounded overflow-hidden">
                    {role === "user" ? 
                    <Image src="/placeholder_user.jpg" alt="" fill className="object-cover"/> 
                    : 
                    <Image src="/gpt_profile.png" alt="" fill className="object-cover"/>}
                </div>
                <div className={`markdown ${streaming ? 'streaming' : ""} flex flex-grow flex-col gap-4`}>
                    <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code({node, inline, className, children, ...props}) {
                              const match = /language-(\w+)/.exec(className || '')
                              return !inline && match ? 
                                (<SyntaxHighlighter
                                    {...props}
                                    children={String(children).replace(/\n$/, '')}
                                    style={vs2015}
                                    language={match[1]}
                                    PreTag="div"
                                    wrapLongLines
                                    customStyle={{borderRadius: '6px'}}
                                />)
                                : 
                                (<code {...props} className={className}>
                                    {children}
                                </code>)
                            }
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    )
}

export default memo(ChatBox)