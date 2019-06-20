import { spawn } from 'child_process'
import { Optional } from './interface/option'
import path from 'path'

/**
 * 判断NPM包自动更新
 *
 * @export
 * @param {Optional} option 全局应用配置
 * @returns {Promise<void>}
 */
export function updatelocal (option: Optional): Promise<void> {
  return new Promise<any>((resolve, reject) => {
    const task = spawn(`npm view yk-cli version`, [], { cwd: `./`, shell: true })
    let version: any = null
    task.stdout.on('data', data => {
      version = data
    })
    task.on('close', (code: number) => {
      resolve(version.toString().trim())
    })
  }).then(
    data =>
      new Promise<void>((resolve, reject) => {
        const filepath = path.resolve(__dirname, '../package.json')
        const localversion = require(filepath).version
        /** 成功拿到版本号 且 版本号与本地版本号不一致则执行更新 */
        if (data && data !== localversion) {
          console.log('发现本地版本较旧,尝试更新yk-cli脚手架')
          const task = spawn(`npm i yk-cli@${data} -g`, [], {
            cwd: `./`,
            shell: true
          })
          task.stdout.on('data', (data) => {
            console.log(data)
          })
          task.on('close', (code: number) => {
            console.log(
              `更新完毕... 请您重新执行 ykcli init ${
                option && option.appname ? option.appname : ''
              }`
            )
            reject()
          })
        } else {
          resolve()
        }
      })
  )
}
