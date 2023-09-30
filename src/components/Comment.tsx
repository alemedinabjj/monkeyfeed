import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react'
import { Avatar } from './Avatar'
import { CommentProps } from '../types/Comment'

import styles from './Comment.module.css'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'


export function Comment ({ content, deleteComment, createdAt, author, id }: any) {

  const [likeCount, setLikeCount] = useState(0)

  async function handleDeleteComment() {
    await deleteComment(id)
  }

  function handleLikeCount() {
    setLikeCount(state => state + 1)
  }

  const publishedDateRelativeToNow = formatDistanceToNow(new Date(createdAt), {
    locale: ptBR,
    addSuffix: true
  })

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/alemedinabjj.png" alt="" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{author.username}</strong>
              <time title="10 do 7 as 19:29h" dateTime={new Date(createdAt).toISOString()}>
                <span>
                  {publishedDateRelativeToNow}
                </span>
              </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>
          <p>
            {content}
          </p>
        </div>
        <footer>
          <button onClick={handleLikeCount}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}

