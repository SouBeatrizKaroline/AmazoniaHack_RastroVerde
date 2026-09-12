import React from 'react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export const RastroVerdeLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  }

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }

  return (
    <div
      className={`inline-flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}
    >
      {/* Institutional Leaf + Location Pin + Trail Vector Mark */}
      <div
        className={`relative flex items-center justify-center rounded-lg bg-[#1B5E3A] text-white shadow-sm shrink-0 p-1.5 ${iconSizes[size]}`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full stroke-current"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Location pin outline with leaf contour */}
          <path d="M16 3C11.5817 3 8 6.58172 8 11C8 16.5 16 28 16 28C16 28 24 16.5 24 11C24 6.58172 20.4183 3 16 3Z" />
          {/* Internal leaf vein / trail line */}
          <path d="M16 7C16 11 13 14 11 15" strokeWidth="1.8" />
          <path d="M16 11C18 12.5 19 14 20 15.5" strokeWidth="1.8" />
          {/* Center coordinate point */}
          <circle cx="16" cy="11" r="2" fill="currentColor" stroke="none" />
        </svg>
      </div>

      {showText && (
        <span className={`text-[#143028] tracking-tight ${textSizes[size]}`}>
          Rastro<span className="text-[#1B5E3A]">Verde</span>
        </span>
      )}
    </div>
  )
}
