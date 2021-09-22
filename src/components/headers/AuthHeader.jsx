import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import { generateLinks, useActivePaths } from '../../utils/functions/routeUtils'

import logo from '../../assets/img/logo.svg'
import ThemeSwitch from '../util/ThemeSwitch'
import { authRoutes } from '../../routes'
import LanguageSelector from '../../intl/LanguageSelector'
import { useIntl } from 'react-intl'
const { Header } = Layout

const AuthHeader = () => {
  const { formatMessage } = useIntl()

  return (
    <Header>
      <div className='auth-header'>
        <Link to='/'>
          <img src={logo} alt='Brand logo' className='app-logo' />
        </Link>
        <div className='auth-header-menu'>
          <div>
            <ThemeSwitch />
            <span className='mx-3'>
              <LanguageSelector />
            </span>
          </div>
          <Menu
            theme='dark'
            mode='horizontal'
            selectedKeys={useActivePaths()}
            disabledOverflow
          >
            {generateLinks(authRoutes, false, formatMessage)}
          </Menu>
        </div>
      </div>
    </Header>
  )
}

export default AuthHeader
