"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const index_1 = require("./util/index");
/**
 * package.json
 * 修改模式
 * @export
 * @param {Optional} option 应用全局配置
 * @returns {Promise<void>}
 */
function processPackage(option) {
    const tplpath = path_1.default.resolve(__dirname, '../tpl/package.json.nj');
    index_1.renderTemplate(tplpath, `./${option.appName}/package.json`, option);
}
exports.processPackage = processPackage;
