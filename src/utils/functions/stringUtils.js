export const capitalCase = (str) =>
  str
    .split(' ')
    .map((w) => `${w[0].toUpperCase()}${w.substr(1).toLowerCase()}`)
    .join(' ')
