import dotenv from 'dotenv'
dotenv.config()

const main = (inputString) => {
  const data = JSON.parse(JSON.stringify(inputString)).split('\n')
  const [normalPay, nightPay, midnightPay] = data
    .shift()
    .split(' ')
    .map((_) => parseInt(_))
  const nWorkDay = data
    .shift()
    .split('')
    .map((_) => parseInt(_))[0]
  const workLogs = data

  // 9 <-> 17, 17 <-> 22

  // workLogs.map((workLog) => {
  //   const [startTime, endTime] = workLog.split(' ').map((_) => parseInt(_))
  //   console.log(startTime, endTime)
  // })

  return 29500
}

export const getShiftTimes = (startTime, endTime) => {
  let [normalTime, nightTime, midnightTime] = [0, 0, 0]

  // 始業時間が 9 <= x < 17 の場合
  if (9 <= startTime && startTime < 17) {
    // 通常勤務で退勤
    if (9 <= endTime && endTime < 17 && startTime <= endTime) {
      normalTime += endTime - startTime
      return [normalTime, nightTime, midnightTime]
    }
    // 夜勤務で退勤
    if (17 <= endTime && endTime < 22) {
      normalTime += 17 - startTime
      nightTime += endTime - 17
      return [normalTime, nightTime, midnightTime]
    }
    // 深夜勤務で退勤
    if (22 <= endTime && endTime < 24) {
      normalTime += 17 - startTime
      nightTime += 22 - 17
      midnightTime += endTime - 22
      return [normalTime, nightTime, midnightTime]
    }
    if (0 <= endTime && endTime < 9) {
      normalTime += 17 - startTime
      nightTime += 22 - 17
      midnightTime += 24 - 22
      midnightTime += endTime - 0
      return [normalTime, nightTime, midnightTime]
    }
    // 通常勤務で退勤 （ブラック勤務）
    if (9 <= endTime && endTime < 17 && startTime > endTime) {
      normalTime += 17 - startTime
      nightTime += 22 - 17
      midnightTime += 24 - 22
      midnightTime += 9 - 0
      normalTime += endTime - 9
      return [normalTime, nightTime, midnightTime]
    }
  }

  // 始業時間が 17 <= x < 22 の場合
  if (17 <= startTime && startTime < 22) {
    // 夜勤で退勤
    if (17 <= endTime && endTime < 22 && startTime <= endTime) {
      nightTime += endTime - startTime
      return [normalTime, nightTime, midnightTime]
    }
    // 深夜勤務で退勤
    if (22 <= endTime && endTime < 24) {
      nightTime += 22 - startTime
      midnightTime += endTime - 22
      return [normalTime, nightTime, midnightTime]
    }
    if (0 <= endTime && endTime < 9) {
      nightTime += 22 - startTime
      midnightTime += 24 - 22
      midnightTime += endTime - 0
      return [normalTime, nightTime, midnightTime]
    }
    // 通常勤務で退勤
    if (9 <= endTime && endTime < 17) {
      nightTime += 22 - startTime
      midnightTime += 24 - 22
      midnightTime += 9 - 0
      normalTime += endTime - 9
      return [normalTime, nightTime, midnightTime]
    }
    // 通常勤務で退勤 （ブラック勤務）
    if (17 <= endTime && endTime < 22 && startTime > endTime) {
      nightTime += 22 - startTime
      midnightTime += 24 - 22
      midnightTime += 9 - 0
      normalTime += 17 - 9
      nightTime += endTime - 17
      return [normalTime, nightTime, midnightTime]
    }
  }

  // 始業時間が 22 <= x < 24
  if (22 <= startTime && startTime < 24) {
    // 深夜勤務で退勤
    if (22 <= endTime && endTime < 24 && startTime <= endTime) {
      midnightTime += endTime - startTime
      return [normalTime, nightTime, midnightTime]
    }
    if (0 <= endTime && endTime < 9) {
      midnightTime += 24 - startTime
      midnightTime += endTime - 0
      return [normalTime, nightTime, midnightTime]
    }
    // 通常勤務で退勤
    if (9 <= endTime && endTime < 17) {
      midnightTime += 24 - startTime
      midnightTime += 9 - 0
      normalTime += endTime - 9
      return [normalTime, nightTime, midnightTime]
    }
    // 夜勤務で退勤
    if (17 <= endTime && endTime < 22) {
      midnightTime += 24 - startTime
      midnightTime += 9 - 0
      normalTime += 17 - 9
      nightTime += endTime - 17
      return [normalTime, nightTime, midnightTime]
    }
    // 深夜勤務で退勤（ブラック勤務）
    if (22 <= endTime && endTime < 24 && startTime > endTime) {
      midnightTime += 24 - startTime
      midnightTime += 9 - 0
      normalTime += 17 - 9
      nightTime += 22 - 17
      midnightTime += endTime - 22
      return [normalTime, nightTime, midnightTime]
    }
  }

  // 始業時間が 0 <= x < 9
  if (0 <= startTime && startTime < 9) {
    // 深夜勤務で退勤
    if (0 <= endTime && endTime < 9) {
      midnightTime += endTime - startTime
      return [normalTime, nightTime, midnightTime]
    }
    // 通常勤務で退勤
    if (9 <= endTime && endTime < 17) {
      midnightTime += 9 - startTime
      normalTime += endTime - 9
      return [normalTime, nightTime, midnightTime]
    }
    // 深夜勤務で退勤
    if (17 <= endTime && endTime < 22) {
      midnightTime += 9 - startTime
      normalTime += 17 - 9
      nightTime += endTime - 17
      return [normalTime, nightTime, midnightTime]
    }
    // 深夜勤務で退勤
    if (22 <= endTime && endTime < 24) {
      midnightTime += 9 - startTime
      normalTime += 17 - 9
      nightTime += 22 - 17
      midnightTime += endTime - 22
      return [normalTime, nightTime, midnightTime]
    }
  }

  //
  return [normalTime, nightTime, midnightTime]
}

export default main
