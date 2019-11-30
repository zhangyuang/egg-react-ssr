import { getWithPromise, resolveApp } from '../src/util'
import { updateCli } from '../src/update'

jest.mock('../src/util/index', () => ({
  execWithPromise: jest.fn(() => Promise.resolve()),
  getWithPromise,
  resolveApp
}))

jest.mock('../package.json', () => ({ version: '1.0.0' }))
jest.spyOn(process, 'exit').mockImplementation(() => {
  throw new Error('process exit')
})

const ora = jest.mock('ora')

test('hope update cli can be invoke', async () => {
  await updateCli()
  expect(ora).toBeCalled()
})
