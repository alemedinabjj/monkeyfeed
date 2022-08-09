export interface Author {
  name: string
  avatar_url: string
  role: string
}

export interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export interface Content { 
  type: 'paragraph' | 'link'
  content: string
}