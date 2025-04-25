# @mnrendra/stack-trace

![version](https://img.shields.io/npm/v/@mnrendra/stack-trace)
![types](https://img.shields.io/npm/types/@mnrendra/stack-trace)
![size](https://img.shields.io/npm/unpacked-size/@mnrendra/stack-trace)
![downloads](https://img.shields.io/npm/dm/@mnrendra/stack-trace)
![license](https://img.shields.io/npm/l/@mnrendra/stack-trace)

A lightweight [stack trace](https://v8.dev/docs/stack-trace-api) utility to retrieve `CallSite` objects from a specific caller.<br/>
*Useful for debugging, logging, or building tools that need to trace call origins at runtime.*

## Install
```bash
npm i @mnrendra/stack-trace
```

## API Reference

### `stackTrace`
Captures [v8 stack trace](https://v8.dev/docs/stack-trace-api) from a specific caller.

#### Type
```typescript
(callee?: ((...args: any) => any) | null, options?: Options) => NodeJS.CallSite[]
```

#### Parameters
| Name      | Type                              | Description                                                                                                                                                                                                          |
|-----------|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `callee`  | `((...args: any) => any) \| null` | Optional callee function to specify the caller. If `undefined` or `null`, tracing starts from the current caller.                                                                                                    |
| `options` | `Options`                         | Optional options to affect the captured frames. By default, the `limit` option is set to `Infinity` to capture all frames. To capture only a specific number of frames, set the `limit` option to a positive number. |

#### Return
```typescript
NodeJS.CallSite[]
```
Array of `CallSite` objects representing the captured stack trace frames.

#### Options
| Name    | Type     | Default    | Description                                                                                                                                                                                                                                                                                                                                |
|---------|----------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `limit` | `number` | `Infinity` | Specifies the number of stack frames to be collected by a stack trace. The default value is `Infinity`, but may be set to any valid JavaScript number. Changes will affect any stack trace captured after the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

### `getCallerSite`
Gets the caller's `CallSite` object captured from [`stackTrace`](#stacktrace).

#### Type
```typescript
(callee?: ((...args: any) => any) | null) => NodeJS.CallSite
```

#### Parameters
| Name      | Type                              | Description                                                                                                       |
|-----------|-----------------------------------|-------------------------------------------------------------------------------------------------------------------|
| `callee`  | `((...args: any) => any) \| null` | Optional callee function to specify the caller. If `undefined` or `null`, tracing starts from the current caller. |

#### Return
```typescript
NodeJS.CallSite
```
First `CallSite` object captured in the stack trace.

### `extractFilePath`
Extracts the file name from a `CallSite` object and converts it to a file path if the value is a file URL.<br/>
*This utility ensures that the returned value is an absolute path.*

#### Type
```typescript
(callSite: NodeJS.CallSite) => string
```

#### Parameters
| Name        | Type              | Description                                                  |
|-------------|-------------------|--------------------------------------------------------------|
| `callSite`  | `NodeJS.CallSite` | `CallSite` object captured from [`stackTrace`](#stacktrace). |

#### Return
```typescript
string
```
Absolute path of the file name extracted from a `CallSite` object.

#### Throws
If the extracted file name is not a string or not absolute.

### `getCallerFile`
Gets the caller's file extracted from the result of [`getCallerSite`](#getcallersite) and ensures it returns an absolute path using [`extractFilePath`](#extractfilepath).

#### Type
```typescript
(callee?: ((...args: any) => any) | null) => string
```

#### Parameters
| Name      | Type                              | Description                                                                                                       |
|-----------|-----------------------------------|-------------------------------------------------------------------------------------------------------------------|
| `callee`  | `((...args: any) => any) \| null` | Optional callee function to specify the caller. If `undefined` or `null`, tracing starts from the current caller. |

#### Return
```typescript
string
```
Absolute path of the caller's file.

#### Throws
If the extracted file name is not a string or not absolute.

### `getCallerDir`
Gets the caller's directory extracted from the result of [`getCallerFile`](#getcallerfile).

#### Type
```typescript
(callee?: ((...args: any) => any) | null) => string
```

#### Parameters
| Name      | Type                              | Description                                                                                                       |
|-----------|-----------------------------------|-------------------------------------------------------------------------------------------------------------------|
| `callee`  | `((...args: any) => any) \| null` | Optional callee function to specify the caller. If `undefined` or `null`, tracing starts from the current caller. |

#### Return
```typescript
string
```
Absolute path of the caller's directory.

#### Throws
If the extracted file name is not a string or not absolute.

## Usage

### CommonJS
`/foo/callee.cjs`
```javascript
const { dirname } = require('node:path')

const {
  stackTrace,
  getCallerSite,
  extractFilePath,
  getCallerFile,
  getCallerDir
} = require('@mnrendra/stack-trace')

const callee = () => {
  // `stackTrace`:
  const [callSite1] = stackTrace()
  const [callSite2] = stackTrace(callee, { limit: 1 }) // Pass the `callee` function as the callee.

  console.log(callSite1.getFileName()) // Output: /foo/callee.cjs
  console.log(callSite2.getFileName()) // Output: /foo/caller.cjs

  console.log(callSite1.getFunctionName()) // Output: callee
  console.log(callSite2.getFunctionName()) // Output: caller

  // `getCallerSite`:
  const callerSite1 = getCallerSite()
  const callerSite2 = getCallerSite(callee) // Pass the `callee` function as the callee.

  console.log(callerSite1.getFileName() === callSite1.getFileName()) // Output: true
  console.log(callerSite2.getFileName() === callSite2.getFileName()) // Output: true

  console.log(callerSite1.getFileName()) // Output: /foo/callee.cjs
  console.log(callerSite2.getFileName()) // Output: /foo/caller.cjs

  console.log(callerSite1.getFunctionName() === callSite1.getFunctionName()) // Output: true
  console.log(callerSite2.getFunctionName() === callSite2.getFunctionName()) // Output: true

  console.log(callerSite1.getFunctionName()) // Output: callee
  console.log(callerSite2.getFunctionName()) // Output: caller

  // `extractFilePath`:
  const filePath1 = extractFilePath(callerSite1)
  const filePath2 = extractFilePath(callerSite2)

  console.log(filePath1) // Output: /foo/callee.cjs
  console.log(filePath2) // Output: /foo/caller.cjs

  // `getCallerFile`:
  const callerFile1 = getCallerFile()
  const callerFile2 = getCallerFile(callee) // Pass the `callee` function as the callee.

  console.log(callerFile1 === filePath1) // Output: true
  console.log(callerFile2 === filePath2) // Output: true

  console.log(callerFile1) // Output: /foo/callee.cjs
  console.log(callerFile2) // Output: /foo/caller.cjs

  // `getCallerDir`:
  const callerDir1 = getCallerDir()
  const callerDir2 = getCallerDir(callee) // Pass the `callee` function as the callee.

  console.log(callerDir1 === dirname(filePath1)) // Output: true
  console.log(callerDir2 === dirname(filePath2)) // Output: true

  console.log(callerDir1) // Output: /foo
  console.log(callerDir2) // Output: /foo
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
import { dirname } from 'node:path'

import {
  stackTrace,
  getCallerSite,
  extractFilePath,
  getCallerFile,
  getCallerDir
} from '@mnrendra/stack-trace'

const callee = () => {
  // `stackTrace`:
  const [callSite1] = stackTrace()
  const [callSite2] = stackTrace(callee, { limit: 1 }) // Pass the `callee` function as the callee.

  console.log(callSite1.getFileName()) // Output: file:///foo/callee.mjs
  console.log(callSite2.getFileName()) // Output: file:///foo/caller.mjs

  console.log(callSite1.getFunctionName()) // Output: callee
  console.log(callSite2.getFunctionName()) // Output: caller

  // `getCallerSite`:
  const callerSite1 = getCallerSite()
  const callerSite2 = getCallerSite(callee) // Pass the `callee` function as the callee.

  console.log(callerSite1.getFileName() === callSite1.getFileName()) // Output: true
  console.log(callerSite2.getFileName() === callSite2.getFileName()) // Output: true

  console.log(callerSite1.getFileName()) // Output: file:///foo/callee.mjs
  console.log(callerSite2.getFileName()) // Output: file:///foo/caller.mjs

  console.log(callerSite1.getFunctionName() === callSite1.getFunctionName()) // Output: true
  console.log(callerSite2.getFunctionName() === callSite2.getFunctionName()) // Output: true

  console.log(callerSite1.getFunctionName()) // Output: callee
  console.log(callerSite2.getFunctionName()) // Output: caller

  // `extractFilePath`:
  const filePath1 = extractFilePath(callerSite1)
  const filePath2 = extractFilePath(callerSite2)

  console.log(filePath1) // Output: /foo/callee.mjs
  console.log(filePath2) // Output: /foo/caller.mjs

  // `getCallerFile`:
  const callerFile1 = getCallerFile()
  const callerFile2 = getCallerFile(callee) // Pass the `callee` function as the callee.

  console.log(callerFile1 === filePath1) // Output: true
  console.log(callerFile2 === filePath2) // Output: true

  console.log(callerFile1) // Output: /foo/callee.mjs
  console.log(callerFile2) // Output: /foo/caller.mjs

  // `getCallerDir`:
  const callerDir1 = getCallerDir()
  const callerDir2 = getCallerDir(callee) // Pass the `callee` function as the callee.

  console.log(callerDir1 === dirname(filePath1)) // Output: true
  console.log(callerDir2 === dirname(filePath2)) // Output: true

  console.log(callerDir1) // Output: /foo
  console.log(callerDir2) // Output: /foo
}

export default callee
```

`/foo/caller.mjs`
```javascript
import callee from './callee.mjs'
const caller = () => callee()
caller()
```

> **Note**:
>
> - In ES Modules, `getFileName` returns a **file URL** (e.g., `file:///foo`), instead of a **file path** (`/foo`).<br/>
> *To convert it to a file path, use either `url.fileURLToPath` or the `extractFilePath` utility.*
>
> - By default `stackTrace` will capture all caller's frames.<br/>
> *To capture only a specific number of frames, set the `limit` option to a positive number.*

### Examples

1. **Call from a development project**

`/foo/project-name/src/index.mjs`:
```javascript
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  stackTrace,
  getCallerSite,
  extractFilePath,
  getCallerFile,
  getCallerDir
} from '@mnrendra/stack-trace'

// `stackTrace`:
const caller1 = () => stackTrace()
const [callSite] = caller1()
const fileName = callSite.getFileName()
console.log(fileName) // Output: file:///foo/project-name/src/index.mjs
console.log(fileURLToPath(fileName)) // Output: /foo/project-name/src/index.mjs

// `getCallerSite`:
const caller2 = () => getCallerSite()
const callerSite = caller2()
const callerFileName = callerSite.getFileName()
console.log(callerFileName === fileName) // Output: true
console.log(callerFileName) // Output: file:///foo/project-name/src/index.mjs
console.log(fileURLToPath(callerFileName)) // Output: /foo/project-name/src/index.mjs

// `extractFilePath`:
const filePath = extractFilePath(callerSite)
console.log(filePath === fileURLToPath(callerFileName)) // Output: true
console.log(filePath) // Output: /foo/project-name/src/index.mjs

// `getCallerFile`:
const caller3 = () => getCallerFile()
const callerFile = caller3()
console.log(callerFile === filePath) // Output: true
console.log(callerFile) // Output: /foo/project-name/src/index.mjs

// `getCallerDir`:
const caller4 = () => getCallerDir()
const callerDir = caller4()
console.log(callerDir === dirname(filePath)) // Output: true
console.log(callerDir) // Output: /foo/project-name/src
```

2. **Call from a production package**

`/foo/consumer/node_modules/module-name/dist/index.cjs`:
```javascript
"use strict";

const { dirname } = require("node:path");

const {
  stackTrace,
  getCallerSite,
  extractFilePath,
  getCallerFile,
  getCallerDir
} = require("@mnrendra/stack-trace");

// `stackTrace`:
const caller1 = () => stackTrace();
const [callSite] = caller1();
const fileName = callSite.getFileName();
console.log(fileName); // Output: /foo/consumer/node_modules/module-name/dist/index.cjs

// `getCallerSite`:
const caller2 = () => getCallerSite();
const callerSite = caller2();
const callerFileName = callerSite.getFileName();
console.log(callerFileName === fileName); // Output: true
console.log(callerFileName); // Output: /foo/consumer/node_modules/module-name/dist/index.cjs

// `extractFilePath`:
const filePath = extractFilePath(callerSite);
console.log(filePath === callerFileName); // Output: true
console.log(filePath); // Output: /foo/consumer/node_modules/module-name/dist/index.cjs

// `getCallerFile`:
const caller3 = () => getCallerFile()
const callerFile = caller3()
console.log(callerFile === filePath) // Output: true
console.log(callerFile) // Output: /foo/consumer/node_modules/module-name/dist/index.cjs

// `getCallerDir`:
const caller4 = () => getCallerDir();
const callerDir = caller4();
console.log(callerDir === dirname(filePath)); // Output: true
console.log(callerDir); // Output: /foo/consumer/node_modules/module-name/dist
```

## Types

### `Options`
[`stackTrace`](#stacktrace)'s [options](#options) interface.

```typescript
import {
  type Options,
  stackTrace
} from '@mnrendra/stack-trace'

const options: Options = {
  limit: 1
}

const caller = (): NodeJS.CallSite[] => stackTrace(caller, options)
const callSites = caller()
console.log(callSites.length) // Output: 1
```

## License
[MIT](https://github.com/mnrendra/stack-trace/blob/HEAD/LICENSE)

## Author
[@mnrendra](https://github.com/mnrendra)
