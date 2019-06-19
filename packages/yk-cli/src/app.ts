
import { spawn } from 'child_process'
import { Optional } from './interface/option'
import inquirer from 'inquirer'
import fs from 'fs'

/**
 * 应用初始化函数
 *
 * @export
 * @param {Optional} option 应用全局配置
 * @returns {Promise<void>}
 */
export function init_app (option: Optional): Promise<void> {
  console.log('当前应用名称: ' + option.appname)
  return new Promise<void>((resolve, reject) => {
        /** 如果文件重复则提示 是否删除 对应 create react app 的交互 */
    if (fs.existsSync(`./${option.appname}`)) {
      inquirer.prompt([{
        type: 'confirm',
        message: `当前文件夹下含有您要创建 ${option.appname} 的应用名称文件,是否强制删除文件 继续初始化?`,
        name: 'file'
      }]).then((answers) => {
        if (answers && (answers === 'y' || answers === 'yes')) {
            const task = spawn(`rm -rf ./${option.appname}`, [], { cwd: `./`, shell: true })
            task.on('close', (code: number) => {
                console.log(`原文件已经成功删除....`)
                resolve()
              })
          } else {
            reject()
          }
      })
    } else {
      resolve()
    }
  })
}
