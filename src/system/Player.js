import React from "react"
import { PropTypes as MobxPropTypes } from "mobx-react"
import PropTypes from "prop-types"
import { Col } from "reactstrap"
import BingoTable from "./BingoTable"

const Player = ({ name, cellData, completedRow, bingoCount, index }) => {
  let _renderCompletedRow = () => {
    return Object.keys(completedRow).map(key => (
      <p style={{ padding: "10px", borderBottom: "1px solid black" }} key={key}>
        {completedRow[key].map((element, index) => (
          <span style={{ padding: "5px" }} key={index}>{`"${element}"`}</span>
        ))}
      </p>
    ))
  }
  return (
    <Col md="6" key={name}>
      <p>{name}</p>
      <p>{`빙고:${bingoCount}`}</p>
      <BingoTable cellData={cellData} player={index + 1} />
      <p>완성된 줄</p>
      {_renderCompletedRow()}
    </Col>
  )
}

Player.propTypes = {
  name: PropTypes.string,
  cellData: MobxPropTypes.arrayOrObservableArray,
  completedRow: PropTypes.object,
  bingoCount: PropTypes.number,
  index: PropTypes.number
}

export default Player
