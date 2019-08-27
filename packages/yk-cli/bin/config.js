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
async function getConfig(option) {
    const answers = await inquirer_1.default.prompt([{
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
        }]);
    Object.assign(option, answers);
}
exports.getConfig = getConfig;
