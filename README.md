# @mnrendra/stack-trace

![version](https://img.shields.io/npm/v/@mnrendra/stack-trace)
![types](https://img.shields.io/npm/types/@mnrendra/stack-trace)
![license](https://img.shields.io/npm/l/@mnrendra/stack-trace)
![size](https://img.shields.io/npm/unpacked-size/@mnrendra/stack-trace)
![downloads](https://img.shields.io/npm/dm/@mnrendra/stack-trace)

A utility for tracing the caller's call sites, starting after a specific callee.<br/>
*Useful for debugging, logging, or building tools that need to get the call origin details at runtime.*

## Install
```bash
npm i @mnrendra/stack-trace
```

## API

### • `stackTrace`
Traces the caller's call sites, starting after a specific callee.<br/>
*Captures the current stack trace as an array of `NodeJS.CallSite`. If a callee is provided, the trace will start from the caller of the callee.*

#### Type
```typescript
(callee?: ((...args: any) => any) | null, options?: Options) => NodeJS.CallSite[]
```

#### Parameters
| Name      | Type                              | Description                                                                                                                                                                                                      |
|-----------|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `callee`  | `((...args: any) => any) \| null` | Optional callee function or method to start tracing after. If `undefined` or `null`, tracing starts from the current caller.                                                                                     |
| `options` | `Options`                         | Configuration options for tracing behavior. By default, the `limit` option is set to `Infinity` to capture all frames. To capture only a specific number of frames, set the `limit` option to a positive number. |

#### Return
```typescript
NodeJS.CallSite[]
```
An array of `NodeJS.CallSite` representing the captured stack trace.

#### Options
| Name    | Type     | Default    | Description                                                                                                                                                                                                                                                                                                                               |
|---------|----------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `limit` | `number` | `Infinity` | Specifies the number of stack frames to be collected by a stack trace. The default value is `Infinity` but may be set to any valid JavaScript number. Changes will affect any stack trace captured after the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

### • `getCallerSite`
Gets the caller's call site, starting after a specific callee.<br/>
*Returns the first call site from the current stack trace as a `NodeJS.CallSite`. If a callee is provided, the trace will start from the caller of the callee.*

#### Type
```typescript
(callee?: ((...args: any) => any) | null) => NodeJS.CallSite
```

#### Parameters
| Name      | Type                              | Description                                                                                                                  |
|-----------|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `callee`  | `((...args: any) => any) \| null` | Optional callee function or method to start tracing after. If `undefined` or `null`, tracing starts from the current caller. |

#### Return
```typescript
NodeJS.CallSite
```
A `NodeJS.CallSite` representing the first call site from the captured stack trace.

## Usage

### CommonJS
`/foo/callee.cjs`
```javascript
const { stackTrace, getCallerSite } = require('@mnrendra/stack-trace')

const callee = () => {
  // stackTrace:
  const [callSite1] = stackTrace()
  const [callSite2] = stackTrace(callee, { limit: 1 }) // set the `callee` function as the callee.

  console.log(callSite1.getFileName()) // Output: /foo/callee.cjs
  console.log(callSite2.getFileName()) // Output: /foo/caller.cjs

  console.log(callSite1.getFunctionName()) // Output: callee
  console.log(callSite2.getFunctionName()) // Output: caller

  // getCallerSite:
  const callerSite1 = getCallerSite()
  const callerSite2 = getCallerSite(callee) // set the `callee` function as the callee.

  console.log(callerSite1.getFileName()) // Output: /foo/callee.cjs
  console.log(callerSite2.getFileName()) // Output: /foo/caller.cjs

  console.log(callerSite1.getFunctionName()) // Output: callee
  console.log(callerSite2.getFunctionName()) // Output: caller
}

module.exports = callee
```

`/foo/caller.cjs`
```javascript
const callee = require('./callee.cjs')
const caller = () => callee()
caller()
```

### ES Modules
`/foo/callee.mjs`
```javascript
import { stackTrace, getCallerSite } from '@mnrendra/stack-trace'

const callee = () => {
  // stackTrace:
  const [callSite1] = stackTrace()
  const [callSite2] = stackTrace(callee, { limit: 1 }) // set the `callee` function as the callee.

  console.log(callSite1.getFileName()) // Output: file:///foo/callee.mjs
  console.log(callSite2.getFileName()) // Output: file:///foo/caller.mjs

  console.log(callSite1.getFunctionName()) // Output: callee
  console.log(callSite2.getFunctionName()) // Output: caller

  // getCallerSite:
  const callerSite1 = getCallerSite()
  const callerSite2 = getCallerSite(callee) // set the `callee` function as the callee.

  console.log(callerSite1.getFileName()) // Output: file:///foo/callee.mjs
  console.log(callerSite2.getFileName()) // Output: file:///foo/caller.mjs

  console.log(callerSite1.getFunctionName()) // Output: callee
  console.log(callerSite2.getFunctionName()) // Output: caller
}

export default callee
```

`/foo/caller.mjs`
```javascript
import callee from './callee.mjs'
const caller = () => callee()
caller()
```

**Note**:
- In ES Modules, `getFileName` returns a **file URL** (e.g., `file:///foo`), instead of a **file path** (`/foo`).<br/>
*Use `url.fileURLToPath` to convert it if needed.*
- By default `stackTrace` will capture all caller frames.<br/>
*To capture only a specific number of frames, set the `limit` option to a positive number.*

### Examples

1. **Call from your development project**

`/foo/project-name/src/index.mjs`:
```javascript
import { fileURLToPath } from 'node:url'
import { stackTrace, getCallerSite } from '@mnrendra/stack-trace'

// stackTrace:
const caller1 = () => stackTrace()
const [callSite] = caller1()

const fileName = callSite.getFileName()

console.log(fileName) // Output: file:///foo/project-name/src/index.mjs
console.log(fileURLToPath(fileName)) // Output: /foo/project-name/src/index.mjs

// getCallerSite:
const caller2 = () => getCallerSite()
const callerSite = caller2()

const fileName = callerSite.getFileName()

console.log(fileName) // Output: file:///foo/project-name/src/index.mjs
console.log(fileURLToPath(fileName)) // Output: /foo/project-name/src/index.mjs
```

2. **Call from your production package**

`/foo/consumer/node_modules/module-name/dist/index.js`:
```javascript
"use strict";

const { stackTrace, getCallerSite } = require("@mnrendra/stack-trace");

// stackTrace:
const caller1 = () => stackTrace();
const [callSite] = caller1();

const fileName = callSite.getFileName();

console.log(fileName); // Output: /foo/consumer/node_modules/module-name/dist/index.js

// getCallerSite:
const caller2 = () => getCallerSite();
const callerSite = caller2();

const fileName = callerSite.getFileName();

console.log(fileName); // Output: /foo/consumer/node_modules/module-name/dist/index.js
```

## Types
```typescript
import type {
  Options
} from '@mnrendra/stack-trace'
```

## License
[MIT](https://github.com/mnrendra/stack-trace/blob/HEAD/LICENSE)

## Author
[@mnrendra](https://github.com/mnrendra)
