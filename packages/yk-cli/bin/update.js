"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ora_1 = __importDefault(require("ora"));
const index_1 = require("./util/index");
const url = 'https://raw.githubusercontent.com/ykfe/egg-react-ssr/master/packages/yk-cli/package.json';
const isTesting = process.env.TEST_ENV;
/**
 * 判断NPM包自动更新
 *
 * @export
 * @param {Optional} option 全局应用配置
 * @returns {Promise<void>}
 */
async function updateCli() {
    const { version } = await index_1.getWithPromise(url);
    const remoteVersion = version.trim();
    const localVersion = require(index_1.resolveApp('./package.json')).version.trim();
    // 成功拿到版本号 且 版本号与本地版本号不一致则执行更新
    if (remoteVersion !== localVersion) {
        const spinner = ora_1.default('发现本地版本较旧,尝试更新yk-cli脚手架');
        if (!isTesting) {
            spinner.start();
            const { stdout } = await index_1.execWithPromise(`npm i -g --registry=https://registry.npm.taobao.org yk-cli@${version}`);
            console.log(stdout, `更新完毕... 请您重新执行 ykcli init`);
            spinner.succeed();
            process.exit();
        }
    }
}
exports.updateCli = updateCli;
