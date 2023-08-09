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
exports.deployPlugin = exports.deployCustomization = void 0;
const spawn = __importStar(require("cross-spawn"));
const jsonfile_1 = require("jsonfile");
const fs_1 = require("fs");
const spawnSync = spawn.sync;
const deployCustomization = (option) => {
    const customizeManifestJSON = {
        app: option.appID,
        scope: option.scope,
        desktop: option.uploadConfig.desktop,
        mobile: option.uploadConfig.mobile
    };
    const paramArr = [`${option.appName}/dist/customize-manifest.json`];
    const authJSON = (0, jsonfile_1.readFileSync)(`${option.appName}/auth.json`);
    if (authJSON.domain) {
        paramArr.push('--base-url');
        paramArr.push(authJSON.domain);
    }
    if (authJSON.username) {
        paramArr.push('--username');
        paramArr.push(authJSON.username);
        paramArr.push('--basic-auth-username');
        paramArr.push(authJSON.username);
    }
    if (authJSON.password) {
        paramArr.push('--password');
        paramArr.push(authJSON.password);
        paramArr.push('--basic-auth-password');
        paramArr.push(authJSON.password);
    }
    if (authJSON.proxy) {
        paramArr.push('--proxy');
        paramArr.push(authJSON.proxy);
    }
    if (!(0, fs_1.existsSync)(`${option.appName}/dist`)) {
        (0, fs_1.mkdirSync)(`${option.appName}/dist`);
    }
    if ((0, fs_1.existsSync)(`${option.appName}/webpack.config.js`)) {
        spawnSync('npm', ['run', `build-${option.appName}`, '--', '--mode', 'production'], { stdio: ['ignore', 'ignore', process.stderr] });
    }
    (0, jsonfile_1.writeFileSync)(`${option.appName}/dist/customize-manifest.json`, customizeManifestJSON, { spaces: 2, EOL: '\r\n' });
    spawnSync('./node_modules/.bin/kintone-customize-uploader', paramArr, {
        stdio: 'inherit'
    });
    (0, fs_1.unlinkSync)(`${option.appName}/dist/customize-manifest.json`);
};
exports.deployCustomization = deployCustomization;
const deployPlugin = (option) => {
    const authJSON = (0, jsonfile_1.readFileSync)(`${option.appName}/auth.json`);
    spawnSync('./node_modules/.bin/kintone-plugin-uploader', [
        '--base-url',
        authJSON.domain,
        '--username',
        authJSON.username,
        '--password',
        authJSON.password,
        `${option.appName}/dist/plugin.zip`
    ], {
        stdio: 'inherit'
    });
};
exports.deployPlugin = deployPlugin;
//# sourceMappingURL=deployer.js.map