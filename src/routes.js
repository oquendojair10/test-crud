import { HomeOutlined, LoginOutlined } from '@ant-design/icons'
import EmptyPage from './views/EmptyPage'
import Login from './views/Login'

export const loginRoute = '/auth/login'

export const mainDefaultRoute = '/main/home'

const homeRouteObj = {
  name: 'home',
  path: mainDefaultRoute,
  icon: <HomeOutlined />,
  component: EmptyPage,
}

export const mainRoutes = {
  Admin: [homeRouteObj],
}

/**
 * Use mx-auto on icons to prevent responsive errors just if route is not
 */
export const authRoutes = [
  {
    name: 'login',
    path: loginRoute,
    icon: <LoginOutlined className='mx-auto' />,
    component: Login,
    // hidden: true
  },
]
