import { isAbsolute } from 'node:path'
import { testMethods } from '@tests/utils'

import {
  stackTrace,
  getCallerSite,
  extractFilePath,
  getCallerFile
} from '..'

describe('Test all APIs:', () => {
  describe('Test `stackTrace` API:', () => {
    it('Should return the current stack trace when the callee is `undefined`!', () => {
      const caller = (): NodeJS.CallSite[] => stackTrace()
      const received = caller()
      expect(received).toMatchSnapshot()
      received.forEach(testMethods)
    })

    it('Should return the current stack trace when the callee is `null`!', () => {
      const caller = (): NodeJS.CallSite[] => stackTrace(null)
      const received = caller()
      expect(received).toMatchSnapshot()
      received.forEach(testMethods)
    })

    it('Should return the caller stack trace when the callee is a specific function!', () => {
      const callee = (): NodeJS.CallSite[] => stackTrace(callee)
      const caller = (): NodeJS.CallSite[] => callee()
      const received = caller()
      expect(received).toMatchSnapshot()
      received.forEach(testMethods)
    })

    it('Should only return the first stack trace frame when the `limit` option is set to `1`!', () => {
      const caller = (): NodeJS.CallSite[] => stackTrace(caller, { limit: 1 })
      const received = caller()
      expect(received).toHaveLength(1)
      expect(received).toMatchSnapshot()
      received.forEach(testMethods)
    })

    describe('Test all methods of the first stack frame returned from the `stackTrace` API:', () => {
      const caller = (): NodeJS.CallSite[] => stackTrace()
      const [callSite] = caller()

      it('Should return `null` when the `getTypeName` method is invoked!', () => {
        const received = callSite.getTypeName()
        expect(received).toBeNull()
      })

      it('Should return the current `__filename` when the `getFileName` method is invoked!', () => {
        const received = callSite.getFileName()
        const expected = __filename
        expect(received).toBe(expected)
      })

      it('Should return any `number` when the `getLineNumber` method is invoked!', () => {
        const received = callSite.getLineNumber()
        const expected = expect.any(Number)
        expect(received).toEqual(expected)
      })

      it('Should return any `number` when the `getColumnNumber` method is invoked!', () => {
        const received = callSite.getColumnNumber()
        const expected = expect.any(Number)
        expect(received).toEqual(expected)
      })

      it('Should return `null` when the `getMethodName` method is invoked!', () => {
        const received = callSite.getMethodName()
        expect(received).toBeNull()
      })

      it('Should return the caller name when the `getFunctionName` method is invoked!', () => {
        const received = callSite.getFunctionName()
        const expected = 'caller'
        expect(received).toBe(expected)
      })

      it('Should return `undefined` when the `getFunction` method is invoked!', () => {
        const received = callSite.getFunction()
        expect(received).toBeUndefined()
      })

      it('Should return `undefined` when the `getThis` method is invoked!', () => {
        const received = callSite.getThis()
        expect(received).toBeUndefined()
      })

      it('Should return `undefined` when the `getEvalOrigin` method is invoked!', () => {
        const received = callSite.getEvalOrigin()
        expect(received).toBeUndefined()
      })

      it('Should return `false` when the `isConstructor` method is invoked!', () => {
        const received = callSite.isConstructor()
        const expected = false
        expect(received).toBe(expected)
      })

      it('Should return `false` when the `isEval` method is invoked!', () => {
        const received = callSite.isEval()
        const expected = false
        expect(received).toBe(expected)
      })

      it('Should return `false` when the `isNative` method is invoked!', () => {
        const received = callSite.isNative()
        const expected = false
        expect(received).toBe(expected)
      })

      it('Should return `true` when the `isToplevel` method is invoked!', () => {
        const received = callSite.isToplevel()
        const expected = true
        expect(received).toBe(expected)
      })
    })
  })

  describe('Test `getCallerSite` API:', () => {
    it('Should return the first call site from the current stack trace when the callee is `undefined`!', () => {
      const caller = (): NodeJS.CallSite => getCallerSite()
      const received = caller()
      expect(received).toMatchSnapshot()
      testMethods(received)
    })

    it('Should return the first call site from the current stack trace when the callee is `null`!', () => {
      const caller = (): NodeJS.CallSite => getCallerSite(null)
      const received = caller()
      expect(received).toMatchSnapshot()
      testMethods(received)
    })

    it('Should return the first call site from the caller stack trace when the callee is a specific function!', () => {
      const caller = (): NodeJS.CallSite => getCallerSite(caller)
      const received = caller()
      expect(received).toMatchSnapshot()
      testMethods(received)
    })

    describe('Test all methods of the caller site object:', () => {
      const caller = (): NodeJS.CallSite => getCallerSite()
      const callerSite = caller()

      it('Should return `null` when the `getTypeName` method is invoked!', () => {
        const received = callerSite.getTypeName()
        expect(received).toBeNull()
      })

      it('Should return the current `__filename` when the `getFileName` method is invoked!', () => {
        const received = callerSite.getFileName()
        const expected = __filename
        expect(received).toBe(expected)
      })

      it('Should return any `number` when the `getLineNumber` method is invoked!', () => {
        const received = callerSite.getLineNumber()
        const expected = expect.any(Number)
        expect(received).toEqual(expected)
      })

      it('Should return any `number` when the `getColumnNumber` method is invoked!', () => {
        const received = callerSite.getColumnNumber()
        const expected = expect.any(Number)
        expect(received).toEqual(expected)
      })

      it('Should return `null` when the `getMethodName` method is invoked!', () => {
        const received = callerSite.getMethodName()
        expect(received).toBeNull()
      })

      it('Should return the caller name when the `getFunctionName` method is invoked!', () => {
        const received = callerSite.getFunctionName()
        const expected = 'caller'
        expect(received).toBe(expected)
      })

      it('Should return `undefined` when the `getFunction` method is invoked!', () => {
        const received = callerSite.getFunction()
        expect(received).toBeUndefined()
      })

      it('Should return `undefined` when the `getThis` method is invoked!', () => {
        const received = callerSite.getThis()
        expect(received).toBeUndefined()
      })

      it('Should return `undefined` when the `getEvalOrigin` method is invoked!', () => {
        const received = callerSite.getEvalOrigin()
        expect(received).toBeUndefined()
      })

      it('Should return `false` when the `isConstructor` method is invoked!', () => {
        const received = callerSite.isConstructor()
        const expected = false
        expect(received).toBe(expected)
      })

      it('Should return `false` when the `isEval` method is invoked!', () => {
        const received = callerSite.isEval()
        const expected = false
        expect(received).toBe(expected)
      })

      it('Should return `false` when the `isNative` method is invoked!', () => {
        const received = callerSite.isNative()
        const expected = false
        expect(received).toBe(expected)
      })

      it('Should return `true` when the `isToplevel` method is invoked!', () => {
        const received = callerSite.isToplevel()
        const expected = true
        expect(received).toBe(expected)
      })
    })
  })

  describe('Test `extractFilePath` API:', () => {
    const caller = (): NodeJS.CallSite => getCallerSite()
    const callerSite = caller()
    const getFileName = callerSite.getFileName.bind(callerSite)

    describe('By mocking `getFileName` of the call site to returns `undefined`:', () => {
      beforeEach(() => {
        Object.defineProperty(callerSite, 'getFileName', {
          value: () => undefined,
          configurable: true,
          enumerable: true,
          writable: false
        })
      })

      afterEach(() => {
        Object.defineProperty(callerSite, 'getFileName', {
          value: getFileName,
          configurable: true,
          enumerable: true,
          writable: false
        })
      })

      it('Should throw an error when the returned value of `getFileName` is not a string!', () => {
        const received = (): string => extractFilePath(callerSite)
        const expected = new Error('File name is not a string: `undefined`')
        expect(received).toThrow(expected)
      })
    })

    describe('By mocking `getFileName` of the call site to returns `null`:', () => {
      beforeEach(() => {
        Object.defineProperty(callerSite, 'getFileName', {
          value: () => null,
          configurable: true,
          enumerable: true,
          writable: false
        })
      })

      afterEach(() => {
        Object.defineProperty(callerSite, 'getFileName', {
          value: getFileName,
          configurable: true,
          enumerable: true,
          writable: false
        })
      })

      it('Should throw an error when the returned value of `getFileName` is not a string!', () => {
        const received = (): string => extractFilePath(callerSite)
        const expected = new Error('File name is not a string: `null`')
        expect(received).toThrow(expected)
      })
    })

    describe('By mocking `getFileName` of the call site to returns a non-absolute path:', () => {
      beforeEach(() => {
        Object.defineProperty(callerSite, 'getFileName', {
          value: () => './index.js',
          configurable: true,
          enumerable: true,
          writable: false
        })
      })

      afterEach(() => {
        Object.defineProperty(callerSite, 'getFileName', {
          value: getFileName,
          configurable: true,
          enumerable: true,
          writable: false
        })
      })

      it('Should throw an error when the returned value of `getFileName` is a non-absolute path!', () => {
        const received = (): string => extractFilePath(callerSite)
        const expected = new Error('File path is not absolute: "./index.js"')
        expect(received).toThrow(expected)
      })
    })

    describe('Without mocking anything:', () => {
      it('Should return an absolute path of the current file name!', () => {
        const received = extractFilePath(callerSite)
        expect(received).toBe(__filename)
        expect(isAbsolute(received)).toBe(true)
      })
    })
  })

  describe('Test `getCallerFile` API:', () => {
    it('Should return the file path from the first call site in the current stack trace when the callee is `undefined`!', () => {
      const caller = (): string => getCallerFile()
      const received = caller()
      expect(received).toBe(__filename)
    })

    it('Should return the file path from first call site in the current stack trace when the callee is `null`!', () => {
      const caller = (): string => getCallerFile(null)
      const received = caller()
      expect(received).toBe(__filename)
    })

    it('Should return the file path from first call site in the caller stack trace when the callee is a specific function!', () => {
      const caller = (): string => getCallerFile(caller)
      const received = caller()
      expect(received).toBe(__filename)
    })
  })
})
