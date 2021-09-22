import { Avatar } from 'antd'

const NameAvatar = ({ name }) => {
  return (
    <Avatar style={{ backgroundColor: 'var(--primary)' }}>
      {name.slice(0, 1)}
    </Avatar>
  )
}

NameAvatar.defaultProps = {
  name: '',
}

export default NameAvatar
