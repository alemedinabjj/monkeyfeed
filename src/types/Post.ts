export interface Author {
  username: string
  avatar_url: string
  role: string
}

export interface PostProps {
  author: Author;
  createdAt: Date;
  content: string
  id: string
  comments: Comment[]
}

export interface Content { 
  type: string
  content: string
}