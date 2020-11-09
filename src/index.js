import dotenv from 'dotenv'
dotenv.config()

const main = (inputString) => {
  const data = JSON.parse(JSON.stringify(inputString)).split('\n')

  // マス目の数、プレイヤー数、試行回数
  const [nSquare, nPlayer, nTrial] = data
    .shift()
    .split(' ')
    .map((_) => parseInt(_))

  // マス目の効果（ただし、効果があるのは終始を除いたマスなため、nSquare - 2が効果のあるマス）
  const effectSquares = data
    .splice(0, nSquare - 2)
    .map((effectString) => effectString.split(' ').map((_) => parseInt(_)))
  // 始端と終端の無効化のマスを追加（のちの処理に影響が出るため）
  effectSquares.unshift([0, 0])
  effectSquares.push([0, 0])

  // 状態
  const playerInfo = [...Array(nPlayer)].map((_) => [0, 0, 0]) // 各プレイヤーの進捗状況 [[現在のマス目, コイン数, ランキング], ... ]
  let rank = 1 // 現在のランキング
  let nCoinsByRank = rank > 3 ? 1 : 3 - (rank - 1) // 現在のランキングに応じた報酬コインの倍増値 （順位が４より大きくなる場合は一律倍率は1にする、つまり報酬はなし）

  // 処理
  data.map((trialString) => {
    //
    trialString
      .split(' ')
      .map((_) => parseInt(_))
      .map((diceRoll, playerIndex) => {
        // -------------
        // 既にランキング（ゴール）しているプレイヤーは無視
        // -------------
        if (playerInfo[playerIndex][2] > 0) {
          return
        }

        // ---------
        // 現在ゴールにいる場合、サイコロを振ってボーナスを取得して終了
        // ---------
        if (playerInfo[playerIndex][0] === nSquare - 1) {
          playerInfo[playerIndex][1] += nCoinsByRank * diceRoll // コインを獲得
          playerInfo[playerIndex][2] = rank // ランキング決定
          rank += 1 // 次のランキングに落とす
          return
        }

        // ---------
        // サイコロを振ってまず移動する場合
        // ここでは一旦ゴールしているかどうかは無視する、どうせマス効果で移動する可能性があるため
        // ---------
        // 次のマス目 = 現在のマス目 + サイコロの目
        let nextSqure = playerInfo[playerIndex][0] + diceRoll
        nextSqure = isSquare(nextSqure, nSquare - 1) // マス目は 0 を下回ること、上限マス数を超えることはない

        // 移動後のマス目の効果
        const [effectMove, effecCoin] = effectSquares[nextSqure]

        // ----------
        // コインの変動
        // ----------
        playerInfo[playerIndex][1] += effecCoin
        playerInfo[playerIndex][1] =
          playerInfo[playerIndex][1] < 0 ? 0 : playerInfo[playerIndex][1] // コインは０以下にならないため

        // ----------
        // マス目の変動
        // ----------
        nextSqure += effectMove // マスの効果で更にマス目を移動
        nextSqure = isSquare(nextSqure, nSquare - 1)
        playerInfo[playerIndex][0] = nextSqure // 現在のマス目を格納
      })
  })

  // 優勝プレイヤーの検索
  const playerCoins = playerInfo.map((player) => player[1])
  const nMaxCoin = Math.max(...playerCoins)
  const winPlayer = playerCoins.indexOf(nMaxCoin) + 1

  return `${winPlayer} ${nMaxCoin}`
}

// マス目が 0 を下回る、もしくは 上限マス数を超えることはない
const isSquare = (squre, nMaxSqure) => {
  const dstSqure = squre < 0 ? 0 : squre // 0 を下回らない
  return dstSqure > nMaxSqure ? nMaxSqure : dstSqure // 上限を越えない
}

export default main
