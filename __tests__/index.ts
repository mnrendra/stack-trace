import { traceStacks, traceFiles } from '..'

describe('Test all features:', () => {
  describe('Test `traceStacks` feature:', () => {
    it('Should return the default value (a list of `NodeJs.CallSite` objects) when given an empty argument!', () => {
      const result = traceStacks()
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

    it('Should only return the first stack-trace object when given an option with `limit` is set to `1` and first argument is set to `undefined`!', () => {
      const result = traceStacks(undefined, { limit: 1 })
      expect(result).toEqual([
        expect.any(Object)
      ])
    })

    it('Should only return the first stack-trace object when given an option with `limit` is set to `1` and first argument is set to `null`!', () => {
      const result = traceStacks(null, { limit: 1 })
      expect(result).toEqual([
        expect.any(Object)
      ])
    })

    describe('Test properties of the first stack-trace object that returned from the `traceStacks` when given an empty argument:', () => {
      it('Should return a `string` (a type name) when invoke the `getTypeName` property!', () => {
        const result = traceStacks()
        expect(result[0].getTypeName()).toBe('Object')
      })

      it('Should return a `string` (a file name) when invoke the `getFileName` property!', () => {
        const result = traceStacks()
        expect(result[0].getFileName()).toBe(__filename)
      })

      it('Should return a `number` (a line number) when invoke the `getLineNumber` property!', () => {
        const result = traceStacks()
        expect(result[0].getLineNumber()).toEqual(expect.any(Number))
      })

      it('Should return a `number` (a column number) when invoke the `getColumnNumber` property!', () => {
        const result = traceStacks()
        expect(result[0].getColumnNumber()).toEqual(expect.any(Number))
      })

      it('Should return `null` when invoke the `getMethodName` property!', () => {
        const result = traceStacks()
        expect(result[0].getMethodName()).toBe(null)
      })

      it('Should return `null` when invoke the `getFunctionName` property!', () => {
        const result = traceStacks()
        expect(result[0].getFunctionName()).toBe(null)
      })

      it('Should return `undefined` when invoke the `getFunction` property!', () => {
        const result = traceStacks()
        expect(result[0].getFunction()).toBe(undefined)
      })

      it('Should return `undefined` when invoke the `getThis` property!', () => {
        const result = traceStacks()
        expect(result[0].getThis()).toBe(undefined)
      })

      it('Should return `undefined` when invoke the `getEvalOrigin` property!', () => {
        const result = traceStacks()
        expect(result[0].getEvalOrigin()).toBe(undefined)
      })

      it('Should return `false` when invoke the `isConstructor` property!', () => {
        const result = traceStacks()
        expect(result[0].isConstructor()).toBe(false)
      })

      it('Should return `false` when invoke the `isEval` property!', () => {
        const result = traceStacks()
        expect(result[0].isEval()).toBe(false)
      })

      it('Should return `false` when invoke the `isNative` property!', () => {
        const result = traceStacks()
        expect(result[0].isNative()).toBe(false)
      })

      it('Should return `false` when invoke the `isToplevel` property!', () => {
        const result = traceStacks()
        expect(result[0].isToplevel()).toBe(false)
      })
    })
  })

  describe('Test `traceFiles` feature:', () => {
    it('Should return the default value (a list of `NodeJs.CallSite` file names) when given an empty argument!', () => {
      const result = traceFiles()
      expect(result).toEqual([
        expect.any(String),
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

    it('Should only return the first stack-trace file name when given an option with `limit` is set to `1` and first argument is set to `undefined`!', () => {
      const result = traceFiles(undefined, { limit: 1 })
      expect(result).toEqual([
        expect.any(String)
      ])
    })

    it('Should only return the first stack-trace file name when given an option with `limit` is set to `1` and first argument is set to `null`!', () => {
      const result = traceFiles(null, { limit: 1 })
      expect(result).toEqual([
        expect.any(String)
      ])
    })
  })
})
