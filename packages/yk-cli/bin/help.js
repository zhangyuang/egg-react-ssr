"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
/**
 * 项目帮助提示
 *
 * @export
 * @returns {Promise<boolean>}
 */
function help() {
    return new Promise((resolve, reject) => {
        let content = fs_1.default.readFileSync(`${__dirname}/../help.txt`).toString("utf8");
        console.log(content);
    });
}
exports.help = help;
//# sourceMappingURL=help.js.map