"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployPlugin = exports.deployCustomization = void 0;
const spawn = require("cross-spawn");
const jsonfile_1 = require("jsonfile");
const fs_1 = require("fs");
const validator_1 = require("./validator");
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
    (0, validator_1.addParamArrItem)({
        authJSON,
        paramArr
    });
    (0, validator_1.mkdirSyncCheck)({
        isMkdir: (0, fs_1.existsSync)(`${option.appName}/dist`),
        mkdirSyncCallback: () => (0, fs_1.mkdirSync)(`${option.appName}/dist`)
    });
    (0, validator_1.buildCommandImplement)({
        appName: option.appName,
        isExistsFile: (0, fs_1.existsSync)(`${option.appName}/webpack.config.js`)
    });
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