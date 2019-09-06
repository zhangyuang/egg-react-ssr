import shell from 'shelljs'
import { downloadWithPromise, resolveApp, getVersionEffective } from './util/index'
import { Optional } from './interface/option'

/**
 * 缓存管理
 *
 * @export
 * @param {Optional} option 应用全局配置
 * @returns {Promise<void>}
 */
export async function cacheMange (option: Optional): Promise<void> {
  const useCache = await getVersionEffective(option)
  const language = option.language === 'javascript' ? 'js' : 'ts'
  // 如果没有缓存可用或者远程代码更新则拉取最新代码
  if (!useCache) {
    shell.rm('-rf', resolveApp('./cache'))
    await downloadWithPromise('github:ykfe/egg-react-ssr#dev', resolveApp('./cache'))
  }
  const example = resolveApp(`./cache/example/ssr-with-${language}`)
  shell.cp('-rf', example, './')
  shell.mv(`./ssr-with-${language}`, `./${option.appName}`)
}
