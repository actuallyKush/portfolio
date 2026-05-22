import React from 'react'
import { cn } from '@/lib/utils'

type MenuToggleProps = React.ComponentProps<'svg'> & {
	open: boolean
	duration?: number
}

export function MenuToggleIcon({
	open,
	className,
	fill = 'none',
	stroke = 'currentColor',
	strokeWidth = 2.5,
	strokeLinecap = 'round',
	strokeLinejoin = 'round',
	duration = 300,
	...props
}: MenuToggleProps) {
	return (
		<svg
			strokeWidth={strokeWidth}
			fill={fill}
			stroke={stroke}
			viewBox="0 0 32 32"
			strokeLinecap={strokeLinecap}
			strokeLinejoin={strokeLinejoin}
			className={cn(
				'transition-transform ease-in-out',
				open && 'rotate-180',
				className,
			)}
			style={{
				transitionDuration: `${duration}ms`,
			}}
			{...props}
		>
			<path d="M8 10 16 18 24 10" />
<path d="M8 17 16 25 24 17" />
		</svg>
	)
}