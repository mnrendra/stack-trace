import main from '../main'

/**
 * Gets the caller's site captured
 * from [`stackTrace`](https://github.com/mnrendra/stack-trace?tab=readme-ov-file#stacktrace).
 *
 * @param {((...args:any)=>any)|null} [callee] -
 * Optional callee function to be passed
 * to [`stackTrace`](https://github.com/mnrendra/stack-trace?tab=readme-ov-file#stacktrace).
 *
 * @returns {NodeJS.CallSite}
 * First `CallSite` object captured
 * from [`stackTrace`](https://github.com/mnrendra/stack-trace?tab=readme-ov-file#stacktrace).
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
