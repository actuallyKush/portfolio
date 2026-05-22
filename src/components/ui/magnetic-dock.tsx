import { useState, useRef, useContext, createContext, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

const MouseContext = createContext({ x: 0, y: 0 })

const GithubIcon = () => (
    <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' />
  </svg>
)

const LinkedinIcon = () => (
    <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
    <rect x='2' y='9' width='4' height='12' />
    <circle cx='4' cy='4' r='2' />
  </svg>
)

const MailIcon = () => (
  <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
    <polyline points='22,6 12,13 2,6' />
  </svg>
)

function DockIcon({ icon, url }: { icon: React.ReactNode; url: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouse = useContext(MouseContext)
  const distance = useMotionValue(Infinity)

  useEffect(() => {
    if (!ref.current || mouse.x === 0) {
      distance.set(Infinity)
      return
    }
    const iconRect = ref.current.getBoundingClientRect()
    const containerRect = ref.current.parentElement!.getBoundingClientRect()
    const iconCenterX = iconRect.left + iconRect.width / 2
    const mouseXAbsolute = containerRect.left + mouse.x
    distance.set(Math.abs(mouseXAbsolute - iconCenterX))
  }, [mouse, distance])

  const width = useTransform(distance, [0, 100], [40, 28])
  const springW = useSpring(width, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <motion.div
      ref={ref}
      style={{ width: springW }}
      className='aspect-square rounded-full bg-black/5 grid place-items-center cursor-pointer'
      onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
    >
      {icon}
    </motion.div>
  )
}

function MagneticDock() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onMouseMove = (e: React.MouseEvent) => {
    const { clientX, currentTarget } = e
    const { left } = currentTarget.getBoundingClientRect()
    setPos({ x: clientX - left, y: 0 })
  }

  const onMouseLeave = () => {
    setPos({ x: 0, y: 0 })
  }

  return (
    <MouseContext.Provider value={pos}>
      <div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className='flex items-end gap-3 text-black'
      >
        <DockIcon icon={<GithubIcon />} url='https://github.com/actuallyKush' />
        <DockIcon icon={<LinkedinIcon />} url='https://linkedin.com/in/actuallykush' />
        <DockIcon icon={<MailIcon />} url='mailto:kush.deoghare@gmail.com' />
      </div>
    </MouseContext.Provider>
  )
}

export { MagneticDock }