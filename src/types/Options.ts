export interface Options {
  /**
   * The `Error.stackTraceLimit` property specifies the number of stack frames
   * collected by a stack trace.
   *
   * @default 10
   *
   * @see https://nodejs.org/api/errors.html#errorstacktracelimit
   */
  limit?: number
}
