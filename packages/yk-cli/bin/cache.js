"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = __importDefault(require("shelljs"));
const index_1 = require("./util/index");
/**
 * 缓存管理
 *
 * @export
 * @param {Optional} option 应用全局配置
 * @returns {Promise<void>}
 */
async function cacheMange(option) {
    const useCache = await index_1.getVersionEffective(option);
    const language = option.language === 'javascript' ? 'js' : 'ts';
    // 如果没有缓存可用或者远程代码更新则拉取最新代码
    if (!useCache) {
        shelljs_1.default.rm('-rf', index_1.resolveApp('./cache'));
        await index_1.downloadWithPromise('github:ykfe/egg-react-ssr#master', index_1.resolveApp('./cache'));
    }
    const example = index_1.resolveApp(`./cache/example/ssr-with-${language}`);
    shelljs_1.default.cp('-rf', example, './');
    shelljs_1.default.mv(`./ssr-with-${language}`, `./${option.appName}`);
}
exports.cacheMange = cacheMange;
