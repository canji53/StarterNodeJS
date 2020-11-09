import { default as main } from '../src/index'

describe('Jest ESModule Mock', () => {
  test('case1', () => {
    const inputString = `5 2 2
1
2`
    expect(main(inputString)).toEqual([5, 1])
  })

  test('case2', () => {
    const inputString = `6 3 6
1
3
5`
    expect(main(inputString)).toEqual([1, 3, 5])
  })
})
