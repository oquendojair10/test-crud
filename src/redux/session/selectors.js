const reducerKey = 'session'

export const selectCount = (state) => state[reducerKey].count
export const selectUser = (state) => state[reducerKey].user
export const selectToken = (state) => state[reducerKey].token
export const selectUserRole = (state) => state[reducerKey].user.role
