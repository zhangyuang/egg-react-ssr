"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const fs_1 = __importDefault(require("fs"));
const shelljs_1 = __importDefault(require("shelljs"));
const index_1 = require("./util/index");
/**
 * 应用初始化函数
 *
 * @export
 * @param {Optional} option 应用全局配置
 * @returns {Promise<void>}
 */
function checkRepeat(option) {
    const { appName } = option;
    return new Promise(async (resolve, reject) => {
        if (fs_1.default.existsSync(`./${appName}`)) {
            const answers = await inquirer_1.default.prompt([{
                    type: 'confirm',
                    message: `当前文件夹下含有您要创建 ${appName} 的应用名称文件,是否强制删除文件 继续初始化?`,
                    name: 'delete',
                    default: 'Yes'
                }]);
            if (answers.delete) {
                shelljs_1.default.rm('-rf', `./${appName}`);
                console.log(`原文件已经成功删除...`);
                resolve();
            }
            else
                process.exit();
        }
        else
            resolve();
    }).catch(err => index_1.processError(err));
}
exports.checkRepeat = checkRepeat;
