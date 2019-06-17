"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const versionEffective_1 = require("./util/versionEffective");
const versionCompare_1 = require("./util/versionCompare");
const fileconfig_1 = require("./util/fileconfig");
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const download = require('download-git-repo');
/**
 * 缓存管理
 *
 * @export
 * @param {Optional} option 应用全局配置
 * @returns {Promise<void>}
 */
function cacheMange(option) {
    return versionEffective_1.getVersionEffective(option)
        .then((value) => new Promise((resolve, reject) => {
        /** 如果版本不一致 则直接更新缓存 */
        if (!value) {
            download(`github:zhusjfaker/egg-react-ssr#${fileconfig_1.config.branch}`, path_1.default.resolve(__dirname, "../cache"), (err) => {
                if (!err) {
                    const packagejson_path = path_1.default.resolve(__dirname, `../cache/example/ssr-with-${option.language === "javascript" ? "js" : "ts"}/package.json`);
                    const version = require(packagejson_path).version;
                    versionCompare_1.versionlog(option.language, version);
                    resolve();
                }
                else {
                    console.log('download failed');
                    console.log(err);
                    reject();
                }
            });
        }
        /** 版本一致跳过 */
        else {
            resolve();
        }
    })).then(() => new Promise((resolve, reject) => {
        /** 当前执行目录下创建 '项目名称' 文件夹 */
        const task = child_process_1.spawn(`mkdir ${option.appname}`, [], { cwd: `./`, shell: true });
        task.on('close', (code) => {
            console.log('创建项目文件夹.....');
            resolve();
        });
    })).then(() => new Promise((resolve, reject) => {
        /** 将缓存中的对应的项目内容拷贝至 '项目名称' 文件夹 */
        const task = child_process_1.spawn(`
    cp -rf ${__dirname}/../cache/example/ssr-with-${option.language === "javascript" ? "js" : "ts"}/** ./ &&
    cp -rf ${__dirname}/../cache/example/ssr-with-${option.language === "javascript" ? "js" : "ts"}/.* ./
    `, [], { cwd: `./${option.appname}`, shell: true });
        task.on('close', (_code) => {
            console.log('原始项目克隆成功....');
            resolve();
        });
    }));
}
exports.cacheMange = cacheMange;
