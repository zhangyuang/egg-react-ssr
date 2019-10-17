import inquirer from 'inquirer'
import { Optional } from './interface/option'

/**
 * 应用配置环节
 * 获取全局配置 option
 * @export
 * @param {Optional} option
 * @returns {Promise<void>}
 */
export async function getConfig (option: Optional): Promise<void> {
  const answers: any = await inquirer.prompt([{
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
      'javascript',
      'typescript'
    ]
  }])
  Object.assign(option, answers)
}
