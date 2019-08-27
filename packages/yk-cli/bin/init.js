"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ora_1 = __importDefault(require("ora"));
const config_1 = require("./config");
const check_1 = require("./check");
const package_1 = require("./package");
const webpackConfig_1 = require("./webpackConfig");
const cache_1 = require("./cache");
const update_1 = require("./update");
const spinner = ora_1.default('应用初始化中');
const init = async (option) => {
    // 自检更新当前脚手架是否最新
    await update_1.updateCli();
    // 问询APP配置
    await config_1.getConfig(option);
    // 判断当前appName是否已存在
    await check_1.checkRepeat(option);
    // 显示loading
    spinner.start();
    // 缓存比对
    await cache_1.cacheMange(option);
    // 处理 package.json
    package_1.processPackage(option);
    // 处理 webpack
    webpackConfig_1.processWebpack(option);
    spinner.succeed();
    process.exit();
};
exports.default = init;
