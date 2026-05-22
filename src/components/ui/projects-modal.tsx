import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  { title: 'Autonomous Drone', tags: 'ROS2, V-SLAM, MediaPipe, TensorFlow', desc: 'Full autonomous drone with monocular V-SLAM, gesture control via MediaPipe, and face recognition using Haar Cascades + TensorFlow for identity verification.' },
  { title: 'UART Laser Transceiver', tags: 'FPGA, VHDL', desc: 'Designed a UART transmitter-receiver with integrated laser communication for real-time data transfer on Intel FPGA.' },
  { title: 'Line-Following Robot', tags: 'MSP430, PID, Embedded C', desc: 'Built a line-following robot integrating sensors, motor control, and PID-based navigation on MSP430.' },
  { title: 'RTOS Application', tags: 'MSP430, µC/OS-II, C', desc: 'Multitasking RTOS application on MSP430 with µC/OS-II and Sharp 96x96 LCD display.' },
  { title: 'FM Radio', tags: 'Circuit Design, PCB, Soldering', desc: 'Built an FM radio from scratch — circuit design, PCB layout, soldering, and hardware integration.' },
  { title: 'Song Lyrics Android App', tags: 'Kotlin, iTunes API, REST', desc: 'Native Android app that retrieves song lyrics online and integrates Apple iTunes Search API for 30-second audio previews.' },
]

function ProjectsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
            className='relative w-full max-w-lg max-h-[80vh] bg-white rounded-lg shadow-xl overflow-hidden'
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className='sticky top-0 bg-white border-b border-black/5 px-6 py-4 flex items-center justify-between'>
              <h2 className='text-base font-bold text-black'>projects</h2>
              <button className='text-black/30 hover:text-black transition-colors text-lg leading-none' onClick={onClose}>×</button>
            </div>
            <div className='px-6 py-4 overflow-y-auto max-h-[calc(80vh-60px)] space-y-4'>
              {projects.map(p => (
                <div key={p.title}>
                  <div className='flex items-baseline justify-between gap-2'>
                    <h3 className='text-sm font-semibold text-black'>{p.title}</h3>
                    <span className='text-[10px] text-black/40 uppercase tracking-wider shrink-0'>{p.tags}</span>
                  </div>
                  <p className='text-xs text-black/60 mt-0.5 leading-relaxed'>{p.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { ProjectsModal }