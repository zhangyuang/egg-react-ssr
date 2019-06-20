"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
/**
 * 应用配置环节
 * 获取全局配置 option
 * @export
 * @param {Optional} option
 * @returns {Promise<void>}
 */
function appconfig(option) {
    return new Promise((resolve, reject) => {
        inquirer_1.default.prompt([{
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
            }]).then((answers) => {
            option.appname = answers.appname;
            option.style = answers.style;
            option.language = answers.language;
            resolve();
        });
    });
}
exports.appconfig = appconfig;
