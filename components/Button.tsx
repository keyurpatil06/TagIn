import { cn } from '@/lib/utils';
import React from 'react'

const Button = ({
  text,
  onClick,
  className
}: {
  text: string;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn("font-semibold px-4 py-2 text-white bg rounded-2xl", className)}
    >
      {text}
    </button>
  )
}

export default Button
