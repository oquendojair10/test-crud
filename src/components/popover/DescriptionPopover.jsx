import { Popover } from 'antd'

const DescriptionPopover = ({ description }) => {
  return (
    <Popover
      content={<p style={{ maxWidth: '450px' }}>{description}</p>}
      trigger='click'
      placement='bottom'
    >
      {description.substring(0, 5)}...
    </Popover>
  )
}

export default DescriptionPopover
