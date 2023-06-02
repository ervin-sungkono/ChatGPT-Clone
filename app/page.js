import Sidebar from "./components/Sidebar";
import ChatLayout from "./components/ChatLayout";

export default function Home() {
  // const fetchChat = async() => {
  //   const chatResponse = await getChatResponse([{role: "user", content: "Hello"}])
  //   console.log(chatResponse)
  // }
  return (
    <main className="flex">
      <Sidebar/>
      <ChatLayout/>
    </main>
  )
}
