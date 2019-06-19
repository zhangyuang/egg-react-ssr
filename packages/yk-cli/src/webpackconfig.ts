import { Optional } from './interface/option'
import { renderTemplate } from './util/render'
import path from 'path'

/**
 * webpack
 * 处理模板
 * @export
 * @param {Optional} option
 * @returns {Promise<void>}
 */
export async function webpack (option: Optional): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const filelist = [
      'tpl/build/paths.js.nj',
      'tpl/build/util.js.nj',
      'tpl/build/webpack.config.base.js.nj',
      'tpl/build/webpack.config.client.js.nj',
      'tpl/build/webpack.config.server.js.nj'
    ]
    filelist.forEach(p => {
      const tplpath = path.resolve(__dirname, '..', p)
      const filepath = `./${option.appname}/${p.replace('tpl/', '').replace('.nj', '')}`
      renderTemplate(tplpath, filepath, option)
    })
    console.log('webpack设置成功.....')
    resolve()
  })
}
