# @mnrendra/stack-trace

![version](https://img.shields.io/npm/v/@mnrendra/stack-trace)
![types](https://img.shields.io/npm/types/@mnrendra/stack-trace)
![license](https://img.shields.io/npm/l/@mnrendra/stack-trace)
![size](https://img.shields.io/npm/unpacked-size/@mnrendra/stack-trace)
![downloads](https://img.shields.io/npm/dm/@mnrendra/stack-trace)

A utility for tracing the caller's call sites starting from a specific callee.<br/>
*Useful for debugging, logging, or building tools that need to get the call origins or file locations at runtime.*

## Install
```bash
npm i @mnrendra/stack-trace
```

## API

### **`stackTrace`**
Traces the caller's call sites starting from a specific callee.<br/>
*Captures the current stack trace as an array of `NodeJS.CallSite` objects. If a callee is provided, the trace will start from the caller of the callee.*<br/>

#### **Type**:
```typescript
(callee?: ((...args: any) => any) | null, options?: Options) => NodeJS.CallSite[]
```

#### Parameters

| Name      | Type                              | Description                                                                                                                                                                                                      |
|-----------|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `callee`  | `((...args: any) => any) \| null` | Optional callee function or method to start tracing from. If `undefined` or `null`, tracing starts from the current caller.                                                                                      |
| `options` | `Options`                         | Configuration options for tracing behavior. By default, the `limit` option is set to `Infinity` to capture all frames. To capture only a specific number of frames, set the `limit` option to a positive number. |

#### **Return Type**:
```typescript
NodeJS.CallSite[]
```
An array of call sites representing the captured stack trace.

## Usage

### **CommonJS**

`/foo/callee.cjs`
```javascript
const { stackTrace } = require('@mnrendra/stack-trace')

const callee = () => {
  const [callSite1] = stackTrace()
  const [callSite2] = stackTrace(callee, { limit: 1 }) // set the `callee` function as the callee.

  console.log(callSite1.getFileName()) // output: /foo/callee.cjs
  console.log(callSite2.getFileName()) // output: /foo/caller.cjs

  console.log(callSite1.getFunctionName()) // output: callee
  console.log(callSite2.getFunctionName()) // output: caller
}

module.exports = callee
```
`/foo/caller.cjs`
```javascript
const callee = require('./callee.cjs')
const caller = () => callee()
caller()
```

### **ES Modules**

`/foo/callee.mjs`
```javascript
import { stackTrace } from '@mnrendra/stack-trace'

const callee = () => {
  const [callSite1] = stackTrace()
  const [callSite2] = stackTrace(callee, { limit: 1 }) // set the `callee` function as the callee.

  console.log(callSite1.getFileName()) // output: file:///foo/callee.mjs
  console.log(callSite2.getFileName()) // output: file:///foo/caller.mjs

  console.log(callSite1.getFunctionName()) // output: callee
  console.log(callSite2.getFunctionName()) // output: caller
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
- When calling `getFileName` in an **ES Modules**, the file name will be returned as a **file URL** (e.g., `'file:///foo'`) instead of a **file path** (e.g., `'/foo'`).<br/>
*You can use `url.fileURLToPath` to convert the **file URL** to a **file path**.*
- By default `stackTrace` will capture all caller frames.<br/>
*To capture only a specific number of frames, set the `limit` option to a positive number.*

### Examples
1. Call from your development project:<br/>
`/foo/project-name/src/index.mjs`:
```javascript
import { fileURLToPath } from 'node:url'
import { stackTrace } from '@mnrendra/stack-trace'

const caller = () => stackTrace()
const [stack] = caller()

const fileName = stack.getFileName()

console.log(fileName) // output: file:///foo/project-name/src/index.mjs
console.log(fileURLToPath(fileName)) // output: /foo/project-name/src/index.mjs
```

2. Call from your production package:<br/>
`/foo/consumer/node_modules/module-name/dist/index.js`:
```javascript
"use strict";

const { stackTrace } = require("@mnrendra/stack-trace");

const caller = () => stackTrace();
const [stack] = caller();

const fileName = stack.getFileName();

console.log(fileName); // output: /foo/consumer/node_modules/module-name/dist/index.js
```

## Options

### **`limit`**
#### **Type:** `number`
#### **Default:** `Infinity`

Specifies the number of stack frames to be collected by a stack trace.<br>
*The default value is `Infinity` but may be set to any valid JavaScript number. Changes will affect any stack trace captured after the value has been changed.*<br>
*If set to a non-number value, or set to a negative number, stack traces will not capture any frames.*

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
