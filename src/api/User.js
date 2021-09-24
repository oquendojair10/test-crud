import axios from 'axios'
import AbstractApi from './AbstractApi'
import { LOGIN_URL } from './apiConstants'

class User extends AbstractApi {
  constructor() {
    super('')
  }

  login = ({ obj }) =>
    axios.post(`${process.env.REACT_APP_API}${LOGIN_URL}`, obj)

  testGet = () => axios.get('https://jsonplaceholder.typicode.com/posts')
  loadAll = () => axios.get('https://jsonplaceholder.typicode.com/users')
}

export default new User()
