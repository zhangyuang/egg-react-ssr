import fs from 'fs';
import path from 'path';


/**
 * 递归文件夹下所有文件
 *
 * @export
 * @param {string} dir 文件夹
 * @param {string[]} [filesList=[]] 初始内容
 * @param {(string | null)} [ext=null] 后缀过滤
 * @returns
 */
export function readFileList(dir: string, filesList: string[] = [], ext: string | null = null) {
    const files = fs.readdirSync(dir);
    files.forEach((item, index) => {
        var fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            readFileList(path.join(dir, item), filesList, ext);  //递归读取文件
        } else {
            if (ext && item.indexOf(ext) > -1) {
                filesList.push(fullPath);
            } else if (!ext) {
                filesList.push(fullPath);
            }

        }
    });
    return filesList;
}