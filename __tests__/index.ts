import { testMethods } from '@tests/utils'

import { stackTrace } from '..'

describe('Test all APIs:', () => {
  describe('Test `stackTrace` API:', () => {
    it('Should capture the current stack trace when the callee is `undefined`!', () => {
      const caller = (): NodeJS.CallSite[] => stackTrace()
      const received = caller()
      expect(received).toMatchSnapshot()
      received.forEach(testMethods)
    })

    it('Should capture the current stack trace when the callee is `null`!', () => {
      const caller = (): NodeJS.CallSite[] => stackTrace(null)
      const received = caller()
      expect(received).toMatchSnapshot()
      received.forEach(testMethods)
    })

    it('Should capture the stack trace of the caller when the callee is a specific function!', () => {
      const callee = (): NodeJS.CallSite[] => stackTrace(callee)
      const caller = (): NodeJS.CallSite[] => callee()
      const received = caller()
      expect(received).toMatchSnapshot()
      received.forEach(testMethods)
    })

    it('Should only capture the first stack trace frame when the `limit` option is set to `1`!', () => {
      const caller = (): NodeJS.CallSite[] => stackTrace(caller, { limit: 1 })
      const received = caller()
      expect(received).toHaveLength(1)
      expect(received).toMatchSnapshot()
      received.forEach(testMethods)
    })

    describe('Test all methods of the first stack frame returned from the `stackTrace` API:', () => {
      const caller = (): NodeJS.CallSite[] => stackTrace()
      const [stack] = caller()

      it('Should return `null` when the `getTypeName` method is invoked!', () => {
        const received = stack.getTypeName()
        expect(received).toBeNull()
      })

      it('Should return the current `__filename` when the `getFileName` method is invoked!', () => {
        const received = stack.getFileName()
        const expected = __filename
        expect(received).toBe(expected)
      })

      it('Should return any `number` when the `getLineNumber` method is invoked!', () => {
        const received = stack.getLineNumber()
        const expected = expect.any(Number)
        expect(received).toEqual(expected)
      })

      it('Should return any `number` when the `getColumnNumber` method is invoked!', () => {
        const received = stack.getColumnNumber()
        const expected = expect.any(Number)
        expect(received).toEqual(expected)
      })

      it('Should return `null` when the `getMethodName` method is invoked!', () => {
        const received = stack.getMethodName()
        expect(received).toBeNull()
      })

      it('Should return the caller name when the `getFunctionName` method is invoked!', () => {
        const received = stack.getFunctionName()
        const expected = 'caller'
        expect(received).toBe(expected)
      })

      it('Should return `undefined` when the `getFunction` method is invoked!', () => {
        const received = stack.getFunction()
        expect(received).toBeUndefined()
      })

      it('Should return `undefined` when the `getThis` method is invoked!', () => {
        const received = stack.getThis()
        expect(received).toBeUndefined()
      })

      it('Should return `undefined` when the `getEvalOrigin` method is invoked!', () => {
        const received = stack.getEvalOrigin()
        expect(received).toBeUndefined()
      })

      it('Should return `false` when the `isConstructor` method is invoked!', () => {
        const received = stack.isConstructor()
        const expected = false
        expect(received).toBe(expected)
      })

      it('Should return `false` when the `isEval` method is invoked!', () => {
        const received = stack.isEval()
        const expected = false
        expect(received).toBe(expected)
      })

      it('Should return `false` when the `isNative` method is invoked!', () => {
        const received = stack.isNative()
        const expected = false
        expect(received).toBe(expected)
      })

      it('Should return `true` when the `isToplevel` method is invoked!', () => {
        const received = stack.isToplevel()
        const expected = true
        expect(received).toBe(expected)
      })
    })
  })
})
