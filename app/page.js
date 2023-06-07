import dynamic from "next/dynamic"
const Sidebar = dynamic(() => import("../components/Sidebar"))
const ChatLayout = dynamic(() => import("../components/ChatLayout"))

export default function Page() {
  return (
    <main className="flex">
      <Sidebar/>
      <ChatLayout/>
    </main>
  )
}
