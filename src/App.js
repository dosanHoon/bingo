import React, { Component } from "react"
import { Provider } from "mobx-react"
import "./App.css"
import BingoContainer from "./container/BingoContainer"
import BingoStore from "./store/BingoStore"
import ModalStore from "./store/ModalStore"
import ModalHandler from "./components/Modal/ModalHandler"

class App extends Component {
  render() {
    return (
      <Provider BingoStore={BingoStore} ModalStore={ModalStore}>
        <div className="App">
          <BingoContainer />
          <ModalHandler />
        </div>
      </Provider>
    )
  }
}

export default App
