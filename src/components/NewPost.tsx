import { useMutation, useQueryClient } from 'react-query'
import styles from './NewPost.module.css'
import { api } from '../lib/api'
import { SubmitHandler, useForm } from 'react-hook-form'

type NewPostProps = {
  content: string
}

export function NewPost() {
  const { handleSubmit, register, formState: { isSubmitting }, watch, reset } = useForm<NewPostProps>()

  const newPostContent = watch('content')

  const queryClient = useQueryClient()

  const areaDisabled = newPostContent === ''

  const { mutateAsync } = useMutation(['posts'], async (data) => {
    const response = await api.post('/posts/create', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('@token-monkey')}`
      }
    })

    return response.data
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries('posts')
      reset()
    }
  })

  const onSubmit: SubmitHandler<NewPostProps> = async (data) => {
    console.log(data)

    await mutateAsync(data as any)
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.commentForm}>
    <strong>Novo post</strong>
    <textarea
      placeholder="No que você está pensando?"
      required
      {...register('content')}
    />

    <footer>
      <button type='submit'
        disabled={areaDisabled}
      >
        Publicar
      </button>
    </footer>
  </form>
  )
}