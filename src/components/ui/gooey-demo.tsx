import { useState, useEffect, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScreenSize } from '../../hooks/use-screen-size'
import { PixelTrail } from './pixel-trail'
import { GooeyFilter } from './gooey-filter'
import { CustomCursor } from './custom-cursor'
import { BouncingDots } from './bouncing-dots'
import { Clock } from './clock'
import { CD } from './cd'
import { MagneticDock } from './magnetic-dock'
import { MenuToggleIcon } from './menu-toggle-icon'
import { ThemeToggle } from './theme-toggle'
import { AboutModal } from './about-modal'
import { ContactModal } from './contact-modal'
import { DownloadsModal } from './downloads-modal'
import { ProjectsModal } from './projects-modal'

function GooeyDemo() {
  const screenSize = useScreenSize()
  const [phase, setPhase] = useState<'asterisk' | 'question' | 'kush'>('asterisk')
  const [jpFocused, setJpFocused] = useState(false)
  const [loading, setLoading] = useState(true)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [downloadsOpen, setDownloadsOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const onScroll = () => setMenuOpen(window.scrollY > 100)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    if (loading) return
    const delays = { asterisk: 2400, question: 1200, kush: 2000 }
    const next = { asterisk: 'question', question: 'kush', kush: 'asterisk' } as const
    const t = setTimeout(() => setPhase(next[phase]), delays[phase])
    return () => clearTimeout(t)
  }, [loading, phase])

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

      <div className='relative w-full h-screen flex flex-col items-center justify-center gap-8 dark:bg-neutral-950 dark:text-white bg-white text-center text-pretty'>
      <CustomCursor />
      <div className='absolute top-4 left-4 z-10 text-black dark:text-white text-[11px] tracking-normal leading-[1.1]'>
        <p>my personal space</p>
        <p className='mt-0.5'>built in 2026</p>
      </div>
      <div className='absolute top-4 right-4 z-10 flex items-center gap-3'>
      <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />
      <p className='text-black dark:text-white text-[11px] tracking-normal'>
        <Clock />
      </p>
      </div>
      <nav className='absolute top-4 z-10 flex flex-col items-start text-black dark:text-white text-[11px] leading-[1.2] -translate-x-1/2' style={{ left: '25%' }}>
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
          fadeDuration={2000}
          delay={0}
          pixelClassName='bg-black'
        />
      </div>

      <div className='z-10'>
        <p className='text-black dark:text-white text-5xl md:text-7xl font-bold tracking-tighter leading-none'>
          actually
          <AnimatePresence mode='wait'>
            {phase === 'asterisk' ? (
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
            ) : phase === 'question' ? (
              <motion.span
                key='question'
                className='text-red-500'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                ?
              </motion.span>
            ) : (
              <motion.span
                key='kush'
                className='text-black/50 dark:text-white/50'
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
                className='text-black dark:text-white lowercase'
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
        <motion.div
  className='flex flex-col items-center -translate-y-[40%]'
  initial={{ rotate: 20 }}
  whileHover={{ rotate: 0 }}
  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
>
  <img src='/macfolder.png' alt='folder' className='w-[90px] h-[90px] object-contain' />
  <span className='text-[10px] text-black dark:text-white leading-none -mt-0.5' style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>Untitled Folder(2)</span>
</motion.div>
        <CD />
      </div>
      <div className='absolute bottom-4 left-4 z-10'>
        <MagneticDock />
      </div>
      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 z-10 cursor-pointer'>
        <MenuToggleIcon open={menuOpen} onClick={() => {
          const next = !menuOpen
          setMenuOpen(next)
          if (next) {
            document.getElementById('section-2')?.scrollIntoView({ behavior: 'smooth' })
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }} className='w-7 h-7 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors' />
      </div>
      </div>
      <section id='section-2' className='relative h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-neutral-950 text-black dark:text-white'>
        <div className='absolute top-4 left-1/2 -translate-x-1/2 z-10 cursor-pointer'>
          <MenuToggleIcon open={true} onClick={() => {
            setMenuOpen(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }} className='w-7 h-7 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors' />
        </div>
        <p className='text-lg tracking-tight'>more content coming soon</p>
        <footer className='absolute bottom-0 left-0 right-0 flex flex-col items-center gap-3 pb-4 pt-8 px-6'>
          <div className='w-1/2 h-px bg-gradient-to-r from-transparent via-black/20 dark:via-white/20 to-transparent' />
          <div className='flex items-center gap-4 text-[10px] tracking-normal text-black/30 dark:text-white/30'>
            <span>kush deoghare © {new Date().getFullYear()}</span>
            <span className='text-black/15 dark:text-white/15'>·</span>
            <span>built with react · vite · tailwind</span>
            <span className='text-black/15 dark:text-white/15'>·</span>
            <span className='flex items-center gap-1'>based in toulouse, france</span>
            <span className='text-black/15 dark:text-white/15'>·</span>
            <a href='https://github.com/actuallyKush' target='_blank' rel='noopener noreferrer' className='text-black/25 dark:text-white/25 hover:text-black dark:hover:text-white transition-colors'>
              <svg width='12' height='12' viewBox='0 0 24 24' fill='currentColor'><path d='M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z'/></svg>
            </a>
            <a href='https://linkedin.com/in/actuallykush' target='_blank' rel='noopener noreferrer' className='text-black/25 dark:text-white/25 hover:text-black dark:hover:text-white transition-colors'>
              <svg width='12' height='12' viewBox='0 0 24 24' fill='currentColor'><path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/></svg>
            </a>
            <a href='mailto:kush@actuallykush.com' className='text-black/25 dark:text-white/25 hover:text-black dark:hover:text-white transition-colors'>
              <svg width='12' height='12' viewBox='0 0 24 24' fill='currentColor'><path d='M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'/></svg>
            </a>
            <span className='text-black/15 dark:text-white/15'>·</span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='text-black/25 dark:text-white/25 hover:text-black dark:hover:text-white transition-colors text-[10px] tracking-normal uppercase'>
              back to top ↑
            </button>
          </div>
        </footer>
      </section>
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <ProjectsModal open={projectsOpen} onClose={() => setProjectsOpen(false)} />
      <DownloadsModal open={downloadsOpen} onClose={() => setDownloadsOpen(false)} />
    </Fragment>
  )
}

export { GooeyDemo }