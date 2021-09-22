export const getArrFromObj = (arr) =>
  Object.keys(arr).map((key) => ({
    ...arr[key],
    key,
  }))
