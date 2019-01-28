import { observable, action } from "mobx"
import uuid from "uuid/v1"

class ModalStore {
  @observable
  modals = {}

  @action
  createNewModal = modal => {
    let uuidKey = uuid()
    modal.uuidKey = uuidKey
    modal.closeModal = () => {
      this.closeModal(uuidKey)
    }
    modal.okCallBack = modal.okCallBack || modal.closeModal
    this.modals = {
      ...this.modals,
      [uuidKey]: modal
    }

    return uuidKey
  }

  @action
  openAlertModal = ({ message, okCallBack }) => {
    let newAlert = {
      message,
      okCallBack
    }

    return this.createNewModal(newAlert)
  }

  @action
  closeModal = uuidKey => {
    let newModals = {
      ...this.modals
    }
    delete newModals[uuidKey]
    this.modals = newModals
  }
}

export default new ModalStore()
