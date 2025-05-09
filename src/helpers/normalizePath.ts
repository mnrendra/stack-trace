import { fileURLToPath } from 'node:url'

const normalizePath = (
  fileName?: string | null
): string => {
  if (typeof fileName !== 'string') {
    throw new Error(`Caller's file name is not a string: \`${fileName}\``)
  }

  try {
    return fileURLToPath(fileName)
  } catch {
    return fileName
  }
}

export default normalizePath
