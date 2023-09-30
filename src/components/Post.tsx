import styles from './Post.module.css'
import { Comment } from './Comment'
import { Avatar } from './Avatar'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR  } from 'date-fns/locale'
import { useState, FormEvent, ChangeEvent } from 'react'
import { PostProps } from '../types/Post'
import { useMutation, useQueryClient } from 'react-query'
import { api } from '../lib/api'
import { ThumbsUp, Trash } from 'phosphor-react'

export function Post({ author, content, createdAt, id, comments }: PostProps) {
 
  console.log(comments)

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation(async (idPost) => {
    const response = await api.delete(`/posts/post/${idPost}`)

    return response.data
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts')
    }
  })

  const { mutateAsync: commentMutate } = useMutation(async (idPost) => {
    const response = await api.post(`/posts/post/${idPost}/comments`, {
      content: newCommentText
    })

    return response.data
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts')
    }
  })

  const { mutateAsync: commentDelete } = useMutation(async ({ idPost, idComment }: any) => {
    const response = await api.delete(`/posts/post/${idPost}/comments/${idComment}`)

    return response.data
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts')
    }
  })
  

  const [newCommentText, setNewCommentText] = useState('');


  const isNewCommentEmpty = newCommentText === '' ? `${styles.buttonDisabled}` : `${styles.buttonEnabled}`

  function newCommentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity('');
    setNewCommentText(e.target.value);
  }

  async function handleCreateNewComment(e: FormEvent) {
    e.preventDefault()

    await commentMutate(id as any)
    console.log(comments)
    setNewCommentText('')
  }

  function handleNewCommentInvalid(e: ChangeEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity('Por favor, preencha este campo')
  }

  async function deleteComment(idComment: string) {
    await commentDelete({ idPost: id, idComment: idComment })
  }

  async function deletePost() {
    await mutateAsync(id as any)
  }

  const publishedDateFormatted = format(new Date(createdAt),
    "dd 'de' MMMM 'às' HH:mm",
     { locale: ptBR }
 )

  const publishedDateRelativeToNow = formatDistanceToNow(new Date(createdAt), {
    locale: ptBR,
    addSuffix: true
  })

  return (
    <article className={styles.post}>
      <button onClick={deletePost} title="Deletar comentário">
        <Trash size={24} />
      </button>
      <header>
        <div className={styles.author}>
          <Avatar 
            src={author.avatar_url}
          />
          <div className={styles.authorInfo}>
            <strong>{author.username}</strong>
            {/* <span>{author.role}</span> */}
          </div>
        </div>

        {createdAt && (
          <time title={publishedDateFormatted} dateTime={new Date(createdAt).toISOString()}>
            {publishedDateRelativeToNow}
          </time>
        )}
      </header>


      <div className={styles.content}>
        {content}
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
        {comments.map((comment: any) => (
          <Comment deleteComment={deleteComment} content={comment.content} key={comment.id} {...comment} />
        ))}
      </div>


    </article>
  )
}
