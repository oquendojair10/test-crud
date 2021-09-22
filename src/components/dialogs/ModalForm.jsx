import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import PropTypes from 'prop-types'

const ModalForm = ({
  children,
  type,
  buttonTitle,
  modalTitle,
  disabled,
  block,
  icon,
  destroyOnClose,
  ghost,
  elemButton,
}) => {
  const [visible, setVisible] = useState(false)

  const openDialog = () => {
    setVisible(true)
  }
  const closeDialog = () => {
    setVisible(false)
  }

  const newChildren = React.cloneElement(children || <></>, {
    closeDialog,
  })

  const getNewElemButton = () =>
    React.cloneElement(elemButton || <></>, {
      onClick: openDialog,
    })

  return (
    <>
      {elemButton ? (
        getNewElemButton()
      ) : (
        <Button
          icon={icon}
          type={type}
          block={block}
          onClick={openDialog}
          ghost={ghost}
          disabled={disabled}
        >
          {buttonTitle}
        </Button>
      )}
      <Modal
        visible={visible}
        onCancel={closeDialog}
        title={
          icon ? (
            <>
              {icon}&nbsp;{modalTitle}
            </>
          ) : (
            <>{modalTitle}</>
          )
        }
        footer={null}
        destroyOnClose={destroyOnClose}
      >
        {newChildren}
      </Modal>
    </>
  )
}

ModalForm.propTypes = {
  children: PropTypes.element.isRequired,
  type: PropTypes.string,
  buttonTitle: PropTypes.string,
  modalTitle: PropTypes.string,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  icon: PropTypes.object,
  destroyOnClose: PropTypes.bool,
  ghost: PropTypes.bool,
  elemButton: PropTypes.element,
}

export default ModalForm
