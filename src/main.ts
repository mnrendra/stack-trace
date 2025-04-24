import type { Options } from './types'

import { createTarget } from './helpers'

/**
 * Captures [v8 stack trace](https://v8.dev/docs/stack-trace-api) from a
 * specific caller.
 *
 * @param {((...args:any)=>any)|null} [callee] -
 * Optional callee function to specify the caller.
 * If `undefined` or `null`, tracing starts from the current caller.
 *
 * @param {Options} [options] -
 * Optional options to affect the captured frames.
 *
 * By default, the `limit` option is set to `Infinity` to capture all frames.
 * To capture only a specific number of frames, set the `limit` option to a
 * positive number.
 *
 * @returns {NodeJS.CallSite[]}
 * Array of `CallSite` objects representing the captured stack trace
 * frames.
 *
 * @see https://github.com/mnrendra/stack-trace#readme
 */
const main = (
  callee?: ((...args: any) => any) | null,
  {
    limit = Infinity
  }: Options = {}
): NodeJS.CallSite[] => {
  const { stackTraceLimit, prepareStackTrace } = Error

  Error.stackTraceLimit = limit
  Error.prepareStackTrace = (_, stack) => stack

  const target = createTarget()
  Error.captureStackTrace(target, callee ?? main)
  const { stack } = target

  Error.prepareStackTrace = prepareStackTrace
  Error.stackTraceLimit = stackTraceLimit

  return stack
}

export default main
