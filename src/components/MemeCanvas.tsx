import { useEffect, useRef } from 'react'

interface MemeCanvasProps {
  imageUrl: string
  topText: string
  bottomText: string
  className?: string
}

export function MemeCanvas({ imageUrl, topText, bottomText, className = '' }: MemeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const img = imgRef.current
    
    if (!canvas || !img) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawMeme = () => {
      const aspectRatio = img.naturalHeight / img.naturalWidth
      canvas.width = 800
      canvas.height = 800 * aspectRatio

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      ctx.fillStyle = 'white'
      ctx.strokeStyle = 'black'
      ctx.textAlign = 'center'
      ctx.font = 'bold 48px Impact, "Arial Black", sans-serif'

      const maxWidth = canvas.width - 40

      if (topText) {
        const topTextUpper = topText.toUpperCase()
        ctx.textBaseline = 'top'
        const topY = 20
        ctx.lineWidth = 6
        ctx.strokeText(topTextUpper, canvas.width / 2, topY, maxWidth)
        ctx.fillText(topTextUpper, canvas.width / 2, topY, maxWidth)
      }

      if (bottomText) {
        const bottomTextUpper = bottomText.toUpperCase()
        ctx.textBaseline = 'bottom'
        const bottomY = canvas.height - 20
        ctx.lineWidth = 6
        ctx.strokeText(bottomTextUpper, canvas.width / 2, bottomY, maxWidth)
        ctx.fillText(bottomTextUpper, canvas.width / 2, bottomY, maxWidth)
      }
    }

    if (img.complete) {
      drawMeme()
    } else {
      img.onload = drawMeme
    }
  }, [imageUrl, topText, bottomText])

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-lg shadow-lg"
      />
      <img
        ref={imgRef}
        src={imageUrl}
        alt="Cat"
        className="hidden"
        crossOrigin="anonymous"
      />
    </div>
  )
}
