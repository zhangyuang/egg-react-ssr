import { updateCli } from '../src/update'

jest.mock('../src/util/index', () => ({
  execWithPromise: jest.fn(() => Promise.resolve({
    stdout: 'stdout'
  })),
  getWithPromise: jest.requireActual('../src/util').getWithPromise,
  resolveApp: jest.requireActual('../src/util').resolveApp
}))
jest.mock('ora')

console.log = jest.fn()

jest.spyOn(process, 'exit').mockImplementation(() => {
  throw new Error('process exit')
})

jest.mock('../package.json', () => ({ version: '1.0.0' }))

const spinner = require('ora')

test('hope update cli can be invoke', async () => {
  await updateCli()
  expect(spinner.start).toBeCalled()
  expect(spinner.succeed).toBeCalled()
})
