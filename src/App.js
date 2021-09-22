import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './redux/store'
import { Provider } from 'react-redux'

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { loginRoute } from './routes'

import Auth from './navigation/Auth'
import AuthLayout from './layouts/AuthLayout'
import Main from './navigation/Main'
import MainLayout from './layouts/MainLayout'

import { ThemeSwitcherProvider } from 'react-css-theme-switcher'
// import 'antd/dist/antd.css'
import 'bootstrap-4-grid/css/grid.min.css'
import './assets/css/app.css'
import NotFound from './views/NotFound'
import IntlWrapper from './intl/IntlWrapper'

const themes = {
  light: `${process.env.PUBLIC_URL}/antd-light.css`,
  dark: `${process.env.PUBLIC_URL}/antd-dark.css`,
}

function App() {
  return (
    <ThemeSwitcherProvider themeMap={themes} defaultTheme='light'>
      <Provider store={store}>
        <PersistGate loading='Loading' persistor={persistor}>
          <IntlWrapper>
            <BrowserRouter>
              <Switch>
                <Route
                  exact
                  path='/'
                  component={() => <Redirect to={loginRoute} />}
                />
                <Auth path='/auth' component={AuthLayout} />
                <Main path='/main' component={MainLayout} />
                <Route component={NotFound} />
              </Switch>
            </BrowserRouter>
          </IntlWrapper>
        </PersistGate>
      </Provider>
    </ThemeSwitcherProvider>
  )
}

export default App
