const reducerKey = 'global'

export const selectLocale = (state) => state[reducerKey].locale

export const loadAll = (state) => state[reducerKey].data
