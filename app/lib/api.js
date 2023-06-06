export const getChatResponse = async(messages) => {
    const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
            "content-type": 'application/json',
        },
        body: JSON.stringify({ messages })
    })

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    return response.body
}