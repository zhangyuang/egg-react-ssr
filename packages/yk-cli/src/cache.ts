import { getVersionEffective } from "./util/versionEffective";
import { Optional } from "./interface/option";
import { versionlog } from "./util/versionCompare";
import { config } from './util/fileconfig';
import { spawn } from "child_process";
import path from 'path';


const download = require('download-git-repo');

/**
 * 缓存管理
 *
 * @export
 * @param {Optional} option 应用全局配置
 * @returns {Promise<boolean>}
 */
export function cacheMange(option: Optional): Promise<boolean> {

    return getVersionEffective(option)
        .then((value) => new Promise<boolean>((resolve, reject) => {
            /** 如果版本不一致 则直接更新缓存 */
            if (!value) {
                download(`github:zhusjfaker/egg-react-ssr#${config.branch}`, path.resolve(__dirname, "..", "cache"), (err: any) => {
                    if (!err) {
                        const packagejson_path = path.resolve(__dirname, '..', `cache/example/ssr-with-${option.language === "javascript" ? "js" : "ts"}/package.json`);
                        const version = require(packagejson_path).version;
                        versionlog(option.language!, version);
                        resolve(true);
                    }
                    else {
                        console.log('download failed');
                        console.log(err);
                        reject(false);
                    }
                });
            }
            /** 版本一致跳过 */
            else {
                resolve(true);
            }
        })).then(() => new Promise<boolean>((resolve, reject) => {
            /** 当前执行目录下创建 '项目名称' 文件夹 */
            const task = spawn(`mkdir ${option.appname}`, [], { cwd: `./`, shell: true });
            task.on('close', (code: number) => {
                console.log('创建项目文件夹.....')
                resolve(true);
            });
        })).then(() => new Promise<boolean>((resolve, reject) => {
            /** 将缓存中的对应的项目内容拷贝至 '项目名称' 文件夹 */
            const task = spawn(`
    cp -rf ${__dirname}/../cache/example/ssr-with-${option.language === "javascript" ? "js" : "ts"}/** ./ &&
    cp -rf ${__dirname}/../cache/example/ssr-with-${option.language === "javascript" ? "js" : "ts"}/.* ./
    `, [], { cwd: `./${option.appname}`, shell: true });
            task.on('close', (code: number) => {
                console.log('原始项目克隆成功....');
                resolve(true);
            });
        }));
}