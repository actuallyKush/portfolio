import { useState, useEffect, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScreenSize } from '../../hooks/use-screen-size'
import { PixelTrail } from './pixel-trail'
import { GooeyFilter } from './gooey-filter'
import { CustomCursor } from './custom-cursor'
import { BouncingDots } from './bouncing-dots'
import { playClick } from '../../lib/sound'

function GooeyDemo() {
  const screenSize = useScreenSize()
  const [hovered, setHovered] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Fragment>
      <AnimatePresence>
        {loading && (
          <motion.div
            key='loader'
            className='fixed inset-0 z-[9998] flex items-center justify-center bg-white'
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <BouncingDots />
          </motion.div>
        )}
      </AnimatePresence>

      <div className='relative w-full h-full min-h-[600px] flex flex-col items-center justify-center gap-8 bg-white text-center text-pretty'>
      <CustomCursor />
      <p className='absolute top-4 left-4 z-10 text-black/50 text-[11px] tracking-normal leading-[1.1]'>
        my personal space<br />built in 2026
      </p>
      <GooeyFilter id='gooey-filter-pixel-trail' strength={5} />

      <div
        className='absolute inset-0 z-0'
        style={{ filter: 'url(#gooey-filter-pixel-trail)' }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan('md') ? 24 : 32}
          fadeDuration={800}
          delay={0}
          pixelClassName='bg-black'
        />
      </div>

      <div className='z-10'>
        <p
          className='text-black text-5xl md:text-7xl font-bold tracking-tighter leading-none'
          onMouseEnter={() => { setHovered(true); playClick() }}
          onMouseLeave={() => setHovered(false)}
        >
          actually
          <AnimatePresence mode='wait'>
            {!hovered ? (
              <motion.span
                key='asterisk'
                animate={{
                  opacity: [1, 0],
                  transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' },
                }}
                exit={{
                  rotate: 360,
                  opacity: 0,
                  transition: { duration: 0.2, ease: 'easeInOut' },
                }}
              >
                *
              </motion.span>
            ) : (
              <motion.span
                key='kush'
                className='text-black/50'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                kush
              </motion.span>
            )}
          </AnimatePresence>
        </p>
        <p className='text-black/50 text-sm md:text-base mt-2 tracking-wider uppercase'>
          クシュ デオガレ
        </p>
      </div>
      </div>
    </Fragment>
  )
}

export { GooeyDemo }