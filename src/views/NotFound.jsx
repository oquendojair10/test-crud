import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'
import { loginRoute } from '../routes'

const NotFound = () => {
  return (
    <Result
      status='404'
      title='404'
      subTitle="We haven't found what you're looking for"
      extra={
        <Link to={loginRoute}>
          <Button type='primary'>Back</Button>
        </Link>
      }
    />
  )
}

export default NotFound
