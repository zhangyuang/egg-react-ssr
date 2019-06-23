import { processError } from './util/index'
import { Optional } from './interface/option'
import inquirer from 'inquirer'

/**
 * 应用配置环节
 * 获取全局配置 option
 * @export
 * @param {Optional} option
 * @returns {Promise<void>}
 */
export function getConfig (option: Optional): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    inquirer.prompt([{
      type: 'input',
      message: '应用名称:',
      name: 'appName',
      default: option.appName
    }, {
      type: 'list',
      message: '开发语言',
      name: 'language',
      default: 'javascript',
      choices: [
        'javascript'
        // 'typescript(开发中)'
      ]
    }]).then((answers: any) => {
      Object.assign(option, answers)
      resolve()
    })
  }).catch(err => processError(err))
}
