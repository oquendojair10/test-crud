import { useState, useEffect } from 'react'
import { errorNotification } from './actionNotifications'

export const useGet = (
  axiosFunc,
  variables,
  { isObj, cancelFirstEffect } = {},
) => {
  const defData = isObj ? {} : []

  const [req, setReq] = useState({
    data: defData,
    loading: false,
    error: false,
  })

  useEffect(() => {
    if (!cancelFirstEffect) {
      getData()
    }
  }, [cancelFirstEffect])

  const getData = async (newVariables) => {
    setReq({ data: defData, loading: true, error: false })
    try {
      const { data } = await axiosFunc(newVariables || variables)
      setReq({ data, loading: false })
    } catch (error) {
      errorNotification(error)
      setReq({ data: defData, loading: false, error })
    }
  }

  return { ...req, refetch: getData }
}

export const useGetReactive = (
  axiosFunc,
  variables,
  { onCompleted, onError, cancelFirstEffect } = {},
) => {
  const [req, setReq] = useState({
    loading: false,
    error: false,
  })

  useEffect(() => {
    if (!cancelFirstEffect) {
      getData()
    }
  }, [cancelFirstEffect])

  const getData = async (newVariables) => {
    setReq({ loading: true, error: false })
    try {
      const { data } = await axiosFunc(newVariables || variables)
      setReq({ loading: false })
      onCompleted(data)
    } catch (error) {
      errorNotification(error)
      setReq({ loading: false, error })
      if (onError) {
        onError(error)
      }
    }
  }

  return { ...req, refetch: getData }
}

export const useMutation = (axiosFunc, { onCompleted, onError } = {}) => {
  const defData = undefined
  const [req, setReq] = useState({
    loading: false,
    error: false,
  })

  const execFunction = async (variables) => {
    setReq({ loading: true, error: false })
    try {
      const { data } = await axiosFunc(variables)
      setReq({ data, loading: false })
      if (onCompleted) {
        onCompleted({ data, variables })
      }
      return data
    } catch (error) {
      errorNotification(error)
      setReq({ loading: false })
      if (onError) {
        onError(error)
      }
      return defData
    }
  }

  return [execFunction, { ...req }]
}
