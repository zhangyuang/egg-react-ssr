jest.mock('ora')
jest.mock('../package.json', () => ({ version: '1.0.0' }))

const ora = require('ora')
const { updateCli } = require('../src/update')

test('hope update cli can be invoke', async () => {
  await updateCli()
  expect(ora).toBeCalled()
})
