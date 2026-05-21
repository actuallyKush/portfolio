import { useEffect } from 'react'

const asteriskCursor = `data:image/svg+xml,${encodeURIComponent(
  `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <text x="16" y="26" font-size="28" fill="#999999" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold">*</text>
  </svg>`
)}`

function CustomCursor() {
  useEffect(() => {
    document.body.style.cursor = `url("${asteriskCursor}") 16 16, auto`
    return () => {
      document.body.style.cursor = ''
    }
  }, [])

  return null
}

export { CustomCursor }