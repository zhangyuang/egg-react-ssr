import ora from 'ora'
import { execWithPromise, getWithPromise, resolveApp } from './util/index'
const url = 'https://registry.npm.taobao.org/yk-cli'
/**
 * 判断NPM包自动更新
 *
 * @export
 * @param {Optional} option 全局应用配置
 * @returns {Promise<void>}
 */
export async function updateCli (): Promise<void> {
  let localVersion
  try {
    localVersion = require(resolveApp('./package.json')).version.trim()
    const { 'dist-tags': { latest } } = await getWithPromise(url)
    // 成功拿到版本号 且 版本号与本地版本号不一致则执行更新
    if (latest !== localVersion) {
      const spinner = ora('发现本地版本较旧,尝试更新yk-cli脚手架')
      spinner.start()
      const { stdout } = await execWithPromise(`npm i -g --registry=https://registry.npm.taobao.org yk-cli@${latest}`)
      console.log(stdout, `更新完毕... 请您重新执行 ykcli init`)
      spinner.succeed()
      process.exit()
    }

  } catch (error) {
    console.log('\x1b[91m' + `获取最新版本失败本次创建将使用本地版本${localVersion}，若版本较旧请手动安装最新版本npm i -g yk-cli@latest或连接代理重试`)
  }
}
