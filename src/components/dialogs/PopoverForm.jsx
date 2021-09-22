import React, { useState } from 'react'
import { Popover, Button } from 'antd'

const PopoverForm = ({ children, type, title, icon, block, className }) => {
  const [visible, setVisible] = useState(false)

  const newChildren = React.cloneElement(children || <></>, {
    closeDialog: () => setVisible(false),
  })

  return (
    <Popover
      content={newChildren}
      visible={visible}
      onVisibleChange={(visible) => setVisible(visible)}
      trigger='click'
      placement='right'
    >
      <Button icon={icon} type={type} block={block} className={className}>
        {title}
      </Button>
    </Popover>
  )
}

export default PopoverForm
