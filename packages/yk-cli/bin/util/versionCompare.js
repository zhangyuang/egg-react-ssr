"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * 版本比对
 *
 * @export
 * @param {("javascript" | "typescript")} type 比对版本的类型
 * @param {string} version 版本号
 * @returns {boolean} 是否一致
 */
function versionCompare(type, version) {
    const versionFile = path_1.default.resolve(__dirname, `../../${type}.version.json`);
    const versionDir = path_1.default.resolve(__dirname, `../../cache/example/ssr-with-${type === 'javascript' ? 'js' : 'ts'}/package.json`);
    if (fs_1.default.existsSync(versionFile) && fs_1.default.existsSync(versionDir)) {
        const oldVersion = require(versionFile).version;
        return oldVersion === version;
    }
    else {
        return false;
    }
}
exports.versionCompare = versionCompare;
/**
 * 记录版本号
 *
 * @export
 * @param {("javascript" | "typescript")} type 版本类型
 * @param {string} version 版本号
 */
function versionlog(type, version) {
    const versionFile = path_1.default.resolve(__dirname, `../../${type}.version.json`);
    fs_1.default.writeFileSync(versionFile, JSON.stringify({ version: version }));
}
exports.versionlog = versionlog;
/**
 * 移除缓存
 *
 * @export
 * @param {("javascript" | "typescript")} type
 * @returns {Promise<boolean>}
 */
async function deletecache(type) {
    const versionFile = `${type}.version.json`;
    return new Promise((resolve, reject) => {
        const task = child_process_1.spawn(`rm -rf ./cache && rm -rf ./${versionFile}`, [], { cwd: path_1.default.resolve(__dirname, '../..'), shell: true });
        task.on('close', (code) => { resolve(true); });
    });
}
exports.deletecache = deletecache;
