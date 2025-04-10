import type { Options } from '../types'

import traceStacks from './traceStacks'

/**
 * A utility to enable stack tracing of the `NodeJs.CallSite` files, allowing
 * dynamic tracing of invocations.
 *
 * @param {((...args: any) => any|null)} [targetFn] - An optional function to
 * serve as the target.
 * @param {Options} [options] - An optional set of options to configure the
 * output.
 *
 * @returns {Array} A list of `NodeJS.CallSite` stack trace file names.
 *
 * @see https://github.com/mnrendra/stack-trace#readme
 */
const traceFiles = (
  targetFn?: ((...args: any) => any) | null,
  {
    limit = 10
  }: Options = {}
): Array<string | null | undefined> => {
  const stacks = traceStacks(targetFn, { limit })

  const files = stacks.map((stack) => stack.getFileName())

  return files
}

export default traceFiles
