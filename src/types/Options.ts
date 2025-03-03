export interface Options {
  /**
   * The `Error.stackTraceLimit` property specifies the number of stack frames
   * collected by a stack trace.
   *
   * The default value is `10` but may be set to any valid JavaScript number.
   * Changes will affect any stack trace captured after the value has been
   * changed.
   *
   * If set to a non-number value, or set to a negative number, stack traces
   * will not capture any frames.
   *
   * @default 10
   *
   * @see https://nodejs.org/api/errors.html#errorstacktracelimit
   */
  limit?: number
}
