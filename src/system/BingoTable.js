import React, { Component } from "react"
import PropTypes from "prop-types"
import { Table } from "reactstrap"
import Cell from "../system/Cell"

class BingoTable extends Component {
  _renderCell = (cells, trindex) => {
    const { player } = this.props
    return cells.map((cell, index) => (
      <Cell cellNumber={cell} player={player} key={`${player}cell${trindex}${index}`} />
    ))
  }
  _renderCells = () => {
    const { player, cellData } = this.props
    return cellData.map((cells, index) => (
      <tr key={`${player}cells${index}`}>{this._renderCell(cells, index)}</tr>
    ))
  }
  render() {
    return (
      <div className="cell-container">
        <Table bordered>
          <tbody>{this._renderCells()}</tbody>
        </Table>
      </div>
    )
  }
}

BingoTable.propTypes = {
  player: PropTypes.number
}

export default BingoTable
