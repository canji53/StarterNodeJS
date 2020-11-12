import { default as findVowels } from '../src/index'

describe('Jest ESModule Mock', () => {
  test('case1', () => {
    const inputString = 'hello'
    expect(findVowels(inputString)).toEqual(2)
  })

  test('case2', () => {
    const inputString = 'why'
    expect(findVowels(inputString)).toEqual(0)
  })

  test('case3', () => {
    const inputString = 'HELLO'
    expect(findVowels(inputString)).toEqual(2)
  })

  test('case4', () => {
    const inputString = 'WHY'
    expect(findVowels(inputString)).toEqual(0)
  })

  test('case5', () => {
    const inputString = 'aiueo'
    expect(findVowels(inputString)).toEqual(5)
  })

  test('case6', () => {
    const inputString = 'AIUEO'
    expect(findVowels(inputString)).toEqual(5)
  })

  test('case7', () => {
    const inputString = 'abcdefghijklmnopqrstuvwxyz'
    expect(findVowels(inputString)).toEqual(5)
  })

  test('case8', () => {
    const inputString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    expect(findVowels(inputString)).toEqual(5)
  })
})
