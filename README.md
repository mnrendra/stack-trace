# @mnrendra/stack-trace

![npm version](https://img.shields.io/npm/v/@mnrendra/stack-trace)
![types](https://img.shields.io/npm/types/@mnrendra/stack-trace)
![license](https://img.shields.io/npm/l/@mnrendra/stack-trace)

A utility for stack tracing based on the [NodeJS.CallSite](https://nodejs.org/api/errors.html#callsite-object) object, enabling dynamic inspection of function calls.<br/>
*Useful for debugging, logging, or building tools that need to understand call origins and file references at runtime.*

## Install
```bash
npm i @mnrendra/stack-trace
```

## Usage
- `traceStacks(targetFn?, options?)`:<br/>
Returns an array of `NodeJS.CallSite` objects representing the captured stack trace.
- `traceFiles(targetFn?, options?)`:<br/>
Returns an array of file names (as `string` in **CommonJS** or `URL` in **ES Modules**) extracted from the stack trace of the specified function.
- `traceFnNames(targetFn?, options?)`:<br/>
Returns an array of function names extracted from the stack trace of the given function.

**Note**: If `targetFn` is not provided, it captures the current call stack.

### Usage in `CommonJS`:
```javascript
const { traceStacks, traceFiles, traceFnNames } = require('@mnrendra/stack-trace')

const caller1 = () => traceStacks()
const [stack] = caller1()
console.log(stack.getFileName() === __filename) // Output: true

const caller2 = () => traceFiles()
const [file] = caller2()
console.log(file === __filename) // Output: true

const caller3 = () => traceFnNames()
const [fnName] = caller3()
console.log(fnName) // Output: caller3
```

### Usage in `ES Modules`:
```javascript
import { traceStacks, traceFiles, traceFnNames } from '@mnrendra/stack-trace'

const caller1 = () => traceStacks()
const [stack] = caller1()
console.log(stack.getFileName() === import.meta.url) // Output: true

const caller2 = () => traceFiles()
const [file] = caller2()
console.log(file === import.meta.url) // Output: true

const caller3 = () => traceFnNames()
const [fnName] = caller3()
console.log(fnName) // Output: caller3
```

### Examples
1. Call from your development project `/foo/project-name/src/index.mjs`:
```javascript
import { traceStacks, traceFiles, traceFnNames } from '@mnrendra/stack-trace'

const caller1 = () => traceStacks()
const [stack] = caller1()
console.log(stack.getFileName()) // Output: file:///foo/project-name/src/index.mjs

const caller2 = () => traceFiles()
const [file] = caller2()
console.log(file) // Output: file:///foo/project-name/src/index.mjs

const caller3 = () => traceFnNames()
const [fnName] = caller3()
console.log(fnName) // Output: caller3
```

2. Call from your production module `/foo/project-name/node_modules/module-name/dist/index.js`:
```javascript
"use strict";

const { traceStacks, traceFiles, traceFnNames } = require('@mnrendra/stack-trace');

const caller1 = () => traceStacks();
const [stack] = caller1();
console.log(stack.getFileName()); // Output: /foo/project-name/node_modules/module-name/dist/index.js

const caller2 = () => traceFiles();
const [file] = caller2();
console.log(file); // Output: /foo/project-name/node_modules/module-name/dist/index.js

const caller3 = () => traceFnNames();
const [fnName] = caller3();
console.log(fnName); // Output: caller3
```

**Note**: When calling `getFileName` in an **ES Modules** module, the file name will be returned as a **URL** instead of a file path.

## Options
```javascript
import { traceStacks, traceFiles, traceFnNames } from '@mnrendra/stack-trace'

const options = {
  limit: 10 // The maximum number of stack frames to capture (default: 10).
}

const caller1 = () => traceStacks(
  caller1, // The option target function to be traced.
  options
)

const caller2 = () => traceFiles(
  caller2, // The option target function to be traced.
  options
)

const caller3 = () => traceFnNames(
  caller3, // The option target function to be traced.
  options
)
```

## Types
```typescript
import type {
  CallSite, // The alias of `NodeJS.CallSite`.
  Options, // The options object for `traceStacks`, `traceFiles`, or `traceFnNames`.
} from '@mnrendra/stack-trace'
```

## License
[MIT](https://github.com/mnrendra/stack-trace/blob/HEAD/LICENSE)

## Author
[@mnrendra](https://github.com/mnrendra)
