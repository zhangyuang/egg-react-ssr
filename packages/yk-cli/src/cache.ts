import { getVersionEffective } from './util/versionEffective'
import { Optional } from './interface/option'
import { versionlog } from './util/versionCompare'
import { config } from './util/fileconfig'
import { spawn } from 'child_process'
import path from 'path'

const download = require('download-git-repo')

/**
 * 缓存管理
 *
 * @export
 * @param {Optional} option 应用全局配置
 * @returns {Promise<void>}
 */
export function cacheMange (option: Optional): Promise<void> {

  return getVersionEffective(option)
        .then((value) => new Promise<void>((resolve, reject) => {
          console.log('xxx',value)
            /** 如果版本不一致 则直接更新缓存 */
          if (!value) {
            download(`https://github.com/ykfe/egg-react-ssr.git`, path.resolve(__dirname, '../cache'), (err: any) => {
              if (!err) {
                const packagejsonPath = path.resolve(__dirname, `../cache/example/ssr-with-${option.language === 'javascript' ? 'js' : 'ts'}/package.json`)
                const version = require(packagejsonPath).version
                versionlog(option.language!, version)
                resolve()
              } else {
                console.log('download failed')
                console.log(err)
                reject()
              }
            })
          } else {
            resolve()
          }
        })).then(() => new Promise<void>((resolve, reject) => {
            /** 将缓存中的对应的项目内容拷贝至 '项目名称' 文件夹 */
          const task = spawn(`cp -rf ${__dirname}/../cache/example/ssr-with-${option.language === 'javascript' ? 'js' : 'ts'} ./`, [], { cwd: `./`, shell: true })
          task.on('close', (_code: number) => {
            console.log('原始项目克隆成功....')
            resolve()
          })
        })).then(() => new Promise<void>((resolve, reject) => {
            /** 当前执行目录下修改创建 '项目名称' 文件夹 */
          const task = spawn(`mv ssr-with-${option.language === 'javascript' ? 'js' : 'ts'} ${option.appname}`, [], { cwd: `./`, shell: true })
          task.on('close', (code: number) => {
            console.log('创建项目文件夹.....')
            resolve()
          })
        }))
}
