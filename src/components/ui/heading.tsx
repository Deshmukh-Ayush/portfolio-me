import { cn } from '@/lib/utils';
import React from 'react'

export const Heading = ({children, className}: {children: React.ReactNode; className?: string}) => {
  return (
    <div className={cn("text-md text-neutral-700 dark:text-neutral-100 text-shadow-sm", className)}>{children}</div>
  )
}
