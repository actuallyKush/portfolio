import { useState, useCallback } from 'react'

const SONGS = [
  { title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20' },
  { title: 'Save Your Tears', artist: 'The Weeknd', duration: '3:35' },
  { title: 'Levitating', artist: 'Dua Lipa', duration: '3:23' },
  { title: 'Peaches', artist: 'Justin Bieber', duration: '3:18' },
  { title: 'Good 4 U', artist: 'Olivia Rodrigo', duration: '2:58' },
  { title: 'Kiss Me More', artist: 'Doja Cat', duration: '3:28' },
  { title: 'Montero', artist: 'Lil Nas X', duration: '2:17' },
  { title: 'Drivers License', artist: 'Olivia Rodrigo', duration: '4:02' },
  { title: 'Positions', artist: 'Ariana Grande', duration: '2:52' },
  { title: 'Therefore I Am', artist: 'Billie Eilish', duration: '2:54' },
]

const s = {
  body: { bg: 'linear-gradient(145deg, #f0ece4, #d8d4cc)', radius: 20, w: 200, h: 340 },
  screen: { bg: '#a5ada5', radius: 8, h: 140 },
  wheel: { size: 170, bg: 'linear-gradient(145deg, #ece8e0, #d4d0c8)' },
  text: '#1a1a1a',
  muted: '#666',
}

function Ipod() {
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [active, setActive] = useState(false)

  const play = useCallback(() => { setActive(true); setPlaying(p => !p) }, [])
  const next = useCallback(() => { setActive(true); setCurrent(s => (s + 1) % SONGS.length) }, [])
  const prev = useCallback(() => { setActive(true); setCurrent(s => (s - 1 + SONGS.length) % SONGS.length) }, [])
  const select = useCallback(() => {
    if (!active) { setActive(true); setPlaying(true) }
    else { setCurrent(current); setPlaying(true) }
  }, [active, current])
  const menu = useCallback(() => { if (active) { setActive(false); setPlaying(false) } }, [active])

  return (
    <div style={{
      width: s.body.w, height: s.body.h, borderRadius: s.body.radius,
      background: s.body.bg,
      boxShadow: '0 6px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.7)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '14px 14px 0', position: 'relative', userSelect: 'none',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Gloss */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '45%',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)',
        borderRadius: '20px 20px 0 0', pointerEvents: 'none', zIndex: 5,
      }} />

      {/* Screen */}
      <div style={{
        width: '100%', height: s.screen.h, borderRadius: s.screen.radius,
        background: s.screen.bg, overflow: 'hidden', position: 'relative',
        boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.25)',
      }}>
        {/* Overlays */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 100,
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.25), inset 0 -2px 4px rgba(0,0,0,0.12)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 95,
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0px, transparent 1px, transparent 2px)',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '30%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)',
          pointerEvents: 'none', zIndex: 96,
        }} />

        {/* Content */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', zIndex: 90,
        }}>
          {!active ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: s.text, lineHeight: 1.1 }}>⌘</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: s.text, letterSpacing: '-0.02em' }}>
                actuallykush's iPod
              </div>
            </div>
          ) : (
            <div style={{
              width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
              padding: '5px 7px',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                height: 18, borderBottom: '1px solid ' + s.text, marginBottom: 3,
                fontSize: 9, fontWeight: 700, color: s.text, paddingBottom: 1,
              }}>
                <span style={{ fontSize: 10 }}>{playing ? '\u25AE\u25AE' : '\u25B6'}</span>
                <span>All Songs</span>
                <div style={{ width: 18, height: 9, border: '1px solid ' + s.text, borderRadius: 2, display: 'flex', alignItems: 'center', padding: '0 1px' }}>
                  <div style={{ width: '55%', height: 5, background: s.text, borderRadius: 1, marginLeft: 1 }} />
                </div>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', fontSize: 8, color: s.text, scrollbarWidth: 'thin' }}>
                {SONGS.map((song, i) => (
                  <div key={i} onClick={() => { setActive(true); setCurrent(i); setPlaying(true) }}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '1px 3px', cursor: 'pointer', borderRadius: 1,
                      background: i === current && playing ? 'rgba(0,0,0,0.12)' : 'transparent',
                    }}
                  >
                    <span style={{ fontWeight: i === current ? 700 : 400, fontSize: 8 }}>{song.title}</span>
                    <span style={{ opacity: 0.6, fontSize: 7 }}>{song.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click Wheel */}
      <div style={{
        width: s.wheel.size, height: s.wheel.size, borderRadius: '50%',
        background: s.wheel.bg, position: 'relative', alignSelf: 'center',
        marginTop: 14, flexShrink: 0,
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.6), inset 0 2px 4px rgba(0,0,0,0.08), 0 3px 10px rgba(0,0,0,0.15)',
      }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%', pointerEvents: 'none',
          background: 'conic-gradient(rgba(255,255,255,0.3) 0deg, transparent 90deg, rgba(0,0,0,0.08) 180deg, transparent 270deg, rgba(255,255,255,0.3) 360deg)',
        }} />

        <button onClick={menu} style={{
          position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
          border: 'none', background: 'none', fontSize: 9, fontWeight: 700,
          color: s.muted, cursor: 'pointer', fontFamily: 'inherit',
          textShadow: '0 1px 0 rgba(255,255,255,0.5)', letterSpacing: '0.05em',
        }}>MENU</button>

        <button onClick={prev} style={{
          position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
          border: 'none', background: 'none', fontSize: 13, color: s.muted,
          cursor: 'pointer', lineHeight: 1, textShadow: '0 1px 0 rgba(255,255,255,0.5)',
        }}>⏮</button>

        <button onClick={play} style={{
          position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
          border: 'none', background: 'none', fontSize: 13, color: s.muted,
          cursor: 'pointer', lineHeight: 1, textShadow: '0 1px 0 rgba(255,255,255,0.5)',
        }}>{playing ? '\u23F8' : '\u25B6'}</button>

        <button onClick={next} style={{
          position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
          border: 'none', background: 'none', fontSize: 13, color: s.muted,
          cursor: 'pointer', lineHeight: 1, textShadow: '0 1px 0 rgba(255,255,255,0.5)',
        }}>⏭</button>

        <button onClick={select} style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 56, height: 56, borderRadius: '50%', border: 'none',
          background: 'linear-gradient(145deg, #faf8f4, #e8e4dc)',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.9)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.7), transparent)',
            pointerEvents: 'none',
          }} />
        </button>
      </div>
    </div>
  )
}

export { Ipod }