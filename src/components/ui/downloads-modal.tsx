import { motion, AnimatePresence } from 'framer-motion'

function DownloadsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className='fixed inset-0 z-[9999] flex items-center justify-center p-4'
          style={{ perspective: '1200px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className='absolute inset-0 bg-black/20 backdrop-blur-sm' onClick={onClose} />
          <motion.div
            className='relative w-full max-w-xs bg-white rounded-lg shadow-xl p-6'
            style={{ transformOrigin: 'top center' }}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              className='absolute top-4 right-4 text-black/30 hover:text-black transition-colors text-lg leading-none'
              onClick={onClose}
            >
              ×
            </button>
            <h2 className='text-lg font-bold text-black mb-4'>downloads</h2>
            <div className='space-y-3'>
              <a
                href='/cv-en.pdf'
                download
                className='block w-full text-center text-sm text-black border border-black/20 rounded-lg px-4 py-2.5 hover:bg-black/5 transition-colors'
              >
                CV — English
              </a>
              <a
                href='/cv-fr.pdf'
                download
                className='block w-full text-center text-sm text-black border border-black/20 rounded-lg px-4 py-2.5 hover:bg-black/5 transition-colors'
              >
                CV — Français
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { DownloadsModal }