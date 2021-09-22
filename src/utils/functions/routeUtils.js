import { Link, useLocation, Route } from 'react-router-dom'
import { Menu } from 'antd'
const { Item } = Menu

export const generateLinks = (routes, isSider, formatMessage) =>
  routes &&
  routes.map(
    (item) =>
      !item.hidden && (
        <Item key={item.path}>
          <Link to={item.path}>
            {item.icon}
            <span className={isSider ? '' : 'd-none d-sm-inline ml-2'}>
              {formatMessage({ id: item.name })}
            </span>
          </Link>
        </Item>
      ),
  )

export const generateRoutes = (routes) =>
  routes &&
  routes.map((item) => (
    <Route key={item.path} path={item.path} component={item.component} />
  ))

export const useActivePaths = () => [useLocation().pathname]

export const getPathWithoutParam = (path) => path.split(':').shift()

export const findActiveTab = (accessRoutes, activePath) => {
  const withoutParamsRoutes = accessRoutes.map((r) => ({
    ...r,
    path: getPathWithoutParam(r.path),
  }))

  const findedActiveTab = withoutParamsRoutes.find((r) =>
    activePath[0].includes(r.path),
  )

  return findedActiveTab
}
