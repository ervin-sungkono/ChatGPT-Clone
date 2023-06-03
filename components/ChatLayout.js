import dynamic from "next/dynamic";

const InputField = dynamic(() => import("./InputField"))

export default function ChatLayout(){
    return(
        <section className="relative flex flex-col flex-grow h-screen bg-gray-800">
            <div>
                <InputField name={"message"} placeholder={"Send a message.."}/>
            </div>
        </section>
    )
}