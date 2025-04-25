import { dirname } from 'node:path'

import getCallerFile from './getCallerFile'

/**
 * Gets the caller's directory extracted from the result of
 * {@link https://github.com/mnrendra/stack-trace#getcallerfile `getCallerFile`}.
 *
 * @param {((...args:any)=>any)|null} [callee] - Optional callee function to
 * specify the caller. If `undefined` or `null`, tracing starts from the current
 * caller.
 *
 * @returns {string} Absolute path of the caller's
 * directory.
 *
 * @throws If the extracted file name is not a string or not
 * absolute.
 *
 * @see {@link https://github.com/mnrendra/stack-trace#getcallerdir documentation}
 */
const getCallerDir = (
  callee?: ((...args: any) => any) | null
): string => {
  const callerFile = getCallerFile(callee ?? getCallerDir)

  return dirname(callerFile)
}

export default getCallerDir
