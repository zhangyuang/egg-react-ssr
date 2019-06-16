
import { spawn } from "child_process";
import fs from 'fs';
import path from 'path';


/**
 * 版本比对
 *
 * @export
 * @param {("javascript" | "typescript")} type 比对版本的类型
 * @param {string} version 版本号
 * @returns {boolean} 是否一致
 */
export function versionCompare(type: "javascript" | "typescript", version: string): boolean {
    const version_file = path.resolve(__dirname, '..', '..', `${type}.version.json`)
    const version_dir = path.resolve(__dirname, '..', '..', `cache/example/ssr-with-${type === "javascript" ? "js" : "ts"}/package.json`);
    if (fs.existsSync(version_file) && fs.existsSync(version_dir)) {
        try {
            const content = fs.readFileSync(version_file).toString();
            const old_version = JSON.parse(content).version;
            if (old_version === version) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (ex) {
            return false;
        }
    }
    else {
        return false;
    }


}

/**
 * 记录版本号
 *
 * @export
 * @param {("javascript" | "typescript")} type 版本类型
 * @param {string} version 版本号
 */
export function versionlog(type: "javascript" | "typescript", version: string): void {
    const version_file = path.resolve(__dirname, '..', '..', `${type}.version.json`);
    fs.writeFileSync(version_file, JSON.stringify({ version: version }));
}

/**
 * 移除缓存
 *
 * @export
 * @param {("javascript" | "typescript")} type
 * @returns {Promise<boolean>}
 */
export async function deletecache(type: "javascript" | "typescript"): Promise<boolean> {
    const version_file = `${type}.version.json`
    return new Promise<boolean>((resolve, reject) => {
        const task = spawn(`rm -rf ./cache && rm -rf ./${version_file}`, [], { cwd: path.resolve(__dirname, "..", ".."), shell: true });
        task.on('close', (code: number) => { resolve(true); });
    });
}