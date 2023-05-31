export const getChatResponse = (messages) => {
    const chat = fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages })
    }).then(res => res.json())

    return chat
}