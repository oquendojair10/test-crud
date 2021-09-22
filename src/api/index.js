import axios from 'axios'
import user from './User'
import todo from './Todo'

axios.interceptors.response.use((response) => {
  return response
})

const api = {
  user,
  todo
}

export default api
