import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { selectToken, selectUser } from '../redux/session/selectors'
import { loginRoute } from '../routes'

const Main = ({ component: Component, user, token }) => {
  return token && user && user._id ? (
    <Component />
  ) : (
    <Redirect to={loginRoute} />
  )
}

const mapStateToProps = (state) => ({
  user: selectUser(state),
  token: selectToken(state),
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
