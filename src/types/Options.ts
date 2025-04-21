interface Options {
  /**
   * Specifies the number of stack frames to be collected by a stack trace.
   *
   * The default value is `Infinity` but may be set to any valid JavaScript
   * number. Changes will affect any stack trace captured after the value has
   * been changed.
   *
   * If set to a non-number value, or set to a negative number, stack traces
   * will not capture any frames.
   *
   * @default Infinity
   *
   * @see https://nodejs.org/api/errors.html#errorstacktracelimit
   */
  limit?: number
}

export default Options
