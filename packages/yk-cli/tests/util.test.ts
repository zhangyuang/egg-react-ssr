import { getWithPromise } from '../src/util'

describe('test getWithPromise', () => {
  test('hope getWithPromise can get true result', async () => {
    const data = await getWithPromise('https://registry.npm.taobao.org/ssr-with-js')
    expect(data.name).toEqual('ssr-with-js')
  })
  test('hope timeout error can be invoke', async () => {
    try {
      await getWithPromise('https://registry.npm.taobao.org/ssr-with-js', 0)
    } catch (error) {
      expect(error).toContain('url request timeout')
    }
  })
})
