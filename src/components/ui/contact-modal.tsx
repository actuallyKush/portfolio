import { motion, AnimatePresence } from 'framer-motion'

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className='fixed inset-0 z-[9999] flex items-center justify-center p-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className='absolute inset-0 bg-black/20 backdrop-blur-sm' onClick={onClose} />
          <motion.div
            className='relative w-full max-w-sm bg-white rounded-lg shadow-xl p-6'
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className='absolute top-4 right-4 text-black/30 hover:text-black transition-colors text-lg leading-none'
              onClick={onClose}
            >
              ×
            </button>
            <h2 className='text-lg font-bold text-black mb-4'>reach out to me</h2>
            <div className='space-y-3 text-sm text-black/70'>
              <div>
                <span className='text-black/40 text-xs uppercase tracking-wider block mb-0.5'>Email</span>
                <a href='mailto:kush.deoghare@gmail.com' className='text-black hover:underline underline-offset-2'>
                  kush.deoghare@gmail.com
                </a>
              </div>
              <div>
                <span className='text-black/40 text-xs uppercase tracking-wider block mb-0.5'>Phone</span>
                <span>+33 7 51 07 69 94</span>
              </div>
              <div>
                <span className='text-black/40 text-xs uppercase tracking-wider block mb-0.5'>Location</span>
                <span>Saint-Étienne-du-Rouvray, France</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { ContactModal }