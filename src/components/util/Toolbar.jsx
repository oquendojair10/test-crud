import { Space } from 'antd'

const Toolbar = ({ title, children, className }) => {
  return (
    <div
      className={`d-flex ${
        title ? 'justify-content-between' : 'justify-content-end'
      } mb-4 ${className}`}
    >
      <h2>{title}</h2>
      <Space>{children}</Space>
    </div>
  )
}

Toolbar.defaultProps = {
  children: <></>,
  className: '',
}

export default Toolbar
