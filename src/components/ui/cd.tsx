import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

function CD() {
  const [hovered, setHovered] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleEnter = useCallback(() => {
    setHovered(true)

    if (!audioRef.current) {
      audioRef.current = new Audio('/roslyn.mp3')
      audioRef.current.loop = false
      audioRef.current.volume = 0.2
      audioRef.current.currentTime = 4
    }

    if (audioRef.current.ended) {
      audioRef.current.currentTime = 4
    }
    audioRef.current.play().catch(() => {})
  }, [])

  const handleLeave = useCallback(() => {
    setHovered(false)
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [])

  return (
    <motion.div
      className='relative inline-flex'
      initial={{ rotate: 30, opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 2 }}
    >
      <motion.img
        src='/cdplayer.png'
        alt='CD player'
        className='w-[120px] h-[120px] object-contain drop-shadow-lg cursor-pointer'
        animate={{
          rotate: 360,
          scale: hovered ? 1.091 : 1,
        }}
        transition={{
          rotate: { duration: 4, repeat: Infinity, ease: 'linear', delay: 2 },
          scale: { type: 'spring', stiffness: 400, damping: 20 },
        }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      />
    </motion.div>
  )
}

export { CD }