import type { Target } from '../types'

/**
 * Create an initial stack target.
 *
 * @returns {Object} stack target.
 */
const createTarget = (): Target => ({
  stack: []
})

// Export `createTarget` as the default value.
export default createTarget
