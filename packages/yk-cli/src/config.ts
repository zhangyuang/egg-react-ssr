import { Optional } from './interface/option'
import inquirer from 'inquirer'

/**
 * 应用配置环节
 * 获取全局配置 option
 * @export
 * @param {Optional} option
 * @returns {Promise<void>}
 */
export function appconfig (option: Optional): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    inquirer.prompt([{
      type: 'input',
      message: '您创建的应用名称:',
      name: 'appname',
      default: option.command && option.command.length > 0 ? String(option.command[0]) : 'app'
    }, {
      type: 'list',
      message: '使用的开发语言',
      name: 'language',
      default: 'javascript',
      choices: [
        'javascript',
        'typescript'
      ]
    }, {
      type: 'list',
      message: '是否使用样式预处理器:',
      name: 'style',
      default: 'less',
      choices: [
          'less',
          'sass',
          'css'
        ]
    }]).then((answers: any) => {
        option.appname = answers.appname
        option.style = answers.style
        option.language = answers.language
        resolve()
      })
  })
}
