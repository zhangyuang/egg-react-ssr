import { Optional } from '../interface/option';
export declare const processError: (err: string) => void;
export declare const execWithPromise: any;
export declare const downloadWithPromise: any;
export declare const resolveApp: (source: string) => any;
export declare const getWithPromise: (url: string) => Promise<any>;
/**
 * http
 * 缓存判断是否有效处理
 * @export
 * @param {Optional} option
 * @returns {Promise<boolean>}
 */
export declare function getVersionEffective(option: Optional): Promise<boolean>;
/**
 * 渲染 Nunjuncks
 *
 * @export
 * @param {string} template 模板路径
 * @param {string} file 写入文件
 * @param {Optional} content 写入内容
 */
export declare function renderTemplate(template: string, file: string, content: Optional): void;
