import { ReactNode } from "react"

export function IconButton({
    icon, onClick, activated
}: {
    icon: ReactNode,
    onClick: () => void,
    activated: boolean
}) {
    return (
        <button 
            className={`relative flex items-center justify-center p-3 rounded-xl transition-all duration-200 cursor-pointer outline-none group ${
                activated 
                ? "bg-indigo-500/20 text-indigo-400 shadow-[inset_0_0_0_1px_rgba(99,102,241,0.5)]" 
                : "text-slate-400 hover:text-white hover:bg-white/10"
            }`} 
            onClick={onClick}
        >
            {icon}
        </button>
    )
}