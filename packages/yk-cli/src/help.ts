import { Optional } from "./interface/option";
import fs from 'fs';

/**
 * 项目帮助提示
 *
 * @export
 * @returns {Promise<boolean>}
 */
export function help(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        let content = fs.readFileSync(`${__dirname}/../help.txt`).toString("utf8");
        console.log(content);
    });
}