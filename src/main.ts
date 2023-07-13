import type { TargetFunction, Options, StackTrace } from './types'
import { createTarget } from './utils'

/**
 * A utility that enables stack tracing of the `NodeJs.CallSite` object,
 * allowing dynamic tracing of invocations.
 * @param targetFunction An optional function that can serve as the target.
 * @param options An optional set of options to configure the output.
 * @returns An array containing objects of type `NodeJS.CallSite`.
 * @see https://github.com/mnrendra/stack-trace#readme
 */
const main: StackTrace = function (
  targetFunction?: TargetFunction,
  {
    limit = 10
  }: Options = {}
) {
  // Initialize the `target` object.
  const target = createTarget()

  // Destructure the necessary properties from the `Error` object.
  const { stackTraceLimit, prepareStackTrace } = Error

  // Manipulate the `Error.stackTraceLimit` based on the `limit` options.
  Error.stackTraceLimit = limit

  // Manipulate the `Error.prepareStackTrace` to return only the `stack` object.
  Error.prepareStackTrace = (_, stack) => stack

  // Create the `.stack` property on the `target` object.
  Error.captureStackTrace(target, targetFunction ?? main)

  // Destructure the `stack` property from the `target`.
  const { stack } = target

  // Reset `Error.prepareStackTrace` to its original value.
  Error.prepareStackTrace = prepareStackTrace

  // Reset `Error.stackTraceLimit` to its original value.
  Error.stackTraceLimit = stackTraceLimit

  // Return the `stack` as the `NodeJs.CallSite` array.
  return stack
}

export default main
