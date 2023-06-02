import dynamic from "next/dynamic";

const InputField = dynamic(() => import("./InputField"))

export default function ChatLayout(){
    return(
        <section className="flex flex-col flex-grow h-screen bg-gray-800">
            <InputField/>
        </section>
    )
}