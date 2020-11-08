import { default as main } from '../src/index'

describe('Jest ESModule Mock', () => {
  test('case1', () => {
    const inputString = '4 4\n..#.\n..#.\n###.\n..#.'
    expect(main(inputString)).toEqual(14)
  })

  test('case2', () => {
    const inputString = '4 4\n.##.\n.##.\n.##.\n.##.'
    expect(main(inputString)).toEqual(12)
  })

  test('case3', () => {
    const inputString = '3 5\n...#.\n##..#\n.##..'
    expect(main(inputString)).toEqual(18)
  })
})
