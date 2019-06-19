import { Optional } from './interface/option'
import { renderTemplate } from './util/render'
import path from 'path'

/**
 * package.json
 * 修改模式
 * @export
 * @param {Optional} option 应用全局配置
 * @returns {Promise<void>}
 */
export function packagejson (option: Optional): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const tplpath = path.resolve(__dirname, '../tpl/package.json.nj')
    renderTemplate(tplpath, `./${option.appname}/package.json`, option)
    console.log('原项目配置修改成功.....')
    resolve()
  })
}
