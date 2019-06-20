#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ora_1 = __importDefault(require("ora"));
const config_1 = require("./config");
const app_1 = require("./app");
const package_1 = require("./package");
const webpackconfig_1 = require("./webpackconfig");
const help_1 = require("./help");
const cache_1 = require("./cache");
const webcomponent_1 = require("./webcomponent");
const update_1 = require("./update");
const spinner = ora_1.default('正在下载模版...');
/** 总会话函数 */
const generator = (argv) => {
    /** 所有命令参数 */
    let optionlist = argv;
    let option = {};
    option.action = optionlist[0];
    option.command = optionlist.slice(1);
    const session = async () => {
        let action = option.action;
        try {
            switch (action) {
                /** 构建项目 */
                case 'init':
                    /** 自检更新当前脚手架是否最新 */
                    await update_1.updatelocal(option);
                    /** 问询APP配置 */
                    await config_1.appconfig(option);
                    /** 构建应用 */
                    await app_1.init_app(option);
                    spinner.start();
                    /** 缓存比对 */
                    await cache_1.cacheMange(option);
                    /** 处理 package.json */
                    await package_1.packagejson(option);
                    /** 处理 webpack */
                    await webpackconfig_1.webpack(option);
                    /** 处理 组件 */
                    if ((option.language === 'javascript' && option.style !== 'less') || (option.language === 'typescript' && option.style !== 'sass')) {
                        await webcomponent_1.component(option);
                    }
                    spinner.succeed();
                    console.log(`项目安装成功!`);
                    break;
                /** 项目帮助 */
                case 'help':
                    await help_1.help();
                    break;
            }
        }
        catch (ex) {
            console.log(ex);
        }
    };
    session();
};
generator(process.argv.slice(2));
//# sourceMappingURL=index.js.map