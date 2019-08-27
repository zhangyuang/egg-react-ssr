#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const init_1 = __importDefault(require("./init"));
yargs_1.default
    .command('init [appName]', 'init the program', {}, async (argv) => {
    const option = {
        appName: argv.appName || 'app'
    };
    await init_1.default(option);
})
    .command('dev', 'start clientRender', {}, async () => {
    process.env.NODE_ENV = 'development';
    const { dev } = require('./clientRender');
    await dev();
})
    .command('build', 'start clientRender', {}, async () => {
    process.env.NODE_ENV = 'production';
    const { build } = require('./clientRender');
    await build();
})
    .demandCommand(1, 'You need at least one command before moving on')
    .option('version', {
    alias: 'v',
    default: false
})
    .parse();
