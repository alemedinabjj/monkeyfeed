import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react'
import { Avatar } from './Avatar'
import { CommentProps } from '../types/Comment'

import styles from './Comment.module.css'


export function Comment ({ content, deleteComment }: CommentProps) {

  const [likeCount, setLikeCount] = useState(0)

  function handleDeleteComment() {
    deleteComment(content)
  }

  function handleLikeCount() {
    setLikeCount(state => state + 1)
  }


  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/alemedinabjj.png" alt="" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Alexandre Medina</strong>
              <time title="10 do 7 as 19:29h" dateTime="2022-07-10 19:29:00">
                <span>Cerca de 1h atrás</span>
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

