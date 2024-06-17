import mainStub from '@tests/stubs/main'

import main from './main'

describe('Test the `main` feature:', () => {
  it('Should return the default value (an array of `NodeJs.CallSite` objects!) when given an empty argument!', () => {
    const result = main()
    expect(result).toEqual(mainStub())
  })

  it('Should only return the first default value when given an option with `limit` is set to `1`!', () => {
    const result = main(undefined, { limit: 1 })
    expect(result).toEqual(mainStub().slice(0, 1))
  })

  describe('Test properties of the first default value from the `main` feature when given an empty argument:', () => {
    it('Should return a `string` (a type name) when invoke the `getTypeName` property!', () => {
      const result = main()
      expect(result[0].getTypeName()).toBe('Object')
    })

    it('Should return a `string` (a file name) when invoke the `getFileName` property!', () => {
      const result = main()
      expect(result[0].getFileName()).toBe(__filename)
    })

    it('Should return a `number` (a line number) when invoke the `getLineNumber` property!', () => {
      const result = main()
      expect(result[0].getLineNumber()).toBe(27)
    })

    it('Should return a `number` (a column number) when invoke the `getColumnNumber` property!', () => {
      const result = main()
      expect(result[0].getColumnNumber()).toBe(47)
    })

    it('Should return `null` when invoke the `getMethodName` property!', () => {
      const result = main()
      expect(result[0].getMethodName()).toBe(null)
    })

    it('Should return `null` when invoke the `getFunctionName` property!', () => {
      const result = main()
      expect(result[0].getFunctionName()).toBe(null)
    })

    it('Should return `undefined` when invoke the `getFunction` property!', () => {
      const result = main()
      expect(result[0].getFunction()).toBe(undefined)
    })

    it('Should return `undefined` when invoke the `getThis` property!', () => {
      const result = main()
      expect(result[0].getThis()).toBe(undefined)
    })

    it('Should return `undefined` when invoke the `getEvalOrigin` property!', () => {
      const result = main()
      expect(result[0].getEvalOrigin()).toBe(undefined)
    })

    it('Should return `false` when invoke the `isConstructor` property!', () => {
      const result = main()
      expect(result[0].isConstructor()).toBe(false)
    })

    it('Should return `false` when invoke the `isEval` property!', () => {
      const result = main()
      expect(result[0].isEval()).toBe(false)
    })

    it('Should return `false` when invoke the `isNative` property!', () => {
      const result = main()
      expect(result[0].isNative()).toBe(false)
    })

    it('Should return `false` when invoke the `isToplevel` property!', () => {
      const result = main()
      expect(result[0].isToplevel()).toBe(false)
    })
  })
})
