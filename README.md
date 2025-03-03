# @mnrendra/stack-trace
A utility to enable stack tracing of the `NodeJs.CallSite` object, allowing dynamic tracing of invocations.

## Install
```bash
npm i @mnrendra/stack-trace
```

## Usage
Using `CommonJS`:
```javascript
const { stackTrace } = require('@mnrendra/stack-trace')
const [trace] = stackTrace()
console.log(trace.getFileName() === __filename) // Output: true
```

Using `ES Module`:
```javascript
import { stackTrace } from '@mnrendra/stack-trace'
import { fileURLToPath } from 'node:url'
const [trace] = stackTrace()
console.log(new URL(trace.getFileName()).pathname === fileURLToPath(import.meta.url)) // Output: true
```

### Examples
1. Call from your development project `/foo/project-name/src/index.mjs`:
```javascript
import { stackTrace } from '@mnrendra/stack-trace'
const [trace] = stackTrace()
console.log(trace.getFileName()) // Output: file:///foo/project-name/src/index.mjs
```

2. Call from your production module `/foo/project-name/node_modules/module-name/dist/index.js`:
```javascript
"use strict";
const { stackTrace } = require('@mnrendra/stack-trace');
const [trace] = stackTrace();
console.log(trace.getFileName()); // Output: /foo/project-name/node_modules/module-name/dist/index.js
```

Note: When calling `getFileName` from an <b>ESM</b> module, it will return the file name as a <b>URL</b> instead of a file path.

## Options
```javascript
import { stackTrace } from '@mnrendra/stack-trace'

stackTrace(
  // The first argument is the target function, or `null`, or `undefined`:
  null,
  // The second argument is the options object:
  {
    limit: 10 // The `Error.stackTraceLimit` property specifies the number of stack frames to be collected by a stack trace.
  }
)
```

## Utilities
```javascript
import {
  validateSkippedStacks // To validate a name or a list of names of stack traces that need to be skipped. More info: @see https://github.com/mnrendra/validate-skipped-stacks
} from '@mnrendra/stack-trace'
```

## Types
```typescript
import type {
  CallSite, // NodeJS.CallSite
  Func, // (...args: any[]) => any
  Options, // @mnrendra/stack-trace options
  SkippedStacks, // @mnrendra/validate-skipped-stacks input
  ValidSkippedStacks // @mnrendra/validate-skipped-stacks output
} from '@mnrendra/stack-trace'
```

## License
[MIT](https://github.com/mnrendra/stack-trace/blob/HEAD/LICENSE)

## Author
[@mnrendra](https://github.com/mnrendra)
