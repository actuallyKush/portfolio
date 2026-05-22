import { motion } from 'framer-motion'

function AirPodCase() {
  return (
    <motion.div
      className='relative'
      initial={{ rotate: 30 }}
      whileHover={{ rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      style={{ originX: '50%', originY: '100%' }}
    >
      <svg width='80' height='130' viewBox='0 0 80 130' fill='none'>
        {/* shadow */}
        <ellipse cx='40' cy='124' rx='35' ry='5' fill='rgba(0,0,0,0.12)' />
        {/* body */}
        <rect x='8' y='20' width='64' height='96' rx='14' fill='#f0f0f3' stroke='#e0e0e5' strokeWidth='0.5' />
        {/* lid */}
        <rect x='8' y='8' width='64' height='18' rx='8' fill='#f5f5f8' stroke='#e0e0e5' strokeWidth='0.5' />
        {/* lid highlight */}
        <rect x='8' y='8' width='64' height='9' rx='8' fill='url(#lid)' />
        {/* inner */}
        <rect x='20' y='30' width='40' height='52' rx='8' fill='#d1d1d6' />
        {/* inner top shadow */}
        <rect x='20' y='30' width='40' height='10' rx='8' fill='rgba(0,0,0,0.06)' />
        {/* LED */}
        <circle cx='40' cy='96' r='3.5' fill='#22c55e' />
        <circle cx='40' cy='96' r='6' fill='rgba(34,197,94,0.2)' />
        <defs>
          <linearGradient id='lid' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0' stopColor='rgba(255,255,255,0.6)' />
            <stop offset='1' stopColor='transparent' />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

export { AirPodCase }