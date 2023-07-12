import main from './main'
import { stubs } from '../tests'

describe('Test `main`!', () => {
  it('Should return \'Hello, World!\'!', () => {
    const result = main()
    expect(result).toBe(stubs.main())
  })
})
