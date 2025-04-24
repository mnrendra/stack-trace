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

## API Reference

### `stackTrace`
Traces the caller's call sites, starting after a specific callee.<br/>
*Captures the current stack trace as an array of `NodeJS.CallSite`. If a callee is provided, the trace start from the caller of the callee.*

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
| Name    | Type     | Default    | Description                                                                                                                                                                                                                                                                                                                                |
|---------|----------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `limit` | `number` | `Infinity` | Specifies the number of stack frames to be collected by a stack trace. The default value is `Infinity`, but may be set to any valid JavaScript number. Changes will affect any stack trace captured after the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

### `getCallerSite`
Gets the caller's call site, starting after a specific callee.<br/>
*Returns the first call site from the current stack trace as a `NodeJS.CallSite`. If a callee is provided, the trace start from the caller of the callee.*

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

### `extractFilePath`
Extracts the file name from a call site and converts it to a file path if the value is a file URL.<br/>
*This utility ensures that the returned path is always absolute.*

#### Type
```typescript
(callSite: NodeJS.CallSite) => string
```

#### Parameters
| Name        | Type              | Description                                               |
|-------------|-------------------|-----------------------------------------------------------|
| `callSite`  | `NodeJS.CallSite` | A `NodeJS.CallSite` object captured from the stack trace. |

#### Return
```typescript
string
```
The absolute path of the file name associated with the call site.

### `getCallerFile`
Gets the caller's file path, starting after a specific callee.<br/>
*Returns the extracted file path from the first call site in the current stack trace. If a callee is provided, the trace start from the caller of the callee.*

#### Type
```typescript
(callee?: ((...args: any) => any) | null) => string
```

#### Parameters
| Name      | Type                              | Description                                                                                                                  |
|-----------|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `callee`  | `((...args: any) => any) \| null` | Optional callee function or method to start tracing after. If `undefined` or `null`, tracing starts from the current caller. |

#### Return
```typescript
string
```
A `string` representing the file path from the first call site in the captured stack trace.

## Usage

### CommonJS
`/foo/callee.cjs`
```javascript
const {
  stackTrace,
  getCallerSite,
  extractFilePath,
  getCallerFile
} = require('@mnrendra/stack-trace')

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

  console.log(callerSite1.getFileName() === callSite1.getFileName()) // Output: true
  console.log(callerSite2.getFileName() === callSite2.getFileName()) // Output: true

  console.log(callerSite1.getFileName()) // Output: /foo/callee.cjs
  console.log(callerSite2.getFileName()) // Output: /foo/caller.cjs

  console.log(callerSite1.getFunctionName() === callSite1.getFunctionName()) // Output: true
  console.log(callerSite2.getFunctionName() === callSite2.getFunctionName()) // Output: true

  console.log(callerSite1.getFunctionName()) // Output: callee
  console.log(callerSite2.getFunctionName()) // Output: caller

  // extractFilePath:
  const filePath1 = extractFilePath(callerSite1)
  const filePath2 = extractFilePath(callerSite2)

  console.log(filePath1) // Output: /foo/callee.cjs
  console.log(filePath2) // Output: /foo/caller.cjs

  // getCallerFile:
  const callerFile1 = getCallerFile()
  const callerFile2 = getCallerFile(callee) // set the `callee` function as the callee.

  console.log(callerFile1 === filePath1) // Output: true
  console.log(callerFile2 === filePath2) // Output: true

  console.log(callerFile1) // Output: /foo/callee.cjs
  console.log(callerFile2) // Output: /foo/caller.cjs
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
import {
  stackTrace,
  getCallerSite,
  extractFilePath,
  getCallerFile
} from '@mnrendra/stack-trace'

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

  console.log(callerSite1.getFileName() === callSite1.getFileName()) // Output: true
  console.log(callerSite2.getFileName() === callSite2.getFileName()) // Output: true

  console.log(callerSite1.getFileName()) // Output: file:///foo/callee.mjs
  console.log(callerSite2.getFileName()) // Output: file:///foo/caller.mjs

  console.log(callerSite1.getFunctionName() === callSite1.getFunctionName()) // Output: true
  console.log(callerSite2.getFunctionName() === callSite2.getFunctionName()) // Output: true

  console.log(callerSite1.getFunctionName()) // Output: callee
  console.log(callerSite2.getFunctionName()) // Output: caller

  // extractFilePath:
  const filePath1 = extractFilePath(callerSite1)
  const filePath2 = extractFilePath(callerSite2)

  console.log(filePath1) // Output: /foo/callee.mjs
  console.log(filePath2) // Output: /foo/caller.mjs

  // getCallerFile:
  const callerFile1 = getCallerFile()
  const callerFile2 = getCallerFile(callee) // set the `callee` function as the callee.

  console.log(callerFile1 === filePath1) // Output: true
  console.log(callerFile2 === filePath2) // Output: true

  console.log(callerFile1) // Output: /foo/callee.mjs
  console.log(callerFile2) // Output: /foo/caller.mjs
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
*To convert it, use either `url.fileURLToPath` or the `extractFilePath` utility.*
- By default `stackTrace` will capture all caller frames.<br/>
*To capture only a specific number of frames, set the `limit` option to a positive number.*

### Examples

1. **Call from a development project**

`/foo/project-name/src/index.mjs`:
```javascript
import { fileURLToPath } from 'node:url'

