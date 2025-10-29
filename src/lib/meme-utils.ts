import type { CatImage } from './types'

export async function fetchRandomCat(): Promise<CatImage> {
  const response = await fetch('https://api.thecatapi.com/v1/images/search')
  const data = await response.json()
  
  if (!data || data.length === 0) {
    throw new Error('Failed to fetch cat image')
  }
  
  return data[0]
}

export async function generateMemeCaption(): Promise<{ top: string; bottom: string }> {
  const promptText = 'Generate a funny cat meme caption. Return ONLY valid JSON with this exact structure: {"top": "top text here", "bottom": "bottom text here"}. The top text should be a setup and bottom text should be the punchline. Keep each text under 40 characters. Make it funny and relatable to internet cat meme culture. Examples of style: "HOOMAN LEAVES FOR 5 MINUTES" / "I THOUGHT YOU WERE GONE FOREVER", "I FITS" / "I SITS", "NOT SURE IF HUNGRY" / "OR JUST BORED".'
  
  const response = await window.spark.llm(promptText, 'gpt-4o-mini', true)
  const parsed = JSON.parse(response)
  
  return {
    top: parsed.top || '',
    bottom: parsed.bottom || ''
  }
}

export function createMemeImage(
  imageUrl: string,
  topText: string,
  bottomText: string,
  width: number = 800
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    if (!ctx) {
      reject(new Error('Failed to get canvas context'))
      return
    }
    
    const img = new Image()
    img.crossOrigin = 'anonymous'
    
    img.onload = () => {
      const aspectRatio = img.height / img.width
      canvas.width = width
      canvas.height = width * aspectRatio
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = 'white'
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 4
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      ctx.font = 'bold 48px Impact, "Arial Black", sans-serif'
      
      const maxWidth = canvas.width - 40
      
      if (topText) {
        const topTextUpper = topText.toUpperCase()
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
      
      resolve(canvas.toDataURL('image/jpeg', 0.9))
    }
    
    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }
    
    img.src = imageUrl
  })
}

export function downloadMeme(dataUrl: string, filename: string = 'cat-meme.jpg') {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
