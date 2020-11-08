import dotenv from 'dotenv'
dotenv.config()

const main = (inputString) => {
  const data = JSON.parse(JSON.stringify(inputString)).split('\n')
  const [height, width] = data
    .shift()
    .split(' ')
    .map((_) => parseInt(_))

  // 0パディング処理
  const lopeMaps = [...Array(height + 2).keys()].map((y) => {
    return [...Array(width + 2).keys()].map((x) => {
      return 1 <= x && x <= width && 1 <= y && y <= height
        ? data[y - 1].split('')[x - 1]
        : '.'
    })
  })

  const nLopeMaps = lopeMaps.map((col, y) => {
    return col.map((val, x) => {
      // パディング領域は無視するため、インデックスを対象に 0<=y<=height+1、0<=x<=width+1 を無視
      if (y <= 0 && y <= height + 1) {
        return 0
      }
      if (x <= 0 && x <= width + 1) {
        return 0
      }
      // '.'は計算してもしょうがないため無視
      if (val === '.') {
        return 0
      }

      // 上記を掻い潜るのは'#'、つまり花が植えられている場所になる
      // 上下左右を検索
      const nSurroundFlower = [
        lopeMaps[y - 1][x],
        lopeMaps[y][x + 1],
        lopeMaps[y + 1][x],
        lopeMaps[y][x - 1],
      ].filter((val) => val === '#').length // 四方に存在する花の数
      const nLope = 4 // 四方を囲む最大のロープ数

      return nLope - nSurroundFlower
    })
  })

  const nLope = nLopeMaps.reduce((colA, colB, i) =>
    i === 1
      ? colA.reduce((a, b) => a + b) + colB.reduce((a, b) => a + b)
      : colA + colB.reduce((a, b) => a + b)
  )

  return nLope
}

export default main
