import dotenv from 'dotenv'
dotenv.config()

const main = (inputString) => {
  const inputArray = inputString.split('\n')
  const [nFrame, nPin, nThrow] = inputArray
    .shift()
    .split(' ')
    .map((_) => parseInt(_))
  const rawScoreLog = inputArray
    .shift()
    .split(' ')
    .map((_) => (_ === 'G' ? 'G' : parseInt(_)))

  // 得点ログをスコア表に整形
  const scoreTable = reshapeScoreTable(rawScoreLog, nFrame, nPin)

  // 総得点を計算
  const totalScores = [...Array(nFrame)].fill(0)
  const chains = [] // 得点の連鎖

  scoreTable.map((scores, index) => {
    // フレームの得点合計
    const score = scores.reduce((a, b) => a + b)

    // 最終フレームの場合
    if (index + 1 === nFrame) {
      const finalFrameScore = scores.slice(0, 2).reduce((a, b) => a + b)
      // 通常の場合
      if (finalFrameScore < nPin) {
        totalScores[index] += finalFrameScore
      }
      // スペアの場合
      if (finalFrameScore == nPin) {
        const additionalScore = scores[2]
        totalScores[index] += finalFrameScore + additionalScore * 2
      }
      // 一投目がストライクの場合
      if (scores[0] === nPin) {
        const additionalScore = scores[2]
        totalScores[index] += scores[0] + scores[1] * 2 + additionalScore * 2
      }
      // 一投目と二投目がストライクの場合
      if (scores[0] === nPin && scores[1] === nPin) {
        const additionalScore = scores[2]
        totalScores[index] += scores[0] + scores[1] * 2 + additionalScore * 3
      }
    }

    // まずはじめに連鎖得点処理
    if (chains.length > 0) {
      const removeIndex = []

      // 連鎖得点反応
      chains.map((chain, i) => {
        const chainIndex = chain[0]
        const strikeOrSpare = chain[1]

        // スペアの場合
        if (strikeOrSpare === 'spare') {
          totalScores[chainIndex] += scores[0] // 当フレームの一投目のスコアを加算
          removeIndex.push(i) // スペアの場合は連鎖は一回で終わるため
        }

        // ストライクの場合
        if (strikeOrSpare === 'strike') {
          if (index - chainIndex === 1) {
            // 一回目の連鎖得点は当フレームの合計を加算
            // 当フレームの二投目のスコアがない場合もある（一投目がストライクの場合など）
            totalScores[chainIndex] +=
              scores[0] + (scores[1] === undefined ? 0 : scores[1])
          }
          // 二回目の連鎖得点
          if (index - chainIndex === 2) {
            totalScores[chainIndex] += scores[0] // 二回目の連鎖得点は当フレームの一投目のスコアを加算
            removeIndex.push(i) // ストライクでも連鎖回数は二回まで
          }
        }
      })

      // 連鎖得点反応が終わったインデックスを削除
      if (removeIndex.length > 0) {
        removeIndex.map((targetIndex, i) =>
          i === 0
            ? chains.splice(targetIndex, 1)
            : chains.splice(targetIndex - 1, 1)
        )
      }
    }

    // ストライクの場合
    if (score === nPin && scores.length === 1) {
      totalScores[index] += score
      chains.push([index, 'strike'])
    }

    // スペアの場合
    if (score === nPin && scores.length === 2) {
      totalScores[index] += score
      chains.push([index, 'spare'])
    }

    // 通常の場合
    if (score < nPin && scores.length === 2) {
      totalScores[index] += score
      chains.splice(0) // 連鎖得点を初期化
    }
    console.log(totalScores)
  })

  console.log(scoreTable)
  console.log(totalScores)
  console.log(totalScores.reduce((a, b) => a + b))

  return 145
}

/**
 * 生の得点ログを読み取れるスコア表に整形
 * @param {Array} rawScoreLog 得点ログ
 * @param {Number} nFrame フレーム数
 * @param {Number} nPin ピン数
 */
const reshapeScoreTable = (rawScoreLog, nFrame, nPin) => {
  const scoreTable = []
  const frameScores = []

  // 実際のスコア表に変換
  rawScoreLog.map((score, i) => {
    // スコアがガーターの場合 0 に変更
    score = score === 'G' ? 0 : score

    frameScores.push(score)

    // 最終フレームの場合
    if (scoreTable.length + 1 === nFrame) {
      if (rawScoreLog.length - 1 === i) {
        scoreTable.push(JSON.parse(JSON.stringify(frameScores)))
        frameScores.splice(0)
        return
      }
      return
    }

    // 1投目がストライクの場合
    if (frameScores[0] === nPin) {
      scoreTable.push(JSON.parse(JSON.stringify(frameScores)))
      frameScores.splice(0)
      return
    }

    // ２投追加されたら
    if (frameScores.length === 2) {
      scoreTable.push(JSON.parse(JSON.stringify(frameScores))) // deepコピーを追加！！後方処理で値要素が全て消えるため
      frameScores.splice(0) // 一時的なスコア配列を削除
      return
    }
  })

  return scoreTable
}

export default main
