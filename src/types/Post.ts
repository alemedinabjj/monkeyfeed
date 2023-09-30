export interface Author {
  username: string
  avatar_url: string
  role: string
  id: string
}

export interface PostProps {
  author: Author;
  createdAt: Date;
  content: string
  id: string
  comments: Comment[]
  authorId: string
}

export interface Content { 
  type: string
  content: string
}