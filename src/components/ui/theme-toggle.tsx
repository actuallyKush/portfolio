import { motion } from 'framer-motion'

type Props = {
  dark: boolean
  onToggle: () => void
}

function ThemeToggle({ dark, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className='relative size-[18px] flex items-center justify-center text-black dark:text-white opacity-40 hover:opacity-100 transition-opacity'
      aria-label='Toggle dark mode'
    >
      {dark ? (
        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='size-full'>
          <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
        </svg>
      ) : (
        <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='size-full'>
          <circle cx='12' cy='12' r='5' />
          <path d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' />
        </svg>
      )}
    </button>
  )
}

export { ThemeToggle }
