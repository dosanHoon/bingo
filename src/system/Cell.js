import React from "react"
import { observer, inject } from "mobx-react"

const Cell = ({ cellNumber, selectCell, bingoSelectedValue, player }) => {
  let handleClick = () => {
    selectCell(cellNumber, player)
  }

  let checkNumber = bingoSelectedValue.indexOf(cellNumber) !== -1

  return (
    <td onClick={handleClick} style={checkNumber ? { background: "grey" } : null}>
      {cellNumber}
    </td>
  )
}

export default inject(({ BingoStore }) => ({
  selectCell: BingoStore.selectCell,
  bingoSelectedValue: BingoStore.bingoSelectedValue,
  gameState: BingoStore.gameState
}))(observer(Cell))
