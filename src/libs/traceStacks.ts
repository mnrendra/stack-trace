import type { CallSite, Options } from '../types'

import { createTarget } from '../utils'

/**
 * A utility to enable stack tracing of the `NodeJs.CallSite` object, allowing
 * dynamic tracing of invocations.
 *
 * @param {((...args: any) => any)|null} [targetFn] - An optional function to
 * serve as the target.
 * @param {Options} [options] - An optional set of options to configure the
 * output.
 *
 * @returns {Array} A list of `NodeJS.CallSite` stack trace objects.
 *
 * @see https://github.com/mnrendra/stack-trace#readme
 */
const traceStacks = (
  targetFn?: ((...args: any) => any) | null,
  {
    limit = 10
  }: Options = {}
): CallSite[] => {
  const target = createTarget()

  const { stackTraceLimit, prepareStackTrace } = Error

  Error.stackTraceLimit = limit

  Error.prepareStackTrace = (_, stack) => stack

  Error.captureStackTrace(target, targetFn ?? traceStacks)

  const { stack } = target

  Error.prepareStackTrace = prepareStackTrace

  Error.stackTraceLimit = stackTraceLimit

  return stack
}

export default traceStacks
