import { Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import AuthHeader from '../components/headers/AuthHeader'
import { generateRoutes } from '../utils/functions/routeUtils'
import { authRoutes } from '../routes'
import NotFound from '../views/NotFound'

const { Content } = Layout

const AuthLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AuthHeader />
      <Content>
        <Switch>
          {generateRoutes(authRoutes)}
          <Route component={NotFound} />
        </Switch>
      </Content>
    </Layout>
  )
}

export default AuthLayout
