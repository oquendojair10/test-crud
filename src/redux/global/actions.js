import { LOAD_ALL, SET_LOCALE } from './constants'

export const setLocale = (locale) => ({
  type: SET_LOCALE,
  locale,
})

export const loadAll = (data) => ({
  type: LOAD_ALL,
  data
})
