import Shell from 'shelljs'
import axios from 'axios'
import fs from 'fs'
import { resolveDir,logGreen } from './utils'
import { ServerJs }from './interface/config'

const getServerBundle = async (cdn: string, path: string): Promise<ServerJs> => {
  logGreen(`get serverBundle from CDN file ${cdn}`)

  const res = await axios.get(cdn)
  const str = res.data
  Shell.mkdir(resolveDir('./.serverBundle'))
  fs.writeFileSync(path, str)
  const serverJs = require(path).default
  return serverJs
}

const getVersion = (str: string) => {
  const arr = /\d+(\.\d+)+/.exec(str)
  if (arr === null) {
    throw new Error(str)
  }
  return arr[0]
}

const useCdn = async (serverJs: string, isLocal: boolean): Promise<ServerJs> => {
  let serverJsPath: string = ''
  let SEVER_JS
  try {
    const version = getVersion(serverJs)
    serverJsPath = resolveDir(`./.serverBundle/server${version}.js`)
  } catch (error) {
    console.log('请检查cdn地址是否符合规范', error)
  }

  delete require.cache[serverJsPath]

  try {
    fs.statSync(serverJsPath)
    if (isLocal) {
      // 本地开发环境每次都从cdn拉取文件
      SEVER_JS = await getServerBundle(serverJs, serverJsPath)
    }
  } catch (error) {
    // 首次访问本地没有对应的serverJsPath的情况需要从cdn拉取文件
    SEVER_JS = await getServerBundle(serverJs, serverJsPath)
  }

  if (!isLocal) {
    // 正式环境直接require serverBundle
    logGreen(`get serverBundle from local file ${serverJsPath}`)
    SEVER_JS = require(serverJsPath).default
  }

  return SEVER_JS
}

export {
    useCdn
}
