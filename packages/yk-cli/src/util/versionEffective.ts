import { config } from './fileconfig'
import { Optional } from '../interface/option'
import { versionCompare, deletecache } from './versionCompare'
import https from 'https'

/**
 * http
 * 缓存判断是否有效处理
 * @export
 * @param {Optional} option
 * @returns {Promise<boolean>}
 */
export async function getVersionEffective (option: Optional): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    let url = option.language === 'typescript' ? config.ts_url : config.js_url
    let content: string = ''
    let packagejson = null
    https.get(url, (res) => {
      res.on('data', (buffer: Buffer) => {
        content = content + buffer.toString()
      })
      res.on('error', async (err) => {
        console.log('请求版本文件时发生错误', err)
        await deletecache(option.language!)
        resolve(false)
      })
      res.on('end', async () => {
        if (content !== '') {
          try {
            packagejson = JSON.parse(content!)
            const version = packagejson.version
            const result = versionCompare(option.language!, version)
            if (!result) {
              await deletecache(option.language!)
            }
            resolve(result)
          } catch (ex) {
            await deletecache(option.language!)
            resolve(false)
          }
        } else {
          await deletecache(option.language!)
          resolve(false)
        }
      })
    })
  })
}