import {
  stackTrace,
  getCallerSite,
  extractFilePath,
  getCallerFile
} from '@mnrendra/stack-trace'

// stackTrace:
const caller1 = () => stackTrace()
const [callSite] = caller1()
const fileName = callSite.getFileName()
console.log(fileName) // Output: file:///foo/project-name/src/index.mjs
console.log(fileURLToPath(fileName)) // Output: /foo/project-name/src/index.mjs

// getCallerSite:
const caller2 = () => getCallerSite()
const callerSite = caller2()
const callerFileName = callerSite.getFileName()
console.log(callerFileName === fileName) // Output: true
console.log(callerFileName) // Output: file:///foo/project-name/src/index.mjs
console.log(fileURLToPath(callerFileName)) // Output: /foo/project-name/src/index.mjs

// extractFilePath:
const filePath = extractFilePath(callerSite)
console.log(filePath === fileURLToPath(callerFileName)) // Output: true
console.log(filePath) // Output: /foo/project-name/src/index.mjs

// getCallerFile:
const caller3 = () => getCallerFile()
const callerFile = caller3()
console.log(callerFile === filePath) // Output: true
console.log(callerFile) // Output: /foo/project-name/src/index.mjs
```

2. **Call from a production package**

`/foo/consumer/node_modules/module-name/dist/index.cjs`:
```javascript
"use strict";

const {
  stackTrace,
  getCallerSite,
  extractFilePath,
  getCallerFile
} = require("@mnrendra/stack-trace");

// stackTrace:
const caller1 = () => stackTrace();
const [callSite] = caller1();
const fileName = callSite.getFileName();
console.log(fileName); // Output: /foo/consumer/node_modules/module-name/dist/index.cjs

// getCallerSite:
const caller2 = () => getCallerSite();
const callerSite = caller2();
const callerFileName = callerSite.getFileName();
console.log(callerFileName === fileName); // Output: true
console.log(callerFileName); // Output: /foo/consumer/node_modules/module-name/dist/index.cjs

// extractFilePath:
const filePath = extractFilePath(callerSite);
console.log(filePath === callerFileName); // Output: true
console.log(filePath); // Output: /foo/consumer/node_modules/module-name/dist/index.cjs

// getCallerFile:
const caller3 = () => getCallerFile()
const callerFile = caller3()
console.log(callerFile === filePath) // Output: true
console.log(callerFile) // Output: /foo/consumer/node_modules/module-name/dist/index.cjs
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
