"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
/**
 * 判断NPM包自动更新
 *
 * @export
 * @param {Optional} option 全局应用配置
 * @returns {Promise<void>}
 */
function updatelocal(option) {
    return new Promise((resolve, reject) => {
        const task = child_process_1.spawn(`npm view yk-cli version`, [], { cwd: `./`, shell: true });
        let version = null;
        task.stdout.on('data', data => {
            version = data;
        });
        task.on('close', (code) => {
            resolve(version.toString().trim());
        });
    }).then(data => new Promise((resolve, reject) => {
        const filepath = path_1.default.resolve(__dirname, '../package.json');
        const localversion = require(filepath).version;
        /** 成功拿到版本号 且 版本号与本地版本号不一致则执行更新 */
        if (data && data !== localversion) {
            console.log('发现本地版本较旧,尝试更新yk-cli脚手架');
            const task = child_process_1.spawn(`npm i yk-cli@${data} -g`, [], {
                cwd: `./`,
                shell: true
            });
            task.on('close', (code) => {
                console.log(`更新完毕... 请您重新执行 ykcli init ${option && option.appname ? option.appname : ''}`);
                reject();
            });
        }
        else {
            resolve();
        }
    }));
}
exports.updatelocal = updatelocal;
