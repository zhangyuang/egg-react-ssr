"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileconfig_1 = require("./fileconfig");
const versionCompare_1 = require("./versionCompare");
const https_1 = __importDefault(require("https"));
/**
 * http
 * 缓存判断是否有效处理
 * @export
 * @param {Optional} option
 * @returns {Promise<boolean>}
 */
async function getVersionEffective(option) {
    return new Promise((resolve, reject) => {
        let url = option.language === 'typescript' ? fileconfig_1.config.ts_url : fileconfig_1.config.js_url;
        let content = '';
        let packagejson = null;
        https_1.default.get(url, (res) => {
            res.on('data', (buffer) => {
                content = content + buffer.toString();
            });
            res.on('error', async (err) => {
                console.log('请求版本文件时发生错误', err);
                await versionCompare_1.deletecache(option.language);
                resolve(false);
            });
            res.on('end', async () => {
                if (content !== '') {
                    try {
                        packagejson = JSON.parse(content);
                        const version = packagejson.version;
                        const result = versionCompare_1.versionCompare(option.language, version);
                        if (!result) {
                            await versionCompare_1.deletecache(option.language);
                        }
                        resolve(result);
                    }
                    catch (ex) {
                        await versionCompare_1.deletecache(option.language);
                        resolve(false);
                    }
                }
                else {
                    await versionCompare_1.deletecache(option.language);
                    resolve(false);
                }
            });
        });
    });
}
exports.getVersionEffective = getVersionEffective;
//# sourceMappingURL=versionEffective.js.map