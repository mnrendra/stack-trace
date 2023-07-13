import type { CallSite } from './CallSite'

export interface Target {
  stack: CallSite[]
}
