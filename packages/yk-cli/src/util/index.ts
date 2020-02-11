import https from 'https'
import path from 'path'
import fs from 'fs'
import { promisify } from 'util'
import { exec } from 'child_process'
import { Optional } from '../interface/option'

const download = require('download-git-repo')
const jsUrl = 'https://registry.npm.taobao.org/ssr-with-js'
const tsUrl = 'https://registry.npm.taobao.org/ssr-with-ts'

const processError = (err: string) => {
  if (err) {
    console.log('err', err)
    process.exit()
  }
}

const execWithPromise = promisify(exec)

const downloadWithPromise = promisify(download)

const resolveApp = (source: string) => {
  // 以根目录为基准
  return path.resolve(__dirname, `../../${source}`)
}

const getWithPromise = (url: string, timeout?: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject('url request timeout:' + url)
    }, timeout || 5000)
    let data: string = ''
    https.get(url,res => {
      clearTimeout(timer)
      res.on('data', (chunk: Buffer) => { data += chunk.toString() })
      res.on('end', () => {
        resolve(JSON.parse(data))
      })
    }).on('error', (err) => {
      reject(err)
    })
  })
}

/**
 * http
 * 缓存判断是否有效处理
 * @export
 * @param {Optional} option
 * @returns {Promise<boolean>}
 */
async function getVersionEffective (option: Optional): Promise<boolean> {
  if (fs.existsSync(resolveApp('./cache'))) {
    const url = option.language === 'typescript' ? tsUrl : jsUrl
    const language = option.language === 'javascript' ? 'js' : 'ts'
    try {
      const { 'dist-tags': { latest } } = await getWithPromise(url)
      const localVersion = require(resolveApp(`./cache/example/ssr-with-${language}/package.json`)).version.trim()
      // 如果版本一样就不用更新
      return latest === localVersion
    } catch (error) {
      return true
    }
  }
  return false
}

export {
  getVersionEffective,
  processError,
  execWithPromise,
  downloadWithPromise,
  getWithPromise,
  resolveApp
}
