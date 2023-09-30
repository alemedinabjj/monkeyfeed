import { Header } from "./components/Header"
import { Timeline } from "./components/Timeline"
import './global.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from 'react-query'
import { Login } from "./components/Login"
import { AuthProvider } from "./contexts/AuthProvider"




export function App() {
  const queryClient = new QueryClient()
  const token = localStorage.getItem('@token-monkey')

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Timeline />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  )
}


