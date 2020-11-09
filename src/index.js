import dotenv from 'dotenv'
dotenv.config()

const main = (inputString) => {
  const data = JSON.parse(JSON.stringify(inputString)).split('\n')
  const [nBushes, nRabbit, nStep] = data
    .shift()
    .split(' ')
    .map((_) => parseInt(_))

  // ウサギの現在のインデックス値
  const rabbitsIndexes = data.map((_) => parseInt(_) - 1)

  // 各ステップのループ
  ;[...Array(nStep).keys()].map(() => {
    // ウサギたちのジャンプ
    ;[...Array(nRabbit).keys()].map((j) => {
      // ウサギの現在のインデックス
      const currentIndex = rabbitsIndexes[j]

      // ジャンプ先の検証
      let nextIndex = currentIndex
      ;[...Array(nBushes).keys()]
        .map((_) => _ + 1)
        .some((i) => {
          let possibilityIndex = currentIndex + i // 次のインデックス（ジャンプ先）

          // 茂みの数を越えた場合は、はじめの茂みのインデックスに戻る
          if (possibilityIndex > nBushes - 1) {
            possibilityIndex = 0
          }

          // 次のインデックスがウサギたちがいるインデックスに含まれていなければ、ジャンプ成功!!
          if (rabbitsIndexes.indexOf(possibilityIndex) === -1) {
            nextIndex = possibilityIndex
            return true
          }
        })

      // ジャンプ
      rabbitsIndexes[j] = nextIndex
    })
  })

  const result = rabbitsIndexes.map((i) => i + 1)
  console.log(result)

  return result
}

export default main
