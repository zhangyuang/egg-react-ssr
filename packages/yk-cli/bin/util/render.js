"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nunjucks_1 = __importDefault(require("nunjucks"));
const fs_1 = __importDefault(require("fs"));
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
