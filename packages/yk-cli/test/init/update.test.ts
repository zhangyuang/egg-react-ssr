jest.mock('fs')

import { updateCli } from '../../src/update'

const packageJson = require('../../package')
const fs = require('fs')
const MOCK_FILE_INFO = {
  '../../package.json': '{version: 1.0.0}'
}
beforeEach(() => {
  fs.__setMockFiles(MOCK_FILE_INFO)
})
test('test update cli', async () => {
  const text = fs.readFileSync('../../package.json')
  console.log(text)
  // fs.writeFileSync('../../package.json', JSON.stringify(packageJson))
  // const std = await updateCli()
})
