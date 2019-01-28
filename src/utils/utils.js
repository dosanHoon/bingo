export default {
  makeInitBingo: () => {
    let bingo = []
    for (let i = 0; i < 5; i++) {
      let bingoCell = []
      for (let i = 0; i < 5; i++) {
        bingoCell.push("")
      }
      bingo.push(bingoCell)
    }
    return bingo
  },
  makeShuffleBingo: () => {
    let bingo = new Array(25)
    for (let i = 0; i < bingo.length; i++) bingo[i] = i + 1

    bingo.sort(() => 0.5 - Math.random())

    let shuffleBingo = []
    let row = []

    bingo.forEach((cell, index) => {
      row.push(cell)
      if ((index + 1) % 5 === 0) {
        shuffleBingo.push(row)
        row = []
      }
    })

    return shuffleBingo
  }
}
