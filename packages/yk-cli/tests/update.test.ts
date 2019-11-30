import { updateCli } from '../src/update'

jest.mock('../src/util/index', () => ({
  execWithPromise: jest.fn(() => Promise.resolve()),
  getWithPromise: jest.requireActual('../src/util').getWithPromise,
  resolveApp: jest.requireActual('../src/util').resolveApp
}))
jest.mock('ora')
jest.spyOn(process, 'exit').mockImplementation(() => {
  throw new Error('process exit')
})

jest.mock('../package.json', () => ({ version: '1.0.0' }))

const ora = require('ora')

test('hope update cli can be invoke', async () => {
  await updateCli()
  expect(ora).toBeCalled()
})
