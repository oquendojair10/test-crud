import { useEffect } from 'react'
import api from '../../api'
import { useIntl } from 'react-intl'
import { useMutation } from '../../utils/functions/hooks'

import { Button, Card, Form, Input } from 'antd'
import { Select } from 'antd'
const { Option } = Select

const { useForm, Item } = Form

function HomeForm({ refetch, defaultValue, handleCancel, types, users }) {
  const { formatMessage } = useIntl()
  const [form] = useForm()
  const url = !defaultValue ? api.todo.create : api.todo.edit
  const onCompleted = ({ data }) => {
    setTimeout(() => {
      handleCancel()
      refetch(data)
    }, 1500)
  }

  useEffect(() => {
    if (defaultValue) {
      form.setFieldsValue(defaultValue)
    }
  }, [])

  const [submit, { loading }] = useMutation(url, {
    onCompleted,
  })

  const onFinish = (values) => {
    submit({ obj: values, id: defaultValue?._id })
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6'>
          <Card>
            <div>
              <h2>
                {formatMessage({ id: `${!defaultValue ? 'new' : 'edit'}` })}{' '}
                Todo
              </h2>
            </div>
            <Form form={form} layout='vertical' onFinish={onFinish}>
              <Item
                name='userId'
                label={formatMessage({ id: 'userid' })}
                rules={[{ required: true }]}
              >
                <Select placeholder={`${formatMessage({ id: 'select' })}`}>
                  {users.map((item) => (
                    <Option value={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Item>
              <Item
                name='title'
                label={formatMessage({ id: 'title' })}
                rules={[{ required: true }]}
              >
                <Input />
              </Item>
              <Item
                name='type'
                label={formatMessage({ id: 'type' })}
                rules={[{ required: true }]}
              >
                <Select placeholder={`${formatMessage({ id: 'select' })}`}>
                  {types.map((item) => (
                    <Option value={item._id}>{item.name}</Option>
                  ))}
                </Select>
              </Item>
              <Item
                name='body'
                label={formatMessage({ id: 'body' })}
                rules={[{ required: true }]}
              >
                <Input />
              </Item>
              <Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  loading={loading}
                  block
                >
                  {formatMessage({ id: `${!defaultValue ? 'new' : 'edit'}` })}
                </Button>
              </Item>
              <Item noStyle>
                <Button type='secondary' onClick={handleCancel} block>
                  {formatMessage({ id: 'cancel' })}
                </Button>
              </Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default HomeForm
