import path from 'path'
import { renderTemplate } from './util/index'
import { Optional } from './interface/option'
/**
 * package.json
 * 修改模式
 * @export
 * @param {Optional} option 应用全局配置
 * @returns {Promise<void>}
 */
export function processPackage (option: Optional): void {
  const tplpath = path.resolve(__dirname, '../tpl/package.json.nj')
  renderTemplate(tplpath, `./${option.appName}/package.json`, option)
}
