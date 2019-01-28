import React, { Component } from "react"
import PropTypes from "prop-types"
import { observer, inject, PropTypes as MobxPropTypes } from "mobx-react"
import { Row, Col, Button, Container } from "reactstrap"
import Player from "../system/Player"

@inject(({ BingoStore }) => ({
  bingoPlayers: BingoStore.bingoPlayers,
  gameSetup: BingoStore.gameSetup,
  currentPlayer: BingoStore.currentPlayer,
  gameState: BingoStore.gameState
}))
@observer
class BingoContainer extends Component {
  _renderPlayers = () => {
    return this.props.bingoPlayers.map((props, index) => (
      <Player {...props} index={index} key={props.name} />
    ))
  }

  render() {
    const { currentPlayer, gameState, gameSetup } = this.props

    return (
      <Container>
        <Row>
          <p>{`순서 : ${currentPlayer}번 플레이어`}</p>
        </Row>
        <Row>{this._renderPlayers()}</Row>
        <Row>
          <Col>
            <Button onClick={gameSetup}>{gameState ? "게임 시작" : "게임 재시작"}</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

BingoContainer.propTypes = {
  bingoPlayers: MobxPropTypes.observableArray,
  gameSetup: PropTypes.func,
  currentPlayer: PropTypes.number,
  gameState: PropTypes.number
}

export default BingoContainer
