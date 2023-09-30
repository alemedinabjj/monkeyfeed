import { Header } from "./components/Header"
import { Timeline } from "./components/Timeline"
import './global.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from 'react-query'
import { Login } from "./components/Login"




export function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Timeline />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}


