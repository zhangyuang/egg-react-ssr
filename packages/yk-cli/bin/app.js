"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const inquirer_1 = __importDefault(require("inquirer"));
const fs_1 = __importDefault(require("fs"));
/**
 * 应用初始化函数
 *
 * @export
 * @param {Optional} option 应用全局配置
 * @returns {Promise<void>}
 */
function init_app(option) {
    return new Promise((resolve, reject) => {
        /** 如果文件重复则提示 是否删除 对应 create react app 的交互 */
        if (fs_1.default.existsSync(`./${option.appname}`)) {
            inquirer_1.default.prompt([{
                    type: 'confirm',
                    message: `当前文件夹下含有您要创建 ${option.appname} 的应用名称文件,是否强制删除文件 继续初始化?`,
                    name: 'file'
                }]).then((answers) => {
                if (answers.file) {
                    const task = child_process_1.spawn(`rm -rf ./${option.appname}`, [], { cwd: `./`, shell: true });
                    task.on('close', (code) => {
                        console.log(`原文件已经成功删除....`);
                        resolve();
                    });
                }
                else {
                    reject();
                }
            });
        }
        else {
            resolve();
        }
    });
}
exports.init_app = init_app;
//# sourceMappingURL=app.js.map