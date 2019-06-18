"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readFileList_1 = require("./util/readFileList");
const render_1 = require("./util/render");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function convert(type) {
    if (type === "sass") {
        return "scss";
    }
    else {
        return type;
    }
}
/**
 * 编译现有组件模板
 *
 * @export
 * @param {Optional} option
 * @returns {Promise<void>}
 */
async function component(option) {
    return new Promise((resolve, reject) => {
        const webpath = path_1.default.resolve(__dirname, "../tpl/web");
        /** 递归获取web下所有的组件文件模板 */
        const list = readFileList_1.readFileList(webpath, []);
        list.forEach(p => {
            /** 处理所有样式 css/less/scss 模板 */
            if (p.indexOf('.css.nj') > -1) {
                let filepath = null;
                let filepath_perfix = path_1.default.resolve(`./${option.appname}/web/${p.replace(webpath + "/", "").replace(".css.nj", "")}`);
                /** js 版本对应的是 *.less */
                if (option.language === "javascript") {
                    filepath = filepath_perfix + ".less";
                }
                /** ts 版本对应的是 *.module.scss */
                else if (option.language === "typescript") {
                    filepath = filepath_perfix.indexOf('assets') > -1 ? filepath_perfix + ".scss" : filepath_perfix + ".module.scss";
                }
                /** 把对应的 旧 less / module.scss 文件删除 写入新的 css / scss / less 文件 */
                if (filepath && fs_1.default.existsSync(filepath)) {
                    fs_1.default.unlinkSync(filepath);
                    const newfilepath = `${filepath_perfix}${option.language === "typescript" && filepath.indexOf('assets') === -1 ? ".module" : ""}.${convert(option.style)}`;
                    render_1.renderTemplate(p, newfilepath, option);
                }
            }
            /** 处理所有的react-javascript组件模板 */
            else if (p.indexOf('.js.nj') > -1 && option.language === "javascript") {
                let filepath = path_1.default.resolve(`./${option.appname}/web/${p.replace(webpath + "/", "").replace(".js.nj", ".js")}`);
                render_1.renderTemplate(p, filepath, option);
            }
            /** 处理所有的react-typescript组件模板 */
            else if (p.indexOf('.tsx.nj') > -1 && option.language === "typescript") {
                let filepath = path_1.default.resolve(`./${option.appname}/web/${p.replace(webpath + "/", "").replace(".tsx.nj", ".tsx")}`);
                render_1.renderTemplate(p, filepath, option);
            }
            /** 处理所有的模块类声明 */
            else if (p.indexOf('.style.d.ts.nj') > -1) {
                let filepath = null;
                let filepath_perfix = path_1.default.resolve(`./${option.appname}/web/${p.replace(webpath + "/", "").replace(".style.d.ts.nj", "")}`);
                filepath = filepath_perfix + ".scss.d.ts";
                /** 替换less.d.ts || css.d.ts */
                if (filepath && fs_1.default.existsSync(filepath)) {
                    fs_1.default.unlinkSync(filepath);
                    const newfilepath = `${filepath_perfix}.${convert(option.style)}.d.ts`;
                    render_1.renderTemplate(p, newfilepath, option);
                }
            }
        });
    });
}
exports.component = component;
