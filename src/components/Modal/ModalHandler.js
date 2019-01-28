import React from "react"
import PropTypes from "prop-types"
import { inject, observer } from "mobx-react"
import AlertModal from "./AlertModal"

const ModalContainer = ({ modals }) => {
  let _modals = []
  for (const uuidKey in modals) {
    if (modals.hasOwnProperty(uuidKey)) {
      _modals.push(<AlertModal uuidKey={uuidKey} key={uuidKey} {...modals[uuidKey]} />)
    }
  }
  return _modals
}

ModalContainer.propTypes = {
  modals: PropTypes.object
}

export default inject(({ ModalStore }) => ({ modals: ModalStore.modals }))(observer(ModalContainer))
