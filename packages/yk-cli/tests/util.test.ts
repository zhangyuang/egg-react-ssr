import shell from 'shelljs'
import { execSync } from 'child_process'
import { getWithPromise, getVersionEffective, resolveApp, renderTemplate } from '../src/util'

describe('test getWithPromise', () => {
  test('hope getWithPromise can get true result', async () => {
    const data = await getWithPromise('https://registry.npm.taobao.org/ssr-with-js')
    expect(data.name).toEqual('ssr-with-js')
  })
  test('hope timeout error can be invoke', async () => {
    // 请求超时应该报错
    try {
      await getWithPromise('https://registry.npm.taobao.org/ssr-with-js', 0)
    } catch (error) {
      expect(error).toContain('url request timeout')
    }
  })
})

describe('test getVersionEffective without cache', () => {
// 本地没有cache的情况应该返回false
  test('no cahe can return false', async () => {
    const data = await getVersionEffective({
      language: 'javascript'
    })
    expect(data).toEqual(false)
  })
})

describe('test getVersionEffective with cache', () => {
  beforeEach(() => {
    jest.resetModules() // 清空缓存
    shell.mkdir('-p', resolveApp('./cache/example/ssr-with-js'))
    shell.touch(resolveApp(`./cache/example/ssr-with-js/package.json`))
  })
  test('cahe expire can return false', async () => {
    execSync(`echo '{"version":"1.0.0"}' > ${resolveApp(`./cache/example/ssr-with-js/package.json`)}`)
    // 缓存过期应该返回false
    const data = await getVersionEffective({
      language: 'javascript'
    })
    expect(data).toEqual(false)
  })
  test('cahe not expire can return true', async () => {
    shell.touch(resolveApp(`./cache/example/ssr-with-js/package.json`))
    // 缓存没过期应该返回true
    const { 'dist-tags': { latest } } = await getWithPromise('https://registry.npm.taobao.org/ssr-with-js')
    execSync(`echo '{"version": "${latest}"}' > ${resolveApp(`./cache/example/ssr-with-js/package.json`)}`)
    const data = await getVersionEffective({
      language: 'javascript'
    })
    expect(data).toEqual(true)
  })
  afterEach(() => {
    shell.rm('-rf', resolveApp('./cache'))
  })
})

describe('test renderTemplate', () => {
  beforeAll(() => {
    shell.touch(resolveApp('./template.json.nj'))
    execSync(`echo {\\"appName\\": \\"{{appName}}\\" } > ${resolveApp('./template.json.nj')}`)
  })
  test('renderTemplate can generate the true file after rendering', () => {
    renderTemplate(resolveApp('./template.json.nj'), resolveApp('./template.json'), {
      appName: 'yk-cli',
      language: 'javascript'
    })
    const appName = require(resolveApp('./template.json')).appName
    expect(appName).toEqual('yk-cli')
  })
  afterAll(() => {
    shell.rm(resolveApp('./template.json.nj'))
    shell.rm(resolveApp('./template.json'))
  })
})
