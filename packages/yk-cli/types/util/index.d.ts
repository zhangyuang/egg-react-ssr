/// <reference types="node" />
import webpack from 'webpack';
import { exec } from 'child_process';
import { Optional } from '../interface/option';
declare const webpackWithPromise: (arg1: webpack.Configuration[]) => Promise<unknown>;
declare const processError: (err: string) => void;
declare const execWithPromise: typeof exec.__promisify__;
declare const downloadWithPromise: Function;
declare const resolveApp: (source: string) => string;
declare const getWithPromise: (url: string, timeout?: number | undefined) => Promise<any>;
/**
 * http
 * 缓存判断是否有效处理
 * @export
 * @param {Optional} option
 * @returns {Promise<boolean>}
 */
declare function getVersionEffective(option: Optional): Promise<boolean>;
/**
 * 渲染 Nunjuncks
 *
 * @export
 * @param {string} template 模板路径
 * @param {string} file 写入文件
 * @param {Optional} content 写入内容
 */
declare function renderTemplate(template: string, file: string, content: Optional): void;
export { webpackWithPromise, renderTemplate, getVersionEffective, processError, execWithPromise, downloadWithPromise, getWithPromise, resolveApp };
