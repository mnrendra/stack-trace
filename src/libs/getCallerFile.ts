import getCallerSite from './getCallerSite'

import { extractFilePath } from '../utils'

/**
 * Gets the caller's file path, starting after a specific callee.
 *
 * Returns the extracted file path from the first call site in the current stack
 * trace.
 * If a callee is provided, the trace start from the caller of the callee.
 *
 * @param {((...args: any) => any) | null} [callee] -
 * Optional callee function or method to start tracing after.
 * If `undefined` or `null`, tracing starts from the current caller.
 *
 * @returns {string}
 * A `string` representing the file path from the first call site in the
 * captured stack trace.
 *
 * @see https://github.com/mnrendra/stack-trace#readme
 */
const getCallerFile = (
  callee?: ((...args: any) => any) | null
): string => {
  const callerSite = getCallerSite(callee ?? getCallerFile)

  const filePath = extractFilePath(callerSite)

  return filePath
}

export default getCallerFile
