import { dirname } from 'node:path'

import getCallerFile from './getCallerFile'

/**
 * Gets the caller's directory extracted from the result of
 * [`getCallerFile`](https://github.com/mnrendra/stack-trace?tab=readme-ov-file#getcallerfile).
 *
 * @param {((...args:any)=>any)|null} [callee] -
 * Optional callee function to be passed
 * to [`getCallerFile`](https://github.com/mnrendra/stack-trace?tab=readme-ov-file#getcallerfile).
 *
 * @returns {string}
 * Absolute path of the caller's directory extracted from the result of
 * [`getCallerFile`](https://github.com/mnrendra/stack-trace?tab=readme-ov-file#getcallerfile).
 *
 * @throws
 * If the caller's file name is not a string or not
 * absolute.
 *
 * @see https://github.com/mnrendra/stack-trace#readme
 */
const getCallerDir = (
  callee?: ((...args: any) => any) | null
): string => {
  const callerFile = getCallerFile(callee ?? getCallerDir)

  return dirname(callerFile)
}

export default getCallerDir
