import index from '.'
import { stubs } from '../tests'

describe('Test `index`!', () => {
  it('Should return \'Hello, World!\'!', () => {
    const result = index()
    expect(result).toBe(stubs.main())
  })
})
