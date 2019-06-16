import { Optional } from "./interface/option";
import inquirer from "inquirer";

/**
 * 应用配置环节
 * 获取全局配置 option
 * @export
 * @param {Optional} option
 * @returns {Promise<boolean>}
 */
export function appconfig(option: Optional): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        inquirer.prompt([{
            type: 'input',
            message: '您创建的应用名称:',
            name: 'appname',
            default: option.command && option.command.length > 0 ? String(option.command[0]) : ''
        }, {
            type: 'list',
            message: '使用的开发语言',
            name: 'language',
            default: "javascript",
            choices: [
                "javascript",
                "typescript"
            ]
        }, {
            type: 'list',
            message: '是否使用样式预处理器:',
            name: 'style',
            default: "less",
            choices: [
                "less",
                "sass",
                "css"
            ]
        }]).then((answers: any) => {
            if (!answers.appname || String(answers.appname).trim() == '') {
                console.log("创建的应用名不能为空!")
                reject(false);
            }
            option.appname = answers.appname;
            option.style = answers.style;
            option.language = answers.language;
            resolve(true);
        });
    });
}