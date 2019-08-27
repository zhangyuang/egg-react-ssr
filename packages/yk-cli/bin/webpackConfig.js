"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
/**
 * webpack
 * 处理模板
 * @export
 * @param {Optional} option
 * @returns {Promise<void>}
 */
function processWebpack(option) {
    const fileList = [
        'tpl/build/paths.js.nj',
        'tpl/build/util.js.nj',
        'tpl/build/webpack.config.base.js.nj',
        'tpl/build/webpack.config.client.js.nj',
        'tpl/build/webpack.config.server.js.nj'
    ];
    fileList.forEach(file => {
        const tplPath = util_1.resolveApp(`./${file}`);
        const filePath = `./${option.appName}/${file.replace(/tpl|.nj/g, '')}`;
        util_1.renderTemplate(tplPath, filePath, option);
    });
}
exports.processWebpack = processWebpack;
