let ctx = null

function getCtx() {
  if (!ctx) ctx = new AudioContext()
  return ctx
}

function playClick() {
  const c = getCtx()
  const duration = 0.05
  const sampleRate = c.sampleRate
  const length = Math.ceil(sampleRate * duration)
  const buffer = c.createBuffer(1, length, sampleRate)

  const data = buffer.getChannelData(0)
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1
  }

  const source = c.createBufferSource()
  source.buffer = buffer

  const gain = c.createGain()
  gain.gain.setValueAtTime(0, c.currentTime)
  gain.gain.linearRampToValueAtTime(0.3, c.currentTime + 0.002)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration)

  source.connect(gain)
  gain.connect(c.destination)

  source.start(c.currentTime)
  source.stop(c.currentTime + duration)
}

export { playClick }