"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const render_1 = require("./util/render");
const path_1 = __importDefault(require("path"));
async function webpack(option) {
    return new Promise((resolve, reject) => {
        const filelist = [
            'tpl/build/paths.js.nj',
            'tpl/build/util.js.nj',
            'tpl/build/webpack.config.base.js.nj',
            'tpl/build/webpack.config.client.js.nj',
            'tpl/build/webpack.config.server.js.nj'
        ];
        filelist.forEach(p => {
            const tplpath = path_1.default.resolve(__dirname, '..', p);
            const filepath = `./${option.appname}/${p.replace("tpl/", "").replace(".nj", "")}`;
            render_1.renderTemplate(tplpath, filepath, option);
        });
        console.log("webpack设置成功.....");
        resolve(true);
    });
}
exports.webpack = webpack;
