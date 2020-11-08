import { default as main } from '../src/index'

describe('Jest ESModule Mock', () => {
  test('...', () => {
    expect(main()).toEqual('Hello Jest!!')
  })
})
