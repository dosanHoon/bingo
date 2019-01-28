import { observable, action } from "mobx"
import PlayerModel from "../model/PlayerModel"
import utils from "../utils/utils"
import ModalStore from "./ModalStore"

class BingoStore {
  @observable
  gameState = true

  @observable
  currentPlayer = 1

  @observable
  bingoPlayers = [{ ...new PlayerModel({ name: "1P" }) }, { ...new PlayerModel({ name: "2P" }) }]

  @observable
  bingoSelectedValue = []

  @action
  gameSetup = () => {
    this.gameState = false
    this.currentPlayer = 1
    this.bingoPlayers = [
      { ...new PlayerModel({ name: "1P" }) },
      { ...new PlayerModel({ name: "2P" }) }
    ]
    this.bingoSelectedValue = []
    this.bingoPlayers.forEach((_, index) => {
      this.bingoPlayers[index].cellData = utils.makeShuffleBingo()
    })
  }

  @action
  togglePlayer = () => {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1
  }

  @action
  checkCompleted = completedPlayer => {
    if (completedPlayer.length >= 2) {
      ModalStore.openAlertModal({ message: "무승부입니다.", okCallBack: this.gameInit })
    } else {
      ModalStore.openAlertModal({
        message: `${completedPlayer[0]}가 빙고를 완성했습니다.`,
        okCallBack: this.gameInit
      })
    }
  }

  @action
  checkIsBingo = array => {
    return array.filter(cell => this.bingoSelectedValue.indexOf(cell) !== -1).length >= 5
  }

  @action
  setCompletedArray = (array, count, playerIndex, completedKey) => {
    if (this.checkIsBingo(array)) {
      this.bingoPlayers[playerIndex].completedRow[completedKey] = array
      return ++count
    } else {
      return count
    }
  }

  @action
  countBingo = () => {
    let isCompleted = false
    let completedPlayer = []
    this.bingoPlayers.forEach(({ cellData, completedRow, name }, playerIndex) => {
      let count = 0
      let leftCrossRow = []
      let rightCrossRow = []

      cellData.forEach((row, rowIndex) => {
        count = this.setCompletedArray(row, count, playerIndex, `row${rowIndex}`)

        let newRow = []
        for (let i = 0; i < cellData.length; i++) {
          newRow.push(cellData[i][rowIndex])
        }

        count = this.setCompletedArray(newRow, count, playerIndex, `col${rowIndex}`)

        leftCrossRow.push(cellData[rowIndex][rowIndex])
        rightCrossRow.push(cellData[cellData.length - rowIndex - 1][rowIndex])
      })

      count = this.setCompletedArray(leftCrossRow, count, playerIndex, "leftCrossRow")
      count = this.setCompletedArray(rightCrossRow, count, playerIndex, "rightCrossRow")

      this.bingoPlayers[playerIndex].bingoCount = count

      if (count >= 5) {
        isCompleted = true
        completedPlayer.push(name)
      }
    })

    isCompleted && this.checkCompleted(completedPlayer)
  }

  @action
  selectCell = (num, player) => {
    let isPlayer = player === this.currentPlayer
    if (this.gameState) {
      ModalStore.openAlertModal({
        message: "게임을 시작해주세요."
      })
    } else if (isPlayer && this.bingoSelectedValue.indexOf(num) !== -1) {
      ModalStore.openAlertModal({
        message: "이미 선택된 번호 입니다."
      })
    } else if (isPlayer) {
      this.togglePlayer()
      this.bingoSelectedValue.push(num)
      this.countBingo()
    } else {
      ModalStore.openAlertModal({
        message: "잘못된 차레입니다"
      })
    }
  }

  @action
  gameInit = () => {
    this.gameState = true
    this.currentPlayer = 1
    this.bingoSelectedValue = []
    this.bingoPlayers = [
      { ...new PlayerModel({ name: "Player1" }) },
      { ...new PlayerModel({ name: "Player2" }) }
    ]
  }
}

export default new BingoStore()
