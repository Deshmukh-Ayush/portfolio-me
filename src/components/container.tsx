import { cn } from "@/lib/utils"
import React from "react"

interface props {
    children: React.ReactNode
    className?: string
}

export default function Container({children, className}: props) {
    return (
        <div className={cn("mx-auto max-w-3xl py-30 px-10", className)}>{children}</div>
    )
}