import utils from "../utils/utils"

export default class PlayerModel {
  constructor({ name }) {
    this.name = name
  }
  name = ""
  cellData = utils.makeInitBingo()
  completedRow = {}
  bingoCount = 0
}
