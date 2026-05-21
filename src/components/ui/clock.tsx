import { useState, useEffect } from 'react'

function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n: number) => n.toString().padStart(2, '0')
  const h = time.getHours()
  const h12 = h % 12 || 12
  const ampm = h < 12 ? 'AM' : 'PM'
  const tz = time.toLocaleTimeString('en', { timeZoneName: 'short' }).split(' ').pop()

  return (
    <span className='tabular-nums'>
      {tz} {h12}:{pad(time.getMinutes())}:{pad(time.getSeconds())} {ampm}
    </span>
  )
}

export { Clock }