import { useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Breadcrumb, Button, Layout, Menu, Popover, Space } from 'antd'
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons'
import {
  findActiveTab,
  generateLinks,
  generateRoutes,
  useActivePaths,
} from '../utils/functions/routeUtils'
import { selectUser } from '../redux/session/selectors'
import { connect } from 'react-redux'
import { logout } from '../redux/session/actions'
import { mainDefaultRoute, mainRoutes } from '../routes'

import ThemeSwitch from '../components/util/ThemeSwitch'
import NotFound from '../views/NotFound'

import logo from '../assets/img/logo.svg'
import NameAvatar from '../components/avatar/NameAvatar'
import DrawerForm from '../components/dialogs/DrawerForm'
import { useIntl } from 'react-intl'

const { Sider, Content } = Layout

const MainLayout = ({ user, handleLogout }) => {
  const { formatMessage } = useIntl()
  const [collapsed, setCollapsed] = useState(false)

  const accessRoutes =
    user.role && mainRoutes[user.role] ? mainRoutes[user.role] : []

  const activePaths = useActivePaths()
  const activeTab = findActiveTab(accessRoutes, activePaths)

  const MainMenu = ({ closeDialog = () => {} }) => (
    <>
      <Link to={mainDefaultRoute}>
        <div className='main-logo-container'>
          <img src={logo} alt='Brand logo' className='app-logo' />
        </div>
      </Link>
      <Menu
        mode='inline'
        theme='dark'
        selectedKeys={activePaths}
        onClick={closeDialog}
      >
        {generateLinks(accessRoutes, true, formatMessage)}
      </Menu>
      <div className='d-flex justify-content-center mt-4'>
        <ThemeSwitch />
      </div>
    </>
  )

  const UserMenu = (
    <>
      <p className='text-center'>
        {user.firstName} {user.lastName}
      </p>
      <Button
        type='text'
        block
        onClick={handleLogout}
        icon={<LogoutOutlined />}
      >
        {formatMessage({ id: 'logout' })}
      </Button>
    </>
  )

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(isColapsed) => setCollapsed(isColapsed)}
        className='d-none d-md-block'
      >
        <MainMenu />
      </Sider>
      <Layout>
        <Content>
          <div className='page-title'>
            <div>
              {activeTab && (
                <>
                  <h1 className='mb-0'>
                    {activeTab.icon} {formatMessage({ id: activeTab.name })}
                  </h1>
                  <Breadcrumb>
                    {activeTab.path.split('/').map((path) => (
                      <Breadcrumb.Item key={path}>{path}</Breadcrumb.Item>
                    ))}
                  </Breadcrumb>
                </>
              )}
            </div>
            <Space>
              <Popover
                content={UserMenu}
                placement='leftTop'
                trigger={['click', 'hover']}
              >
                <div className='d-flex align-items-center'>
                  {/* <span className='mr-2'>{rolesConst[user.role].name}</span> */}
                  <NameAvatar name={user.firstName} />
                </div>
              </Popover>
              <span className='d-inline d-md-none'>
                <DrawerForm
                  drawerTitle='Menu'
                  icon={<MenuOutlined />}
                  bodyStyle={{ padding: '0' }}
                >
                  <MainMenu />
                </DrawerForm>
              </span>
            </Space>
          </div>
          <div className='container-fluid mb-4'>
            <Switch>
              {generateRoutes(accessRoutes)}
              <Route component={NotFound} />
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = (state) => ({
  user: selectUser(state),
})

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)
