import main from '@tests/stubs/main'

import { stackTrace } from '.'

describe('Test all features:', () => {
  describe('Test `stackTrace` feature:', () => {
    it('Should return the default value (an array of `NodeJs.CallSite` objects!) when given an empty argument!', () => {
      const result = stackTrace()
      expect(result).toEqual(main())
    })

    it('Should only return the first default value when given an option with `limit` is set to `1`!', () => {
      const result = stackTrace(undefined, { limit: 1 })
      expect(result).toEqual(main().slice(0, 1))
    })

    describe('Test properties of the first default value from the `stackTrace` when given an empty argument:', () => {
      it('Should return a `string` (a type name) when invoke the `getTypeName` property!', () => {
        const result = stackTrace()
        expect(result[0].getTypeName()).toBe('Object')
      })

      it('Should return a `string` (a file name) when invoke the `getFileName` property!', () => {
        const result = stackTrace()
        expect(result[0].getFileName()).toBe(__filename)
      })

      it('Should return a `number` (a line number) when invoke the `getLineNumber` property!', () => {
        const result = stackTrace()
        expect(result[0].getLineNumber()).toBe(28)
      })

      it('Should return a `number` (a column number) when invoke the `getColumnNumber` property!', () => {
        const result = stackTrace()
        expect(result[0].getColumnNumber()).toBe(50)
      })

      it('Should return `null` when invoke the `getMethodName` property!', () => {
        const result = stackTrace()
        expect(result[0].getMethodName()).toBe(null)
      })

      it('Should return `null` when invoke the `getFunctionName` property!', () => {
        const result = stackTrace()
        expect(result[0].getFunctionName()).toBe(null)
      })

      it('Should return `undefined` when invoke the `getFunction` property!', () => {
        const result = stackTrace()
        expect(result[0].getFunction()).toBe(undefined)
      })

      it('Should return `undefined` when invoke the `getThis` property!', () => {
        const result = stackTrace()
        expect(result[0].getThis()).toBe(undefined)
      })

      it('Should return `undefined` when invoke the `getEvalOrigin` property!', () => {
        const result = stackTrace()
        expect(result[0].getEvalOrigin()).toBe(undefined)
      })

      it('Should return `false` when invoke the `isConstructor` property!', () => {
        const result = stackTrace()
        expect(result[0].isConstructor()).toBe(false)
      })

      it('Should return `false` when invoke the `isEval` property!', () => {
        const result = stackTrace()
        expect(result[0].isEval()).toBe(false)
      })

      it('Should return `false` when invoke the `isNative` property!', () => {
        const result = stackTrace()
        expect(result[0].isNative()).toBe(false)
      })

      it('Should return `false` when invoke the `isToplevel` property!', () => {
        const result = stackTrace()
        expect(result[0].isToplevel()).toBe(false)
      })
    })
  })
})
