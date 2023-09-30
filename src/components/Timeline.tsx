import { NewPost } from "./NewPost";
import { Sidebar } from "./Sidebar";
import styles from './App.module.css'
import { Post } from "./Post";
import { Header } from "./Header";
import { useQuery } from "react-query";
import { api } from "../lib/api";
const posts = [
  {
    id: 1,
    author: {
      avatar_url: "https://github.com/alemedinabjj.png",
      name: "Alexandre Medina",
      role: "Web Developer"
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋',},
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz'},
      { type: 'paragraph', content: 'no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      { type: 'link', content: 'jane.design/doctor-care'},
    ],
    publishedAt: new Date('2022-08-09 05:00:00'),
  },
  {
    id: 2,
    author: {
      avatar_url: "https://github.com/maykbrito.png",
      name: "Mayk Brito",
      role: "Instrutor at Rocketseat"
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋',},
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz'},
      { type: 'paragraph', content: 'no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      { type: 'link', content: 'jane.design/doctor-care'},
    ],
    publishedAt: new Date('2022-08-07 20:00:00'),
    
  },
]

export function Timeline() {
  const { data } = useQuery(['posts'], async () => {
    const res = await api.get('/posts/all-posts')
    console.log(res)
    return res.data
  })

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