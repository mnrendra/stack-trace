import { isAbsolute } from 'node:path'

import { normalizePath } from '../helpers'

/**
 * Extracts the file name from a call site and converts it to a file path if the
 * value is a file URL.
 *
 * This utility ensures that the returned path is always absolute.
 *
 * @param {NodeJS.CallSite} callSite -
 * A `NodeJS.CallSite` object captured from the stack trace.
 *
 * @returns {string}
 * The absolute path of the file name associated with the call site.
 *
 * @see https://github.com/mnrendra/stack-trace#readme
 */
const extractFilePath = (
  callSite: NodeJS.CallSite
): string => {
  const fileName = callSite.getFileName()

  const filePath = normalizePath(fileName)

  if (!isAbsolute(filePath)) {
    throw new Error(`File path is not absolute: "${filePath}"`)
  }

  return filePath
}

export default extractFilePath
