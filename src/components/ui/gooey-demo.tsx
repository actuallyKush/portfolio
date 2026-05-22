import { useState, useEffect, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScreenSize } from '../../hooks/use-screen-size'
import { PixelTrail } from './pixel-trail'
import { GooeyFilter } from './gooey-filter'
import { CustomCursor } from './custom-cursor'
import { BouncingDots } from './bouncing-dots'
import { Clock } from './clock'
import { CD } from './cd'
import { AboutModal } from './about-modal'
import { ContactModal } from './contact-modal'
import { DownloadsModal } from './downloads-modal'
import { ProjectsModal } from './projects-modal'

function GooeyDemo() {
  const screenSize = useScreenSize()
  const [showAsterisk, setShowAsterisk] = useState(true)
  const [jpFocused, setJpFocused] = useState(false)
  const [loading, setLoading] = useState(true)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [downloadsOpen, setDownloadsOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (loading) return
    const t = setTimeout(() => setShowAsterisk(!showAsterisk), showAsterisk ? 2400 : 2000)
    return () => clearTimeout(t)
  }, [loading, showAsterisk])

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
      <div className='absolute top-4 left-4 z-10 text-black text-[11px] tracking-normal leading-[1.1]'>
        <p>my personal space</p>
        <p className='mt-0.5'>built in 2026</p>
      </div>
      <p className='absolute top-4 right-4 z-10 text-black text-[11px] tracking-normal'>
        <Clock />
      </p>
      <nav className='absolute top-4 z-10 flex flex-col items-start text-black text-[11px] leading-[1.2] -translate-x-1/2' style={{ left: '25%' }}>
        <button
          className='hover:text-red-500 transition-colors p-0'
          onClick={() => setAboutOpen(true)}
        >
          about me
        </button>
        <button
          className='hover:text-red-500 transition-colors p-0'
          onClick={() => setProjectsOpen(true)}
        >
          projects
        </button>
        <button
          className='hover:text-red-500 transition-colors p-0'
          onClick={() => setDownloadsOpen(true)}
        >
          downloads
        </button>
        <button
          className='hover:text-red-500 transition-colors p-0'
          onClick={() => setContactOpen(true)}
        >
          contact
        </button>
      </nav>
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
        <p className='text-black text-5xl md:text-7xl font-bold tracking-tighter leading-none'>
          actually
          <AnimatePresence mode='wait'>
            {showAsterisk ? (
              <motion.span
                key='asterisk'
                animate={{
                  opacity: [1, 0, 1, 0, 1],
                  scale: [1, 1, 1, 1, 0],
                  rotate: [0, 0, 0, 0, 360],
                }}
                transition={{ duration: 2.4, ease: 'easeInOut', times: [0, 0.25, 0.5, 0.75, 1] }}
              >
                *
              </motion.span>
            ) : (
              <motion.span
                key='kush'
                className='text-black/50'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                kush
              </motion.span>
            )}
          </AnimatePresence>
        </p>
        <p
          className='relative text-sm md:text-base mt-2 tracking-wider cursor-pointer'
          onMouseEnter={() => setJpFocused(true)}
          onMouseLeave={() => setJpFocused(false)}
        >
          <AnimatePresence mode='wait'>
            {!jpFocused ? (
              <motion.span
                key='jp'
                className='text-red-500'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                クシュ デオガレ
              </motion.span>
            ) : (
              <motion.span
                key='en'
                className='text-black lowercase'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                kush deoghare
              </motion.span>
            )}
          </AnimatePresence>
        </p>
      </div>
      <div className='absolute bottom-4 right-4 z-10 flex flex-col items-center gap-2'>
        <motion.img
  src='/macfolder.png'
  alt='folder'
  className='w-[90px] h-[90px] object-contain -translate-y-[40%]'
  initial={{ rotate: 20 }}
  whileHover={{ rotate: 0 }}
  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
/>
        <CD />
      </div>
      </div>
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <ProjectsModal open={projectsOpen} onClose={() => setProjectsOpen(false)} />
      <DownloadsModal open={downloadsOpen} onClose={() => setDownloadsOpen(false)} />
    </Fragment>
  )
}

export { GooeyDemo }