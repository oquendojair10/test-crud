import { LOGIN, LOGOUT } from './constants'

export const login = (user, token) => ({
  type: LOGIN,
  user,
  token,
})

export const logout = () => ({
  type: LOGOUT
})
