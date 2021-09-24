import axios from 'axios'
import AbstractApi from './AbstractApi'
import { TYPES_URL } from './apiConstants'

class TYPE extends AbstractApi {
  constructor() {
    super(TYPES_URL)
  }
  loadAll = () => axios.get(`${process.env.REACT_APP_API}${TYPES_URL}`)
}

export default new TYPE()
