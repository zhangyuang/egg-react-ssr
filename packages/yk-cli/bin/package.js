"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const render_1 = require("./util/render");
const path_1 = __importDefault(require("path"));
/**
 * package.json
 * 修改模式
 * @export
 * @param {Optional} option 应用全局配置
 * @returns {Promise<boolean>}
 */
function packagejson(option) {
    return new Promise((resolve, reject) => {
        const tplpath = path_1.default.resolve(__dirname, "..", "tpl", "package.json.nj");
        render_1.renderTemplate(tplpath, `./${option.appname}/package.json`, option);
        console.log("原项目配置修改成功.....");
        resolve(true);
    });
}
exports.packagejson = packagejson;
//# sourceMappingURL=package.js.map