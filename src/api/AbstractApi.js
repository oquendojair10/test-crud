import axios from 'axios'
import { getHeaders } from '../utils/functions/apiUtils'

class AbstractApi {
  constructor(url) {
    this.url = `${process.env.REACT_APP_API}${url}`
  }

  findAll = ({ token, params }) =>
    axios.get(this.url, getHeaders(token, params))

  findById = ({ token, _id }) =>
    axios.get(`${this.url}/${_id}`, getHeaders(token))

  create = ({ token, obj }) => axios.post(`${this.url}`, obj, getHeaders(token))

  edit = ({ token, obj, _id }) =>
    axios.put(`${this.url}/${_id}`, obj, getHeaders(token))

  delete = ({ token, _id }) =>
    axios.delete(`${this.url}/${_id}`, getHeaders(token))
}

export default AbstractApi
