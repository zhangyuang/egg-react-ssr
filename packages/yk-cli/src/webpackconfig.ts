import { resolveApp, renderTemplate } from './util/index'
import { Optional } from './interface/option'

/**
 * webpack
 * 处理模板
 * @export
 * @param {Optional} option
 * @returns {Promise<void>}
 */
export function processWebpack (option: Optional): void {
  const fileList = [
    'tpl/build/paths.js.nj',
    'tpl/build/util.js.nj',
    'tpl/build/webpack.config.base.js.nj',
    'tpl/build/webpack.config.client.js.nj',
    'tpl/build/webpack.config.server.js.nj'
  ]
  fileList.forEach(file => {
    const tplPath = resolveApp(`./${file}`)
    const filePath = `./${option.appName}/${file.replace(/tpl|.nj/g, '')}`
    renderTemplate(tplPath, filePath, option)
  })
}
