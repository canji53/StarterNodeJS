import { default as main } from '../src/index'

describe('Jest ESModule Mock', () => {
  test('case1', () => {
    const inputString = `10 10 18
3 4 G 1 8 2 6 2 10 2 7 G 10 10 10 9 1 3`
    expect(main(inputString)).toEqual(145)
  })

  test('case1', () => {
    const inputString = `15 5 24
5 5 5 4 G 1 G 5 3 2 1 4 4 G G 1 5 5 5 2 1 5 3 1`
    expect(main(inputString)).toEqual(124)
  })
})
