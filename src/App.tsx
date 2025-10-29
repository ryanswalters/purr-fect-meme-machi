import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { MemeCanvas } from '@/components/MemeCanvas'
import { MemeHistory } from '@/components/MemeHistory'
import { Sparkle, Download, ArrowsClockwise, Image as ImageIcon } from '@phosphor-icons/react'
import { fetchRandomCat, generateMemeCaption, createMemeImage, downloadMeme } from '@/lib/meme-utils'
import type { CatImage, SavedMeme } from '@/lib/types'
import { toast } from 'sonner'

function App() {
  const [currentCat, setCurrentCat] = useState<CatImage | null>(null)
  const [topText, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')
  const [isLoadingCat, setIsLoadingCat] = useState(false)
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [savedMemes, setSavedMemes] = useKV<SavedMeme[]>('saved-memes', [])

  useEffect(() => {
    loadNewCat()
  }, [])

  async function loadNewCat() {
    setIsLoadingCat(true)
    try {
      const cat = await fetchRandomCat()
      setCurrentCat(cat)
      setTopText('')
      setBottomText('')
      toast.success('New cat loaded!')
    } catch (error) {
      toast.error('Failed to load cat image. Please try again.')
      console.error(error)
    } finally {
      setIsLoadingCat(false)
    }
  }

  async function generateCaption() {
    setIsGeneratingCaption(true)
    try {
      const caption = await generateMemeCaption()
      setTopText(caption.top)
      setBottomText(caption.bottom)
      toast.success('Caption generated!')
    } catch (error) {
      toast.error('Failed to generate caption. Please try again.')
      console.error(error)
    } finally {
      setIsGeneratingCaption(false)
    }
  }

  async function saveMeme() {
    if (!currentCat || (!topText && !bottomText)) {
      toast.error('Please add some text to your meme')
      return
    }

    setIsSaving(true)
    try {
      const dataUrl = await createMemeImage(currentCat.url, topText, bottomText)
      const newMeme: SavedMeme = {
        id: Date.now().toString(),
        imageUrl: currentCat.url,
        topText,
        bottomText,
        dataUrl,
        createdAt: Date.now()
      }
      
      setSavedMemes((current) => [newMeme, ...(current || [])])
      downloadMeme(dataUrl, `cat-meme-${newMeme.id}.jpg`)
      toast.success('Meme saved and downloaded!')
    } catch (error) {
      toast.error('Failed to save meme. Please try again.')
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  function deleteMeme(id: string) {
    setSavedMemes((current) => (current || []).filter(meme => meme.id !== id))
    toast.success('Meme deleted')
  }

  const memesList = savedMemes || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-cyan-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
            Cat Meme Generator
          </h1>
          <p className="text-muted-foreground text-lg">
            AI-powered cat memes at your fingertips
          </p>
        </header>

        <Tabs defaultValue="generator" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="generator" className="gap-2">
              <Sparkle size={18} />
              Generator
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <ImageIcon size={18} />
              History ({memesList.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>Meme Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoadingCat ? (
                    <Skeleton className="w-full aspect-square rounded-lg" />
                  ) : currentCat ? (
                    <MemeCanvas
                      imageUrl={currentCat.url}
                      topText={topText}
                      bottomText={bottomText}
                      className="w-full"
                    />
                  ) : (
                    <div className="aspect-square flex items-center justify-center bg-muted rounded-lg">
                      <p className="text-muted-foreground">No cat loaded</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Controls</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      onClick={loadNewCat}
                      disabled={isLoadingCat}
                      className="w-full gap-2"
                      variant="secondary"
                      size="lg"
                    >
                      <ArrowsClockwise size={20} />
                      {isLoadingCat ? 'Loading...' : 'New Cat'}
                    </Button>

                    <Button
                      onClick={generateCaption}
                      disabled={isGeneratingCaption || !currentCat}
                      className="w-full gap-2"
                      size="lg"
                    >
                      <Sparkle size={20} />
                      {isGeneratingCaption ? 'Generating...' : 'Generate Caption'}
                    </Button>

                    <Button
                      onClick={saveMeme}
                      disabled={isSaving || !currentCat || (!topText && !bottomText)}
                      className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                      size="lg"
                    >
                      <Download size={20} />
                      {isSaving ? 'Saving...' : 'Download Meme'}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Custom Text</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="top-text">Top Text</Label>
                      <Input
                        id="top-text"
                        value={topText}
                        onChange={(e) => setTopText(e.target.value)}
                        placeholder="Enter top text..."
                        maxLength={60}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bottom-text">Bottom Text</Label>
                      <Input
                        id="bottom-text"
                        value={bottomText}
                        onChange={(e) => setBottomText(e.target.value)}
                        placeholder="Enter bottom text..."
                        maxLength={60}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Your Memes</CardTitle>
              </CardHeader>
              <CardContent>
                <MemeHistory memes={memesList} onDelete={deleteMeme} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App