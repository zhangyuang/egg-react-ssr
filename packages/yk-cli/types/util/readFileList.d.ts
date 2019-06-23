/**
 * 递归文件夹下所有文件
 *
 * @export
 * @param {string} dir 文件夹
 * @param {string[]} [filesList=[]] 初始内容
 * @param {(string | null)} [ext=null] 后缀过滤
 * @returns
 */
export declare function readFileList(dir: string, ext?: string | null): string[];
