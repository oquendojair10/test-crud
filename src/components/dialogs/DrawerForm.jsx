import React, { useState } from 'react'
import { Drawer, Button } from 'antd'
import PropTypes from 'prop-types'

const DrawerForm = ({
  children,
  type,
  buttonTitile,
  dialogTitle,
  block,
  ghost,
  icon,
  width,
  disabled,
  bodyStyle,
  destroyOnClose,
}) => {
  const [visible, setVisible] = useState(false)

  const openDialog = () => {
    setVisible(true)
  }

  const closeDialog = () => {
    setVisible(false)
  }

  const newChildren = React.cloneElement(children, {
    closeDialog,
  })

  return (
    <>
      <Button
        icon={icon}
        type={type}
        block={block}
        ghost={ghost}
        onClick={openDialog}
        disabled={disabled}
      >
        {buttonTitile}
      </Button>
      <Drawer
        destroyOnClose={destroyOnClose}
        width={width}
        placement='right'
        title={
          icon ? (
            <>
              {icon}&nbsp;{dialogTitle}
            </>
          ) : (
            <>{dialogTitle}</>
          )
        }
        onClose={closeDialog}
        visible={visible}
        bodyStyle={bodyStyle}
      >
        {newChildren}
      </Drawer>
    </>
  )
}

DrawerForm.defaultProps = {
  width: 360,
}

DrawerForm.propTypes = {
  children: PropTypes.element.isRequired,
  type: PropTypes.string,
  buttonTitile: PropTypes.string,
  dialogTitle: PropTypes.string,
  block: PropTypes.bool,
  ghost: PropTypes.bool,
  icon: PropTypes.element,
  width: PropTypes.number,
  disabled: PropTypes.bool,
  bodyStyle: PropTypes.object,
  destroyOnClose: PropTypes.bool,
}

export default DrawerForm
