import main from '../main'

/**
 * Gets the caller's `CallSite` object captured from
 * {@link https://github.com/mnrendra/stack-trace#stacktrace `stackTrace`}.
 *
 * @param {((...args:any)=>any)|null} [callee] - Optional callee function to
 * specify the caller. If `undefined` or `null`, tracing starts from the current
 * caller.
 *
 * @returns {NodeJS.CallSite} First `CallSite` object captured in the stack
 * trace.
 *
 * @see {@link https://github.com/mnrendra/stack-trace#getcallersite documentation}
 */
const getCallerSite = (
  callee?: ((...args: any) => any) | null
): NodeJS.CallSite => {
  const [callSite] = main(callee ?? getCallerSite, { limit: 1 })

  return callSite
}

export default getCallerSite
