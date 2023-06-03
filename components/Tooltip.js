export default function Tooltip({content, children}){
    return(
        <div className="relative group">
            <div    
                role="tooltip"
                class="absolute inline-block whitespace-nowrap -top-2 left-1/2 -translate-x-1/2 -translate-y-full z-10 px-3 py-2 text-sm font-semibold text-white transition-opacity duration-300 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 tooltip dark:bg-gray-900"
            >
                {content}
                <div class="tooltip-arrow border-2 left-1/2 -translate-x-1/2 bg-gray-900" data-popper-arrow></div>
            </div>
            {children}
        </div>
    )
}