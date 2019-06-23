import { downloadPromise, resolveApp, getVersionEffective } from './util/index'
import { Optional } from './interface/option'
import shell from 'shelljs'
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
  // 如果没有缓存可用则拉取最新代码
  if (!useCache) {
    await downloadPromise('github:ykfe/egg-react-ssr#master', resolveApp('./cache'))
  }
  const example = resolveApp(`./cache/example/ssr-with-${language}`)
  shell.cp('-rf', example, './')
  shell.mv(`./ssr-with-${language}`, `./${option.appName}`)
}
