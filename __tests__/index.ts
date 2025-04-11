import type { CallSite } from '..'

import { traceFiles, traceFnNames, traceStacks } from '..'

type T = Array<string | null | undefined>

describe('Test all features:', () => {
  describe('Test `traceFiles` feature:', () => {
    it('Should return the file names from the caller\'s stack trace when given an empty argument!', () => {
      const caller = (): T => traceFiles()
      const result = caller()
      expect(result).toEqual([
        __filename,
        expect.any(String),
        expect.any(String),
        null,
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String)
      ])
    })

    it('Should return the file names from the caller of caller\'s stack trace when given a caller in the first argument!', () => {
      const caller = (): T => traceFiles(caller)
      const callerOfCaller = (): T => caller()
      const result = callerOfCaller()
      expect(result).toEqual([
        __filename,
        expect.any(String),
        expect.any(String),
        null,
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String)
      ])
    })

    it('Should only return the first stack-trace file name when given an option with `limit` is set to `1` and the first argument is set to `undefined`!', () => {
      const caller = (): T => traceFiles(undefined, { limit: 1 })
      const result = caller()
      expect(result).toEqual([__filename])
    })

    it('Should only return the first stack-trace file name when given an option with `limit` is set to `1` and the first argument is set to `null`!', () => {
      const caller = (): T => traceFiles(null, { limit: 1 })
      const result = caller()
      expect(result).toEqual([__filename])
    })
  })

  describe('Test `traceFnNames` feature:', () => {
    it('Should return the function names from the caller\'s stack trace when given an empty argument!', () => {
      const caller = (): T => traceFnNames()
      const result = caller()
      expect(result).toEqual([
        'caller',
        null,
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String)
      ])
    })

    it('Should return the function names from the caller of caller\'s stack trace when given a caller in the first argument!', () => {
      const caller = (): T => traceFnNames(caller)
      const callerOfCaller = (): T => caller()
      const result = callerOfCaller()
      expect(result).toEqual([
        'callerOfCaller',
        null,
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String)
      ])
    })

    it('Should only return the first stack-trace function name when given an option with `limit` is set to `1` and the first argument is set to `undefined`!', () => {
      const caller = (): T => traceFnNames(undefined, { limit: 1 })
      const result = caller()
      expect(result).toEqual(['caller'])
    })

    it('Should only return the first stack-trace function name when given an option with `limit` is set to `1` and the first argument is set to `null`!', () => {
      const caller = (): T => traceFnNames(null, { limit: 1 })
      const result = caller()
      expect(result).toEqual(['caller'])
    })
  })

  describe('Test `traceStacks` feature:', () => {
    it('Should return the `NodeJS.CallSite` object from the caller\'s stack trace when given an empty argument!', () => {
      const caller = (): CallSite[] => traceStacks()
      const result = caller()
      expect(result).toEqual([
        expect.any(Object),
        expect.any(Object),
        expect.any(Object),
        expect.any(Object),
        expect.any(Object),
        expect.any(Object),
        expect.any(Object),
        expect.any(Object),
        expect.any(Object),
        expect.any(Object)
      ])
    })

    it('Should return the `NodeJS.CallSite` object from the caller of caller\'s stack trace when given a caller in the first argument!', () => {
      const caller = (): CallSite[] => traceStacks(caller)
      const callerOfCaller = (): CallSite[] => caller()
      const result = callerOfCaller()
      expect(result).toEqual([
        expect.any(Object),
        expect.any(Object),
        expect.any(Object),
        expect.any(Object),
        expect.any(Object),
        expect.any(Object),
        expect.any(Object),
        expect.any(Object),
        expect.any(Object),
        expect.any(Object)
      ])
    })

    it('Should only return the first stack-trace object when given an option with `limit` is set to `1` and the first argument is set to `undefined`!', () => {
      const caller = (): CallSite[] => traceStacks(undefined, { limit: 1 })
      const result = caller()
      expect(result).toEqual([expect.any(Object)])
    })

    it('Should only return the first stack-trace object when given an option with `limit` is set to `1` and the first argument is set to `null`!', () => {
      const caller = (): CallSite[] => traceStacks(null, { limit: 1 })
      const result = caller()
      expect(result).toEqual([expect.any(Object)])
    })

    describe('Test properties of the first `NodeJS.CallSite` from `traceStacks()`:', () => {
      it('Should return a `null` when invoke the `getTypeName` property!', () => {
        const caller = (): CallSite[] => traceStacks()
        const result = caller()
        expect(result[0].getTypeName()).toBe(null)
      })

      it('Should return a `__filename` when invoke the `getFileName` property!', () => {
        const caller = (): CallSite[] => traceStacks()
        const result = caller()
        expect(result[0].getFileName()).toBe(__filename)
      })

      it('Should return a `number` when invoke the `getLineNumber` property!', () => {
        const caller = (): CallSite[] => traceStacks()
        const result = caller()
        expect(result[0].getLineNumber()).toEqual(expect.any(Number))
      })

      it('Should return a `number` when invoke the `getColumnNumber` property!', () => {
        const caller = (): CallSite[] => traceStacks()
        const result = caller()
        expect(result[0].getColumnNumber()).toEqual(expect.any(Number))
      })

      it('Should return `null` when invoke the `getMethodName` property!', () => {
        const caller = (): CallSite[] => traceStacks()
        const result = caller()
        expect(result[0].getMethodName()).toBe(null)
      })

      it('Should return the caller name when invoke the `getFunctionName` property!', () => {
        const caller = (): CallSite[] => traceStacks()
        const result = caller()
        expect(result[0].getFunctionName()).toBe('caller')
      })

      it('Should return `undefined` when invoke the `getFunction` property!', () => {
        const caller = (): CallSite[] => traceStacks()
        const result = caller()
        expect(result[0].getFunction()).toBe(undefined)
      })

      it('Should return `undefined` when invoke the `getThis` property!', () => {
        const caller = (): CallSite[] => traceStacks()
        const result = caller()
        expect(result[0].getThis()).toBe(undefined)
      })

      it('Should return `undefined` when invoke the `getEvalOrigin` property!', () => {
        const caller = (): CallSite[] => traceStacks()
        const result = caller()
        expect(result[0].getEvalOrigin()).toBe(undefined)
      })

      it('Should return `false` when invoke the `isConstructor` property!', () => {
        const caller = (): CallSite[] => traceStacks()
        const result = caller()
        expect(result[0].isConstructor()).toBe(false)
      })

      it('Should return `false` when invoke the `isEval` property!', () => {
        const caller = (): CallSite[] => traceStacks()
        const result = caller()
        expect(result[0].isEval()).toBe(false)
      })

      it('Should return `false` when invoke the `isNative` property!', () => {
        const caller = (): CallSite[] => traceStacks()
        const result = caller()
        expect(result[0].isNative()).toBe(false)
      })

      it('Should return `true` when invoke the `isToplevel` property!', () => {
        const caller = (): CallSite[] => traceStacks()
        const result = caller()
        expect(result[0].isToplevel()).toBe(true)
      })
    })
  })
})
