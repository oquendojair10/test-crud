import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { selectToken, selectUser } from '../redux/session/selectors'
import { mainDefaultRoute } from '../routes'

const Auth = ({ component: Component, user, token }) => {
  return token && user && user._id ? (
    <Redirect to={mainDefaultRoute} />
  ) : (
    <Component />
  )
}

const mapStateToProps = (state) => ({
  user: selectUser(state),
  token: selectToken(state),
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
