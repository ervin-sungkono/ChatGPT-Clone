import Image from "next/image"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import rehypeHighlight from "rehype-highlight/lib"
import remarkGfm from "remark-gfm"

export default function ChatBox({ role, content }){
    return (
        <div className={`w-full flex justify-center border-b dark:border-b-black/10 ${role === "user" ? "dark:bg-gray-800" : "dark:bg-gray-700"}`}>
            <div className="w-full flex p-4 md:py-6 items-start md:max-w-2xl lg:max-w-[38rem] xl:max-w-3xl gap-4 md:gap-6">
                <div className="relative min-w-[32px] aspect-square rounded overflow-hidden">
                    {role === "user" ? 
                    <Image src="/placeholder_user.jpg" alt="" fill className="object-cover"/> 
                    : 
                    <Image src="/gpt_profile.png" alt="" fill className="object-cover"/>}
                </div>
                <div className="flex-grow">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
                </div>
            </div>
        </div>
    )
}