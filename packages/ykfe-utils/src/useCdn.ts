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

const useCdn = async (serverJs: string, isLocal: boolean, filename: string): Promise<ServerJs> => {
  const serverJsPath: string = resolveDir(`./.serverBundle/${filename}.js`)
  let SEVER_JS

  if (isLocal) {
    delete require.cache[serverJsPath]
  }

  if (fs.existsSync(serverJsPath)) {
    if (isLocal) {
     // 本地开发环境每次都从cdn拉取文件
      SEVER_JS = await getServerBundle(serverJs, serverJsPath)
    }
  } else {
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
