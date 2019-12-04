import shell from 'shelljs'
import fs from 'fs'
import { cacheMange } from '../src/cache'
import { resolveApp } from '../src/util'

jest.mock('../src/util/index', () => ({
  getWithPromise: jest.requireActual('../src/util').getWithPromise,
  resolveApp: jest.requireActual('../src/util').resolveApp,
  getVersionEffective: jest.requireActual('../src/util').getVersionEffective,
  downloadWithPromise: jest.fn(() => {
    shell.mkdir('-p', resolveApp(`./cache/example/ssr-with-javascript`))
    shell.touch(resolveApp(`./cache/example/ssr-with-javascript/package.json`))
  })
}))

jest.mock('inquirer', () => ({
  prompt: jest.fn(() => Promise.resolve({
    delete: true
  }))
}))

beforeAll(() => {
  shell.mkdir('./app')
})

test('hope checkRepeat can be invoke', async () => {
  await cacheMange({
    appName: 'app',
    language: 'javascript'
  })
  fs.stat('./app', err => {
    expect(err).toBe(null)
  })
})

afterAll(() => {
  shell.rm('-rf', '../cache')
})
