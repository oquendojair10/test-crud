import produce from 'immer'
import { SET_LOCALE, LOAD_ALL } from './constants'

const initialState = {
  locale: 'en',
}

export const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOCALE:
        draft.locale = action.locale
        break;
      case LOAD_ALL:
        draft.data = action.data
        break;
      default:
        break
    }
  })

export default reducer
