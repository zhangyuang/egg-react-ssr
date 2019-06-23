import { getPromise, execPromise, processError, resolveApp } from './util/index'
import ora from 'ora'
const spinner = ora('发现本地版本较旧,尝试更新yk-cli脚手架')
const url = 'https://raw.githubusercontent.com/ykfe/egg-react-ssr/master/packages/yk-cli/package.json'
/**
 * 判断NPM包自动更新
 *
 * @export
 * @param {Optional} option 全局应用配置
 * @returns {Promise<void>}
 */
export function update (): Promise<void> {
  return new Promise<any>(async (resolve, reject) => {
    const { version } = await getPromise(url)
    resolve(version.trim())
  }).then(async version => {
    const localVersion = require(resolveApp('./package.json')).version.trim()
    // 成功拿到版本号 且 版本号与本地版本号不一致则执行更新
    if (version !== localVersion) {
      spinner.start()
      const { stdout } = await execPromise(`npm i -g --registry=https://registry.npm.taobao.org yk-cli@${version}`)
      spinner.succeed()
      console.log(stdout, `更新完毕... 请您重新执行 ykcli init`)
      process.exit()
    }
  }).catch(err => processError(err))
}
