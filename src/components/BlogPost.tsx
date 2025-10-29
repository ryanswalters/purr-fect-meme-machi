import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { BlogPost as BlogPostType } from '@/lib/types'

interface BlogPostProps {
  blogPost: BlogPostType
  memeImageUrl?: string
}

export function BlogPost({ blogPost, memeImageUrl }: BlogPostProps) {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
          <span className="font-semibold text-primary">The Daily Meow</span>
          <span>•</span>
          <span>Meme Analysis</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          {blogPost.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{blogPost.author}</span>
          <span>•</span>
          <time>{blogPost.publishedDate}</time>
        </div>
      </CardHeader>
      
      <Separator />
      
      <CardContent className="pt-6 space-y-6">
        {memeImageUrl && (
          <div className="flex justify-center mb-8">
            <img 
              src={memeImageUrl} 
              alt="Meme being analyzed" 
              className="max-w-md w-full rounded-lg shadow-lg"
            />
          </div>
        )}
        
        <div className="prose prose-lg max-w-none">
          {blogPost.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-foreground leading-relaxed mb-4 text-justify">
              {paragraph}
            </p>
          ))}
        </div>

        <Separator className="my-8" />
        
        <div className="text-center text-sm text-muted-foreground italic">
          This analysis brought to you by The Daily Meow - where cat memes meet pretentious journalism since 2024
        </div>
      </CardContent>
    </Card>
  )
}
