import type { TargetFunction } from './TargetFunction'
import type { CallSite } from './CallSite'
import type { Options } from './Options'

export type StackTrace = (
  targetFunction?: TargetFunction,
  options?: Options
) => CallSite[]
