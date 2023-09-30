import { NewPost } from "./NewPost";
import { Sidebar } from "./Sidebar";
import styles from './App.module.css'
import { Post } from "./Post";
import { Header } from "./Header";
import { useQuery } from "react-query";
import { api } from "../lib/api";


export function Timeline() {
  const { data } = useQuery(['posts'], async () => {
    const res = await api.get('/posts/all-posts')
    console.log(res)
    return res.data
  },
  {
    refetchInterval: 1000 * 60 // 1 minuto
  }
  )

  return (
  <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
        <NewPost />
          {data?.posts && data?.posts?.map((post: any) => (
            <Post key={post.id} {...post} />
          ))}
        </main>
      </div>
  </>
  )
}