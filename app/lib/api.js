export const getChatResponse = (messages) => {
    const chat = fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages })
    })
    .then(res => res.json())
    .catch(err => console.log(err))

    return chat
}