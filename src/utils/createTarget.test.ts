import createTarget from './createTarget'

describe('Test `createTarget` util:', () => {
  it('Should return the default value of the `target` object!', () => {
    const result = createTarget()
    expect(result).toEqual({ stack: [] })
  })

  it('Should has a `stack` property in the default value of the `target` object!', () => {
    const result = createTarget()
    expect(result).toHaveProperty('stack')
  })

  it('Should have an empty array as the value of the `stack` property in the default value of the `target` object!', () => {
    const result = createTarget()
    expect(result.stack).toEqual([])
  })
})
