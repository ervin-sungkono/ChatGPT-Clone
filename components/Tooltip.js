"use client"

export default function Tooltip({content, children}){
    return(
        <div className="relative group">
            <div    
                role="tooltip"
                className="absolute inline-block whitespace-nowrap -top-1.5 left-1/2 -translate-x-1/2 -translate-y-full z-10 px-3 py-2 text-xs font-semibold text-white transition-opacity duration-300 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 tooltip bg-gray-600 dark:bg-gray-900"
            >
                {content}
                <div className="tooltip-arrow left-1/2 -translate-x-1/2 bg-gray-600 dark:bg-gray-900" data-popper-arrow></div>
            </div>
            {children}
        </div>
    )
}