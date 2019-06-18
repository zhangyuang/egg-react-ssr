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
    const version_file = path_1.default.resolve(__dirname, `../../${type}.version.json`);
    const version_dir = path_1.default.resolve(__dirname, `../../cache/example/ssr-with-${type === "javascript" ? "js" : "ts"}/package.json`);
    if (fs_1.default.existsSync(version_file) && fs_1.default.existsSync(version_dir)) {
        const old_version = require(version_file).version;
        return old_version === version;
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
    const version_file = path_1.default.resolve(__dirname, `../../${type}.version.json`);
    fs_1.default.writeFileSync(version_file, JSON.stringify({ version: version }));
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
    const version_file = `${type}.version.json`;
    return new Promise((resolve, reject) => {
        const task = child_process_1.spawn(`rm -rf ./cache && rm -rf ./${version_file}`, [], { cwd: path_1.default.resolve(__dirname, "../.."), shell: true });
        task.on('close', (code) => { resolve(true); });
    });
}
exports.deletecache = deletecache;
