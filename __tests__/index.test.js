import { default as main } from '../src/index'

describe('Jest ESModule Mock', () => {
  test('case1', () => {
    const inputString = `5 3 2
1 1
3 -1
-4 1
1 2 3
1 6 5`
    expect(main(inputString)).toEqual('2 18')
  })

  test('case2', () => {
    const inputString = `6 3 3
-1 99
10 -1
10 -2
10 -3
1 4 4
1 1 1
1 1 1`
    expect(main(inputString)).toEqual('1 297')
  })
})
