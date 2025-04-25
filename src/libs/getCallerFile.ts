import getCallerSite from './getCallerSite'

import { extractFilePath } from '../utils'

/**
 * Gets the caller's file extracted from the result of
 * {@link https://github.com/mnrendra/stack-trace#getcallersite `getCallerSite`}
 * and ensures it returns an absolute path using
 * {@link https://github.com/mnrendra/stack-trace#extractfilepath `extractFilePath`}.
 *
 * @param {((...args:any)=>any)|null} [callee] - Optional callee function to
 * specify the caller. If `undefined` or `null`, tracing starts from the current
 * caller.
 *
 * @returns {string} Absolute path of the caller's
 * file.
 *
 * @throws If the extracted file name is not a string or not
 * absolute.
 *
 * @see {@link https://github.com/mnrendra/stack-trace#getcallerfile documentation}
 */
const getCallerFile = (
  callee?: ((...args: any) => any) | null
): string => {
  const callerSite = getCallerSite(callee ?? getCallerFile)

  return extractFilePath(callerSite)
}

export default getCallerFile
