"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const child_process_1 = require("child_process");
const https_1 = __importDefault(require("https"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const nunjucks_1 = __importDefault(require("nunjucks"));
const download = require('download-git-repo');
const tsUrl = 'https://raw.githubusercontent.com/zhusjfaker/egg-react-ssr/backup/example/ssr-with-ts/package.json';
const jsUrl = 'https://raw.githubusercontent.com/ykfe/egg-react-ssr/master/example/ssr-with-js/package.json';
exports.processError = (err) => {
    if (err) {
        console.log('err', err);
        process.exit();
    }
};
exports.execWithPromise = util_1.promisify(child_process_1.exec);
exports.downloadWithPromise = util_1.promisify(download);
exports.resolveApp = (source) => {
    // 以根目录为基准
    return path_1.default.resolve(__dirname, `../../${source}`);
};
exports.getWithPromise = (url) => {
    return new Promise((resolve, reject) => {
        let data = '';
        https_1.default.get(url, res => {
            res.on('data', (chunk) => { data += chunk.toString(); });
            res.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on('error', () => reject());
    });
};
/**
 * http
 * 缓存判断是否有效处理
 * @export
 * @param {Optional} option
 * @returns {Promise<boolean>}
 */
async function getVersionEffective(option) {
    if (fs_1.default.existsSync(exports.resolveApp('./cache'))) {
        const url = option.language === 'typescript' ? tsUrl : jsUrl;
        const language = option.language === 'javascript' ? 'js' : 'ts';
        const { version } = await exports.getWithPromise(url);
        const localVersion = require(exports.resolveApp(`./cache/example/ssr-with-${language}/package.json`)).version.trim();
        // 如果版本一样就不用更新
        return version.trim() === localVersion;
    }
    return false;
}
exports.getVersionEffective = getVersionEffective;
/**
 * 渲染 Nunjuncks
 *
 * @export
 * @param {string} template 模板路径
 * @param {string} file 写入文件
 * @param {Optional} content 写入内容
 */
function renderTemplate(template, file, content) {
    if (fs_1.default.existsSync(template)) {
        const templateContent = fs_1.default.readFileSync(template).toString();
        const result = nunjucks_1.default.renderString(templateContent, content);
        fs_1.default.writeFileSync(file, result);
    }
}
exports.renderTemplate = renderTemplate;
