import axios from "axios";
import AbstractApi from "./AbstractApi";
import { TODO_URL } from './apiConstants'

class TODO extends AbstractApi {
  constructor() {
    super('')
  }

  loadAll = () =>
    axios.get(`${process.env.REACT_APP_API_TODO}${TODO_URL}`)
  create = ({ obj }) =>
    axios.post(`${process.env.REACT_APP_API_TODO}${TODO_URL}`, obj)
  edit = ({ id, obj }) =>
    axios.put(`${process.env.REACT_APP_API_TODO}${TODO_URL}/${id}`, obj)
  delete = ({ id }) =>
    axios.delete(`${process.env.REACT_APP_API_TODO}${TODO_URL}/${id}`)

}

export default new TODO()