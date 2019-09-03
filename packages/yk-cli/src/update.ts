import ora from 'ora'
import { execWithPromise, getWithPromise, resolveApp } from './util/index'

const url = 'https://raw.githubusercontent.com/ykfe/egg-react-ssr/master/packages/yk-cli/package.json'
const isTest = process.env.NODE_ENV === 'test'
/**
 * 判断NPM包自动更新
 *
 * @export
 * @param {Optional} option 全局应用配置
 * @returns {Promise<void>}
 */
export async function updateCli (): Promise<void> {
  const { version } = await getWithPromise(url)
  const remoteVersion = version.trim()
  const localVersion = require(resolveApp('./package.json')).version.trim()
  // 成功拿到版本号 且 版本号与本地版本号不一致则执行更新
  if (remoteVersion !== localVersion) {
    const spinner = ora('发现本地版本较旧,尝试更新yk-cli脚手架')
    if (!isTest) {
      spinner.start()
      const { stdout } = await execWithPromise(`npm i -g --registry=https://registry.npm.taobao.org yk-cli@${version}`)
      console.log(stdout, `更新完毕... 请您重新执行 ykcli init`)
      spinner.succeed()
      process.exit()
    }
  }
}
