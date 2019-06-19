
import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

/**
 * 版本比对
 *
 * @export
 * @param {("javascript" | "typescript")} type 比对版本的类型
 * @param {string} version 版本号
 * @returns {boolean} 是否一致
 */
export function versionCompare (type: 'javascript' | 'typescript', version: string): boolean {
  const versionFile = path.resolve(__dirname, `../../${type}.version.json`)
  const versionDir = path.resolve(__dirname, `../../cache/example/ssr-with-${type === 'javascript' ? 'js' : 'ts'}/package.json`)
  if (fs.existsSync(versionFile) && fs.existsSync(versionDir)) {
    const oldVersion = require(versionFile).version
    return oldVersion === version
  } else {
    return false
  }

}

/**
 * 记录版本号
 *
 * @export
 * @param {("javascript" | "typescript")} type 版本类型
 * @param {string} version 版本号
 */
export function versionlog (type: 'javascript' | 'typescript', version: string): void {
  const versionFile = path.resolve(__dirname, `../../${type}.version.json`)
  fs.writeFileSync(versionFile, JSON.stringify({ version: version }))
}

/**
 * 移除缓存
 *
 * @export
 * @param {("javascript" | "typescript")} type
 * @returns {Promise<boolean>}
 */
export async function deletecache (type: 'javascript' | 'typescript'): Promise<boolean> {
  const versionFile = `${type}.version.json`
  return new Promise<boolean>((resolve, reject) => {
    const task = spawn(`rm -rf ./cache && rm -rf ./${versionFile}`, [], { cwd: path.resolve(__dirname, '../..'), shell: true })
    task.on('close', (code: number) => { resolve(true) })
  })
}
