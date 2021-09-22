import { notification } from 'antd'
const placement = 'bottomRight'

export const successNotification = (description) => {
  notification.open({
    type: 'success',
    message: 'Success',
    description,
    placement,
  })
}

export const infoNotification = (description) => {
  notification.open({
    type: 'info',
    message: 'Info',
    description,
    placement,
  })
}

export const errorNotification = (error) => {
  notification.open({
    type: 'error',
    message: 'Error',
    description: error.response ? error.response.data.message : error.message,
    placement,
  })
}
