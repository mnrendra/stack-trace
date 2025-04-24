import getCallerSite from './getCallerSite'

import { extractFilePath } from '../utils'

/**
 * Gets the caller's file from the result of
 * [`getCallerSite`](https://github.com/mnrendra/stack-trace?tab=readme-ov-file#getcallersite)
 * and ensures it returns an absolute path extracted from
 * [`extractFilePath`](https://github.com/mnrendra/stack-trace?tab=readme-ov-file#extractfilepath).
 *
 * @param {((...args:any)=>any)|null} [callee] -
 * Optional callee function to be passed
 * to [`getCallerSite`](https://github.com/mnrendra/stack-trace?tab=readme-ov-file#getcallersite).
 *
 * @returns {string}
 * Absolute path of the caller's file extracted from the result of
 * [`getCallerSite`](https://github.com/mnrendra/stack-trace?tab=readme-ov-file#getcallersite).
 *
 * @throws
 * If the extracted file name is not a string or not
 * absolute.
 *
 * @see https://github.com/mnrendra/stack-trace#readme
 */
const getCallerFile = (
  callee?: ((...args: any) => any) | null
): string => {
  const callerSite = getCallerSite(callee ?? getCallerFile)

  return extractFilePath(callerSite)
}

export default getCallerFile
