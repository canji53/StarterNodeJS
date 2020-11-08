import { default as main, permutation } from '../src/index'

describe('Jest ESModule Mock', () => {
  test('case1', () => {
    const inputString = `10 3
work
off
off
work
work
work
off
work
work
off`
    expect(main(inputString)).toEqual(6)
  })

  test('case2', () => {
    const inputString = `8 3
work
off
off
work
off
work
off
work`
    expect(main(inputString)).toEqual(7)
  })

  test('permutation', () => {
    const result = permutation([], [], [0, 1, 2, 3, 4, 5], 3)
    expect(result.length).toEqual(120)
  })
})
