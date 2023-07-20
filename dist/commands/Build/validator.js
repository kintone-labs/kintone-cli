"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appFileCheck = exports.buildValidator = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = require("fs");
const buildValidator = (params) => {
    if (!params.appName) {
        return 'App name missing';
    }
    if (!(0, fs_1.existsSync)(params.appName)) {
        return 'App not existed';
    }
    return false;
};
exports.buildValidator = buildValidator;
const appFileCheck = ({ appName, isExistsSync }) => {
    if (!isExistsSync) {
        console.log(chalk_1.default.yellow('To set auth info, use:'));
        console.log('');
        console.log(chalk_1.default.greenBright(`     kintone-cli auth --app-name ${appName}`));
        console.log('');
        return false;
    }
    console.log(chalk_1.default.yellow('To deploy app, use:'));
    console.log('');
    console.log(chalk_1.default.greenBright(`     kintone-cli deploy --app-name ${appName}`));
    console.log('');
    return true;
};
exports.appFileCheck = appFileCheck;
//# sourceMappingURL=validator.js.map