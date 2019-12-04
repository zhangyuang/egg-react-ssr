import shell from 'shelljs'
import fs from 'fs'
import { checkRepeat } from '../src/check'

jest.mock('inquirer', () => ({
  prompt: jest.fn(() => Promise.resolve({
    delete: true
  }))
}))
jest.spyOn(console, 'log')

const inquirer = require('inquirer')
beforeAll(() => {
  shell.mkdir('./app')
})

test('hope checkRepeat can be invoke', async () => {
  await checkRepeat({
    appName: 'app',
    language: 'javascript'
  })
  expect(inquirer.prompt).toBeCalled()
  fs.stat('./app', err => {
    expect(err).not.toBe(undefined)
  })
})

afterAll(() => {
  shell.rm('-rf', './app')
})
