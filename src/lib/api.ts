import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api-monkey.onrender.com/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('@token-monkey')}`
  }
})

// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('@token-monkey')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )