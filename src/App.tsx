import { Header } from "./components/Header"
import { Post } from "./components/Post"
import './global.css'
import styles from './App.module.css'
import { Sidebar } from "./components/Sidebar"

// author: { avatar_url: "", name: "", role: "" }
//publishedAt: date
//content: string 

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

export function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => (
            <Post key={post.id} {...post} />
          ))}
        </main>
      </div>
    </>
  )
}


