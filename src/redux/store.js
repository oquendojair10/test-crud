import { combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'

import sessionReducer from './session/reducer'
import globalReducer from './global/reducer'

const mainReducer = combineReducers({
  session: sessionReducer,
  global: globalReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
}

const persistedReducer = persistReducer(persistConfig, mainReducer)

const store = createStore(
  persistedReducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export const persistor = persistStore(store)
export default store
