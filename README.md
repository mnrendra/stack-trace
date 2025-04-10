# @mnrendra/stack-trace

![npm version](https://img.shields.io/npm/v/@mnrendra/stack-trace)
![types](https://img.shields.io/npm/types/@mnrendra/stack-trace)
![license](https://img.shields.io/npm/l/@mnrendra/stack-trace)

A utility for stack tracing using the [NodeJS.CallSite](https://nodejs.org/api/errors.html#callsite-object) object, allowing dynamic inspection of function invocations.<br/>
*Useful for debugging, logging, or building tools that need to understand call origins and file references at runtime.*

## Install
```bash
npm i @mnrendra/stack-trace
```

## Usage
- `traceStacks(fn?, options?)`: Returns an array of `NodeJS.CallSite` objects representing the captured stack trace of the given function.
- `traceFiles(fn?, options?)`: Returns an array of file names (as `string` in **CommonJS** or `URL` in **ESM**) extracted from the stack trace of the given function.


Using `CommonJS`:
```javascript
const { traceStacks, traceFiles } = require('@mnrendra/stack-trace')

const [stack] = traceStacks()
console.log(stack.getFileName() === __filename) // Output: true

const [file] = traceFiles()
console.log(file === __filename) // Output: true
```

Using `ES Modules`:
```javascript
import { fileURLToPath } from 'node:url'
import { traceStacks, traceFiles } from '@mnrendra/stack-trace'

const [stack] = traceStacks()
console.log(new URL(stack.getFileName()).pathname === fileURLToPath(import.meta.url)) // Output: true

const [file] = traceFiles()
console.log(new URL(file).pathname === fileURLToPath(import.meta.url)) // Output: true
```

### Examples
1. Call from your development project `/foo/project-name/src/index.mjs`:
```javascript
import { traceStacks, traceFiles } from '@mnrendra/stack-trace'

const main = () => {
  const [stack] = traceStacks(main)
  console.log(stack.getFileName()) // Output: file:///foo/project-name/src/index.mjs

  const [file] = traceFiles(main)
  console.log(file) // Output: file:///foo/project-name/src/index.mjs
}

export default main
```

2. Call from your production module `/foo/project-name/node_modules/module-name/dist/index.js`:
```javascript
"use strict";

const { traceStacks, traceFiles } = require('@mnrendra/stack-trace');

const main = () => {
  const [trace] = traceStacks(main);
  console.log(trace.getFileName()); // Output: /foo/project-name/node_modules/module-name/dist/index.js

  const [file] = traceFiles(main);
  console.log(file); // Output: /foo/project-name/node_modules/module-name/dist/index.js
};

module.exports = main;
```

**Note**: When calling `getFileName` from an **ESM** module, it will return the file name as a **URL** instead of a file path.


## Options
```javascript
import { traceStacks, traceFiles } from '@mnrendra/stack-trace'

traceStacks(
  // The target function to trace (optional)
  null,
  {
    // The maximum number of stack frames to capture (default: 10)
    limit: 10
  }
)

traceFiles(
  // The target function to trace (optional)
  null,
  {
    // The maximum number of stack frames to capture (default: 10)
    limit: 10
  }
)
```

## Types
```typescript
import type {
  CallSite, // NodeJS.CallSite
  Options, // Shared options for `traceStacks` and `traceFiles`
} from '@mnrendra/stack-trace'
```

## License
[MIT](https://github.com/mnrendra/stack-trace/blob/HEAD/LICENSE)

## Author
[@mnrendra](https://github.com/mnrendra)
