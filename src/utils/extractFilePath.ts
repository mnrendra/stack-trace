import { isAbsolute } from 'node:path'

import { normalizePath } from '../helpers'

/**
 * Extracts the file name from a `CallSite` object and converts it to a file
 * path if the value is a file URL.
 *
 * This utility ensures that the returned value is an absolute path.
 *
 * @param {NodeJS.CallSite} callSite -
 * `CallSite` object captured
 * from [`stackTrace`](https://github.com/mnrendra/stack-trace?tab=readme-ov-file#stacktrace).
 *
 * @returns {string}
 * Absolute path of the file name extracted from a `CallSite`
 * object.
 *
 * @throws
 * If the extracted file name is not a string or not
 * absolute.
 *
 * @see https://github.com/mnrendra/stack-trace#readme
 */
const extractFilePath = (
  callSite: NodeJS.CallSite
): string => {
  const fileName = callSite.getFileName()

  const filePath = normalizePath(fileName)

  if (!isAbsolute(filePath)) {
    throw new Error(`Caller's file path is not absolute: "${filePath}"`)
  }

  return filePath
}

export default extractFilePath
