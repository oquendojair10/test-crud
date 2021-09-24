import { Button, Form, Input } from 'antd'
import { connect } from 'react-redux'
import { login } from '../../redux/session/actions'
import { useMutation, useGet } from '../../utils/functions/hooks'
import api from '../../api'
import { useIntl } from 'react-intl'
import { useEffect } from 'react'

const { useForm, Item } = Form
const { Password } = Input

const LoginForm = ({ handleLogin }) => {
  const { formatMessage } = useIntl()
  const [form] = useForm()
  useEffect(() => {
    form.setFieldsValue({
      email: 'test@mai.com',
      password: '124',
    })
  }, [])
  // const { data, loading: loadingGet, error, refetch } = useGet(api.user.testGet, {})
  // refetch({ token: '1234' })
  // console.log(data, loadingGet)
  const onCompleted = ({ data }) => {
    const { user, accessToken: token } = data
    handleLogin(user, token)
  }

  const [login, { loading }] = useMutation(api.user.login, {
    onCompleted,
  })

  const onFinish = (values) => {
    // login({ obj: values })
    // console.log(values)
    handleLogin(
      {
        _id: '12345',
        firstName: 'Jonh',
        lastName: 'Doe',
        role: 'Admin',
      },
      '13456',
    )
  }

  return (
    <Form form={form} layout='vertical' onFinish={onFinish}>
      <Item
        label={formatMessage({ id: 'email' })}
        name='email'
        rules={[{ required: true }, { type: 'email' }]}
      >
        <Input />
      </Item>
      <Item
        label={formatMessage({ id: 'password' })}
        name='password'
        rules={[{ required: true }]}
      >
        <Password />
      </Item>
      <Item noStyle>
        <Button type='primary' htmlType='submit' block loading={loading}>
          {formatMessage({ id: 'logIn' })}
        </Button>
      </Item>
    </Form>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (user, token) => dispatch(login(user, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
