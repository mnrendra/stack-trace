import type { Options } from '../types'

import traceStacks from './traceStacks'

/**
 * A utility for stack tracing the function names based on the `NodeJS.CallSite`
 * object, enabling dynamic inspection of function calls.
 *
 * @param {((...args: any) => any)|null} [targetFn] - An optional function to
 * serve as the target.
 * @param {Options} [options] - An optional set of options to configure the
 * output.
 *
 * @returns {Array} A list of `NodeJS.CallSite` stack trace function names.
 *
 * @see https://github.com/mnrendra/stack-trace#readme
 */
const traceFnNames = (
  targetFn?: ((...args: any) => any) | null,
  {
    limit = 10
  }: Options = {}
): Array<string | null | undefined> => {
  const stacks = traceStacks(targetFn ?? traceFnNames, { limit })

  const files = stacks.map((stack) => stack.getFunctionName())

  return files
}

export default traceFnNames
