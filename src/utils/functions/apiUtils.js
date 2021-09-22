export const getHeaders = (token, params = {}) => ({
  params,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
