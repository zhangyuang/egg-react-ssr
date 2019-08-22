jest.mock('fs')
import { updateCli } from '../../src/update'

const packageJson = require('../../package')
const fs = require('fs')
console.log('xx',updateCli)
test('test update cli', async () => {
  packageJson.version = '1.0.0'
  fs.writeFileSync('../../package.json', JSON.stringify(packageJson))
  // await updateCli()
})
