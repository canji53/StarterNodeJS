import { default as hello } from '../src/index'

describe('Jest ESModule Mock', () => {
  test('...', () => {
    expect(hello()).toEqual('Hello Jest!!')
  })
})
