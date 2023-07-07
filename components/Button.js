export default function Button({label, icon = null, onClick}){
    return(
        <button onClick={onClick} className="flex gap-2 py-2 px-3 items-center border border-black/20 bg-gray-50 dark:bg-gray-800 dark:border-white/20 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
            {icon}
            <p className="font-medium text-[12.8px]">{label}</p>
        </button>
    )
}