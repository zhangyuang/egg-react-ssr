import { Optional } from "../interface/option";
import nunjucks from 'nunjucks'
import fs from 'fs';


/**
 * 渲染 Nunjuncks
 *
 * @export
 * @param {string} template 模板路径
 * @param {string} file 写入文件
 * @param {Optional} content 写入内容
 */
export function renderTemplate(template: string, file: string, content: Optional): void {
    if (fs.existsSync(template)) {
        const templateContent = fs.readFileSync(template).toString();
        const result = nunjucks.renderString(templateContent, content);
        fs.writeFileSync(file, result);
    }
}