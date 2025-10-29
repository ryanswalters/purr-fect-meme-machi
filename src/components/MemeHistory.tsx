import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Download, Trash } from '@phosphor-icons/react'
import type { SavedMeme } from '@/lib/types'
import { downloadMeme } from '@/lib/meme-utils'

interface MemeHistoryProps {
  memes: SavedMeme[]
  onDelete: (id: string) => void
}

export function MemeHistory({ memes, onDelete }: MemeHistoryProps) {
  if (memes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground text-lg">No memes saved yet</p>
        <p className="text-muted-foreground text-sm mt-2">
          Generate and save your first cat meme to see it here
        </p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[600px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
        {memes.map((meme) => (
          <Card key={meme.id} className="overflow-hidden group">
            <div className="relative">
              <img
                src={meme.dataUrl}
                alt="Saved meme"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => downloadMeme(meme.dataUrl, `cat-meme-${meme.id}.jpg`)}
                >
                  <Download size={20} />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => onDelete(meme.id)}
                >
                  <Trash size={20} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}
