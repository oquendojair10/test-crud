import moment from 'moment'

export const getMomentIfExist = (val) => (val ? moment(val) : undefined)
export const getMomentUtcIfExist = (val) => (val ? moment.utc(val) : undefined)

/**
 * Use when you need to send to backend some formatted date
 * @param {Date} val
 * @param {string} format
 * @returns String date with l as default format
 */
export const formatMomentIfExist = (val, format = 'l') => {
  const parsedMoment = getMomentIfExist(val)
  return parsedMoment && parsedMoment.isValid()
    ? moment(parsedMoment).format(format)
    : ''
}

/**
 * Use when you need to display only (It prevent locale errors)
 * @param {Date} val
 * @param {string} format
 * @returns String date with l as default format
 */
export const formatMomentUtcIfExist = (val, format = 'l') => {
  const parsedMoment = getMomentIfExist(val)
  return parsedMoment && parsedMoment.isValid()
    ? moment.utc(parsedMoment).format(format)
    : ''
}
