import main from '../main'

/**
 * Gets the caller's call site, starting after a specific callee.
 *
 * Returns the first call site from the current stack trace as a
 * `NodeJS.CallSite`.
 * If a callee is provided, the trace will start from the caller of the callee.
 *
 * @param {((...args: any) => any) | null} [callee] -
 * Optional callee function or method to start tracing after.
 * If `undefined` or `null`, tracing starts from the current caller.
 *
 * @returns {NodeJS.CallSite}
 * A `NodeJS.CallSite` representing the first call site from the captured stack
 * trace.
 *
 * @see https://github.com/mnrendra/stack-trace#readme
 */
const getCallerSite = (
  callee?: ((...args: any) => any) | null
): NodeJS.CallSite => {
  const [callSite] = main(callee ?? getCallerSite, { limit: 1 })

  return callSite
}

export default getCallerSite
