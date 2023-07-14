import { BsSun as SunIcon, BsLightningFill as LightningIcon } from "react-icons/bs"
import { AiFillWarning as WarningIcon } from "react-icons/ai"

export default function IntroSection({ handleClick }){
    const introductions = [
        {
            title: "Examples",
            icon: <SunIcon size={24}/>,
            data: [
                {
                    label: "Explain quantum computing in simple terms",
                    interactionType: 'click',
                },
                {
                    label: "Got any creative ideas for a 10 year old’s birthday?",
                    interactionType: 'click',
                },
                {
                    label: "How do I make an HTTP request in Javascript?",
                    interactionType: 'click',
                }
            ]
        },
        {
            title: "Capabilities",
            icon: <LightningIcon size={24}/>,
            data: [
                {
                    label: "Remembers what user said earlier in the conversation",
                    interactionType: 'none'
                },
                {
                    label: "Allows user to provide follow-up corrections",
                    interactionType: 'none'
                },
                {
                    label: "Trained to decline inappropriate requests",
                    interactionType: 'none'
                },
            ]
        },
        {
            title: "Limitations",
            icon: <WarningIcon size={24}/>,
            data: [
                {
                    label: "May occasionally generate incorrect information",
                    interactionType: 'none'
                },
                {
                    label: "May occasionally produce harmful instructions or biased content",
                    interactionType: 'none'
                },
                {
                    label: "Limited knowledge of world and events after 2021",
                    interactionType: 'none'
                },
            ]
        }
    ]
    return(
        <div className="w-full h-auto mx-auto md:max-w-2xl lg:max-w-3xl flex flex-col gap-12 md:gap-16 px-6 pt-16 md:pt-[20vh] items-center">
            <h2 className="text-4xl font-bold">ChatGPT</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
                {introductions.map(introduction => (
                    <div className="flex flex-col items-center gap-4" key={introduction.title}>
                        <div className="flex flex-row md:flex-col items-center text-center gap-2">
                            {introduction.icon}
                            <h3 className="text-lg">{introduction.title}</h3>
                        </div>
                        <div className="w-full flex flex-col gap-3">
                            {introduction.data.map((entry, index) => (
                                <div 
                                    className={`w-full p-3 bg-gray-50 dark:bg-white/5 rounded-md text-sm text-center ${entry.interactionType === 'click' && "hover:bg-gray-200 dark:hover:bg-gray-900 cursor-pointer"}`}
                                    onClick={entry.interactionType === 'click' ? () => handleClick(entry.label) : null}
                                    key={index}
                                >
                                    {entry.interactionType === 'click' ? <>&quot;{entry.label}&rdquo;&nbsp;<span>→</span></> : entry.label}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}