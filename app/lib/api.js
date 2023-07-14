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

export const getParsedPdf = async(formData) => {
    const response = await fetch("/api/pdf-to-text",{
        method: "POST",
        body: formData
    })
    .then(res => res.status === 400 ? "" : res.json())
    .catch(err => console.log(err))

    return response
}