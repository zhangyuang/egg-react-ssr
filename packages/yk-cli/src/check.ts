import inquirer from 'inquirer'
import fs from 'fs'
import shell from 'shelljs'
import { processError } from './util/index'
import { Optional } from './interface/option'

/**
 * 应用初始化函数
 *
 * @export
 * @param {Optional} option 应用全局配置
 * @returns {Promise<void>}
 */
export function checkRepeat (option: Optional): Promise<void> {
  const { appName } = option
  return new Promise<void>(async (resolve, reject) => {
    if (fs.existsSync(`./${appName}`)) {
      const answers: any = await inquirer.prompt([{
        type: 'confirm',
        message: `当前文件夹下含有您要创建 ${appName} 的应用名称文件,是否强制删除文件 继续初始化?`,
        name: 'delete',
        default: 'Yes'
      }])
      if (answers.delete) {
        shell.rm('-rf', `./${appName}`)
        console.log(`原文件已经成功删除...`)
        resolve()
      } else process.exit()
    }
    resolve()
  })
}
