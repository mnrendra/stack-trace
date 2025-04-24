import type { Options } from './types'

import { createTarget } from './helpers'

/**
 * Traces the caller's call sites, starting after a specific callee.
 *
 * Captures the current stack trace as an array of `NodeJS.CallSite`.
 * If a callee is provided, the trace start from the caller of the callee.
 *
 * @param {((...args: any) => any) | null} [callee] -
 * Optional callee function or method to start tracing after.
 * If `undefined` or `null`, tracing starts from the current caller.
 *
 * @param {Options} [options] -
 * Configuration options for tracing behavior.
 * By default, the `limit` option is set to `Infinity` to capture all frames.
 * To capture only a specific number of frames, set the `limit` option to a
 * positive number.
 *
 * @returns {NodeJS.CallSite[]}
 * An array of `NodeJS.CallSite` representing the captured stack trace.
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
