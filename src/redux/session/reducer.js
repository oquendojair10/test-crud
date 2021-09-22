import produce from 'immer'
import { LOGIN, LOGOUT } from './constants'

const initialState = {}

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOGIN:
        draft.user = action.user
        draft.token = action.token
        break
      case LOGOUT:
        return initialState
      default:
        break
    }
  })

export default reducer
