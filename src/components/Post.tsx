import styles from './Post.module.css'
import { Comment } from './Comment'
import { Avatar } from './Avatar'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR  } from 'date-fns/locale'
import { useState, FormEvent, ChangeEvent } from 'react'
import { PostProps } from '../types/Post'

export function Post({ author, content, publishedAt }: PostProps) {
  const [comments, setComments] = useState([
    'Post muito bacana hein ?!',
  ]);

  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(publishedAt,
     "dd 'de' MMMM 'às' HH:mm",
      { locale: ptBR }
  )

  const isNewCommentEmpty = newCommentText === '' ? `${styles.buttonDisabled}` : `${styles.buttonEnabled}`

  function newCommentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity('');
    setNewCommentText(e.target.value);
  }

  function handleCreateNewComment(e: FormEvent) {
    e.preventDefault()

    setComments([...comments, newCommentText])
    console.log(comments)
    setNewCommentText('')
  }

  function handleNewCommentInvalid(e: ChangeEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity('Por favor, preencha este campo')
  }

  function deleteComment(comment: string) {
    setComments([...comments.filter(c => c !== comment)])
  }

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar 
            src={author.avatar_url}
          />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>


      <div className={styles.content}>
        {content.map(line => (
          line.type === 'link' ? ( <a key={line.content} href={line.content}>{line.content}</a> ) : ( <p key={line.content}>{line.content}</p> )
        ))}
      </div>


      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          placeholder="Escreva seu comentário aqui"
          onInvalid={handleNewCommentInvalid}
          required
          name="comment"
          value={newCommentText}
          onChange={newCommentChange}
        />

        <footer>
          <button type='submit' 
          className={isNewCommentEmpty}
          >
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => (
          <Comment deleteComment={deleteComment} content={comment} key={comment} />
        ))}
      </div>
    </article>
  )
}
