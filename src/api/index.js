import axios from 'axios'
import user from './User'
import todo from './Todo'
import types from './Types'

axios.interceptors.response.use((response) => {
  return response
})

const api = {
  user,
  todo,
  types
}

export default api
