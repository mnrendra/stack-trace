import { METHODS } from '@tests/consts'

const testMethods = (
  callSite: NodeJS.CallSite
): void => {
  METHODS.forEach((method) => {
    expect(callSite[method]).toEqual(expect.any(Function))
  })
}

export default testMethods
