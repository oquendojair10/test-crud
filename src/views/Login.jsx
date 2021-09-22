import { Card } from 'antd'
import LoginForm from '../components/forms/LoginForm'
import logo from '../assets/img/logo.svg'

const Login = () => {
  return (
    <>
      <div
        style={{ minHeight: '80vh' }}
        className='d-flex justify-content-center align-items-center flex-column'
      >
        <img
          src={logo}
          alt='App Logo'
          className='mb-4'
          style={{ zIndex: 1, width: '60px' }}
        />
        <div className='col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3'>
          <Card>
            <LoginForm />
          </Card>
        </div>
      </div>
    </>
  )
}

export default Login
