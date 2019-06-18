import { Optional } from "./interface/option";
import fs from 'fs';

/**
 * 项目帮助提示
 *
 * @export
 * @returns {Promise<void>}
 */
export function help(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        let content = fs.readFileSync(`${__dirname}/../help.txt`).toString("utf8");
        console.log(content);
    });
}