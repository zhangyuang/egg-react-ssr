"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * 递归文件夹下所有文件
 *
 * @export
 * @param {string} dir 文件夹
 * @param {string[]} [filesList=[]] 初始内容
 * @param {(string | null)} [ext=null] 后缀过滤
 * @returns
 */
function readFileList(dir, filesList = [], ext = null) {
    const files = fs_1.default.readdirSync(dir);
    files.forEach((item, index) => {
        let fullPath = path_1.default.join(dir, item);
        const stat = fs_1.default.statSync(fullPath);
        if (stat.isDirectory()) {
            readFileList(path_1.default.join(dir, item), filesList, ext); // 递归读取文件
        }
        else {
            if (ext && item.indexOf(ext) > -1) {
                filesList.push(fullPath);
            }
            else if (!ext) {
                filesList.push(fullPath);
            }
        }
    });
    return filesList;
}
exports.readFileList = readFileList;
