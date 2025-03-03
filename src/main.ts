import type { CallSite, Func, Options } from './types'

import { createTarget } from './utils'

/**
 * A utility to enable stack tracing of the `NodeJs.CallSite` object, allowing
 * dynamic tracing of invocations.
 *
 * @param {Func|null} [targetFunction] - An optional function to serve as the
 * target.
 * @param {Options} [options] - An optional set of options to configure the
 * output.
 *
 * @returns {Array} An array containing objects of type `NodeJS.CallSite`.
 *
 * @see https://github.com/mnrendra/stack-trace#readme
 */
const main = (
  targetFunction?: Func | null,
  {
    limit = 10
  }: Options = {
    limit: 10
  }
): CallSite[] => {
  // Initialize the `target` object.
  const target = createTarget()

  // Destructure necessary properties from the `Error` object.
  const { stackTraceLimit, prepareStackTrace } = Error

  // Override `Error.stackTraceLimit` based on the `limit` option.
  Error.stackTraceLimit = limit

  // Override `Error.prepareStackTrace` to return only the `stack` object.
  Error.prepareStackTrace = (_, stack) => stack

  // Capture the stack trace and assign it to the `target` object.
  Error.captureStackTrace(target, targetFunction ?? main)

  // Destructure the `stack` property from the `target`.
  const { stack } = target

  // Restore `Error.prepareStackTrace` to its original value.
  Error.prepareStackTrace = prepareStackTrace

  // Restore `Error.stackTraceLimit` to its original value.
  Error.stackTraceLimit = stackTraceLimit

  // Return the `stack` as an array of `NodeJS.CallSite` objects.
  return stack
}

export default main
