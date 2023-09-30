import { NewPost } from "./NewPost";
import { Sidebar } from "./Sidebar";
import styles from './App.module.css'
import { Post } from "./Post";
import { Header } from "./Header";
import { useInfiniteQuery, useQuery } from "react-query";
import { api } from "../lib/api";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useCallback } from "react";

const LIMIT = 5

const fetchPosts = async (page: number) => {
  const response = await api.get(`/posts/all-posts?page=${page}&limit=${LIMIT}`)
  return response.data
}

export function Timeline() {
  const { isAuthenticated } = useAuth()
  const observerElem = useRef(null)

  const navigate = useNavigate()

  if (!isAuthenticated) {
    navigate('/login')
  }

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['posts'], 
    ({ pageParam = 1 }) => fetchPosts(pageParam),
    {
      refetchInterval: 1000 * 60, // 1 minute,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1
        return nextPage 
      },
    },
  )
  
  const handleObserver = useCallback((entries: any) => {
    const [target] = entries
    if(target.isIntersecting) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage])
  
  useEffect(() => {
    const element = observerElem.current
    const option = { threshold: 0 }
  
    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element as any)
    return () => observer.unobserve(element as any)
  }, [fetchNextPage, hasNextPage, handleObserver])
  
  return (
  <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
        <NewPost />
        {isSuccess && data.pages.map((page) => {
          return page.posts.map((post: any) => {
            return <Post key={post.id} {...post} />
          })
        })}


        <div  ref={observerElem}>
          {isFetchingNextPage && hasNextPage ? <div className={styles.loader} /> : 'No search left'}
        </div>
        </main>
      </div>
  </>
  )
}