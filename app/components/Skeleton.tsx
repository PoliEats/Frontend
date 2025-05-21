import { type ReactNode } from 'react'
import { cn } from '~/functions/functions'

interface SkeletonProps {
    className?: string
    isLoading?: boolean
    children: ReactNode
}

function Skeleton({className, isLoading, children}: SkeletonProps) {
    return isLoading ? (
        <div className={cn(
            "animate-pulse bg-background-800 rounded-md",
            className)}>
        </div>
    ) : (
        <div className={className}>
            {children}
        </div>
    )
}

export default Skeleton