import dotenv from 'dotenv'
dotenv.config()

const main = (inputString) => {
  const data = JSON.parse(JSON.stringify(inputString)).split('\n')
  const [_, nPaidVacation] = data
    .shift()
    .split(' ')
    .map((_) => parseInt(_))

  const schedules = data // スケジュール

  // 仕事日を休日に変えるパターンをインデックスの配列で取得
  const workdayIndexes = schedules
    .map((schedule, i) => (schedule === 'work' ? i : false))
    .filter((number) => Number.isInteger(number))
  const patterns = permutation([], [], workdayIndexes, nPaidVacation)

  // 休日パターンをスケジュールに反映
  const holidayScheduleMap = patterns.map((pattern) => {
    const copySchedules = JSON.parse(JSON.stringify(schedules))
    pattern.map((i) => (copySchedules[i] = 'off'))
    return copySchedules
  })

  // 休日連鎖を各パターンで検査
  const nConsecutiveHolidayMap = holidayScheduleMap.map((schedules) => {
    const consecutiveHolidays = []
    let countConsecutive = 0
    schedules.map((schedule, i) => {
      // 初日が off の場合
      if (i === 0 && schedule === 'off') {
        countConsecutive += 1
        return
      }
      // work の場合、off をストップして配列に追加
      if (schedule === 'work') {
        consecutiveHolidays.push(countConsecutive)
        countConsecutive = 0
        return
      }
      // 最終日が off の場合、off を加算して必ず配列に追加
      if (i === schedules.length - 1 && schedule === 'off') {
        countConsecutive += 1
        consecutiveHolidays.push(countConsecutive)
        countConsecutive = 0
      }
      // 連休の場合は、連続カウンターを加算
      countConsecutive += 1
    })
    return Math.max(...consecutiveHolidays)
  })

  const nMaxConsecutiveHoliday = Math.max(...nConsecutiveHolidayMap)

  return nMaxConsecutiveHoliday
}

export const permutation = (perm, pre, post, n) => {
  // 再帰で順列計算
  if (n > 0) {
    ;[...Array(post.length).keys()].map((i) => {
      const rest = JSON.parse(JSON.stringify(post)) // 配列の複製
      const elem = rest.splice(i, 1)
      permutation(perm, pre.concat(elem), rest, n - 1)
    })
  } else {
    perm.push(pre)
  }
  return perm
}

export default main
