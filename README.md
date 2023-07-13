# @mnrendra/stack-trace
A utility that enables stack tracing of the `NodeJs.CallSite` object, allowing dynamic tracing of invocations.

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

## Types
```typescript
import type {
  CallSite, // NodeJS.CallSite
  StackTrace, // (targetFunction?: TargetFunction, options?: Options) => CallSite[]
  TargetFunction, // (...args: any[]) => any | Promise<TargetFunction>
  Options // { limit?: number }
} from '@mnrendra/stack-trace'
```

## License
[MIT](https://github.com/mnrendra/stack-trace/blob/HEAD/LICENSE)

## Author
[@mnrendra](https://github.com/mnrendra)
