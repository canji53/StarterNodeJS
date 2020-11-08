import { default as main, getShiftTimes } from '../src/index'

describe('Jest ESModule Mock', () => {
  test('case1', () => {
    const inputString = `1000 1300 1500
4
0 9
9 17
17 22
22 23`
    expect(main(inputString)).toEqual(29500)
  })

  test('case2', () => {
    const inputString = `1300 1500 1700
7
8 19
9 20
10 21
11 22
0 23
20 22
0 21`
    expect(main(inputString)).toEqual(130000)
  })

  test('getShiftTimes', () => {
    expect(getShiftTimes(9, 16)).toEqual([7, 0, 0])
  })
})
