"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPlugin = exports.buildVanillaJS = exports.buildUsingWebpack = void 0;
const spawn = __importStar(require("cross-spawn"));
const jsonfile_1 = require("jsonfile");
const fs_1 = require("fs");
const spawnSync = spawn.sync;
const buildUsingWebpack = (option) => {
    spawnSync('npm', ['run', `build-${option.appName}`], { stdio: 'inherit' });
};
exports.buildUsingWebpack = buildUsingWebpack;
const buildVanillaJS = (option) => {
    // function body
};
exports.buildVanillaJS = buildVanillaJS;
const buildPlugin = (option) => {
    const manifestJSON = {};
    manifestJSON.manifest_version = 1;
    manifestJSON.version = 1;
    manifestJSON.type = 'APP';
    manifestJSON.icon = option.uploadConfig.icon;
    manifestJSON.name = {
        en: option.appName
    };
    if (option.uploadConfig && option.uploadConfig.name)
        manifestJSON.name = option.uploadConfig.name;
    manifestJSON.description = {
        en: 'Kintone Plugin'
    };
    if (option.uploadConfig && option.uploadConfig.description)
        manifestJSON.description = option.uploadConfig.description;
    if (option.uploadConfig && option.uploadConfig.version)
        manifestJSON.version = option.uploadConfig.version;
    manifestJSON.desktop = option.uploadConfig.desktop;
    manifestJSON.mobile = option.uploadConfig.mobile;
    manifestJSON.config = option.uploadConfig.config;
    if (manifestJSON.config.required_params &&
        manifestJSON.config.required_params.length === 0)
        delete manifestJSON.config.required_params;
    if (manifestJSON.config && manifestJSON.config.html) {
        const htmlContent = (0, fs_1.readFileSync)(manifestJSON.config.html, 'utf-8');
        if (!htmlContent)
            delete manifestJSON.config;
    }
    (0, jsonfile_1.writeFileSync)(`manifest.json`, manifestJSON, { spaces: 2, EOL: '\r\n' });
    const paramArr = ['./', '--out', `${option.appName}/dist/plugin.zip`];
    if ((0, fs_1.existsSync)(`${option.appName}/dist/private.ppk`)) {
        paramArr.push('--ppk');
        paramArr.push(`${option.appName}/dist/private.ppk`);
    }
    spawnSync('./node_modules/.bin/kintone-plugin-packer', paramArr, {
        stdio: 'inherit'
    });
    if (!(0, fs_1.existsSync)(`${option.appName}/dist/private.ppk`)) {
        const keyFileName = (0, fs_1.readdirSync)(`${option.appName}/dist`).filter((name) => {
            return /.ppk$/.test(name);
        });
        keyFileName &&
            keyFileName.length &&
            (0, fs_1.renameSync)(`${option.appName}/dist/${keyFileName[0]}`, `${option.appName}/dist/private.ppk`);
    }
    (0, fs_1.unlinkSync)(`manifest.json`);
};
exports.buildPlugin = buildPlugin;
const builder = {
    buildUsingWebpack: buildUsingWebpack,
    buildVanillaJS: buildVanillaJS,
    buildPlugin: buildPlugin
};
exports.default = builder;
//# sourceMappingURL=builder.js.map