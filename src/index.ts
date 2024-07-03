import type {
  SkippedStacks,
  ValidSkippedStacks
} from '@mnrendra/validate-skipped-stacks'

import type {
  CallSite,
  Options,
  TargetFunction,
  StackTrace
} from './types'

import validateSkippedStacks from '@mnrendra/validate-skipped-stacks'

import main from './main'

export type {
  CallSite,
  Options,
  TargetFunction,
  StackTrace,
  // from `@mnrendra/validate-skipped-stacks`
  SkippedStacks,
  ValidSkippedStacks
}

export {
  main as stackTrace,
  // from `@mnrendra/validate-skipped-stacks`
  validateSkippedStacks
}
