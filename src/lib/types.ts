export interface CatImage {
  id: string
  url: string
  width: number
  height: number
}

export interface MemeText {
  top: string
  bottom: string
}

export interface SavedMeme {
  id: string
  imageUrl: string
  topText: string
  bottomText: string
  dataUrl: string
  createdAt: number
  blogPost?: BlogPost
}

export interface BlogPost {
  title: string
  content: string
  author: string
  publishedDate: string
}
