import "reflect-metadata";

/**
 * 扩展装饰器
 * 让以有的类型直接扩展到可枚举的对象上支持遍历
 * 通过获取对应修饰的class原型上的 元数据 "core-enum"上的 对象
 * @export
 * @param {Function} target
 */
export function Extend(target: Function) {
    let exObject = {}
    Object.getOwnPropertyNames(target.prototype).forEach(p => {
        if (p !== "constructor") {
            Reflect.set(exObject, p, Reflect.get(target.prototype, p));
        }
    });
    Reflect.defineMetadata("core-enum", exObject, target.prototype);
}