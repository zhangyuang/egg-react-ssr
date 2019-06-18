/**
 * 版本比对
 *
 * @export
 * @param {("javascript" | "typescript")} type 比对版本的类型
 * @param {string} version 版本号
 * @returns {boolean} 是否一致
 */
export declare function versionCompare(type: "javascript" | "typescript", version: string): boolean;
/**
 * 记录版本号
 *
 * @export
 * @param {("javascript" | "typescript")} type 版本类型
 * @param {string} version 版本号
 */
export declare function versionlog(type: "javascript" | "typescript", version: string): void;
/**
 * 移除缓存
 *
 * @export
 * @param {("javascript" | "typescript")} type
 * @returns {Promise<boolean>}
 */
export declare function deletecache(type: "javascript" | "typescript"): Promise<boolean>;
