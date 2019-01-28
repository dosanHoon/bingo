import React from "react"
import PropTypes from "prop-types"
import { ModalFooter, ModalBody, Modal, Button, ModalHeader } from "reactstrap"
import { inject, observer } from "mobx-react"

const AlertModal = ({ modals, uuidKey }) => {
  const { okCallBack, message, closeModal } = modals[uuidKey]
  let okClick = () => {
    okCallBack && okCallBack()
    closeModal()
  }

  return (
    <Modal isOpen={true} fade={false} toggle={closeModal}>
      <div className="modal-header bg-blue">
        <Button className="close" onClick={closeModal}>
          <i className="icons-office-52 c-white" />
        </Button>
        <ModalHeader>"알림"</ModalHeader>
      </div>
      <ModalBody className="modal-body p-b-0">{message}</ModalBody>
      <ModalFooter>
        <Button onClick={okClick}>확인</Button>
      </ModalFooter>
    </Modal>
  )
}

AlertModal.propTypes = {
  uuidKey: PropTypes.string.isRequired
}

export default inject(({ ModalStore }) => ({
  modals: ModalStore.modals
}))(observer(AlertModal))
