"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spawn = require("cross-spawn");
const jsonfile_1 = require("jsonfile");
const fs_1 = require("fs");
const spawnSync = spawn.sync;
const deployCustomization = (option) => {
    let customizeManifestJSON = {
        app: option['appID'],
        scope: option['scope'],
        desktop: option['uploadConfig']['desktop'],
        mobile: option['uploadConfig']['mobile']
    };
    let paramArr = [`${option['appName']}/dist/customize-manifest.json`];
    let authJSON = jsonfile_1.readFileSync(`${option['appName']}/auth.json`);
    if (authJSON.domain) {
        paramArr.push('--domain');
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
    if (!fs_1.existsSync(`${option['appName']}/dist`)) {
        fs_1.mkdirSync(`${option['appName']}/dist`);
    }
    if (fs_1.existsSync(`${option['appName']}/webpack.config.js`)) {
        spawnSync('npm', ['run', `build-${option['appName']}`, '--', '--mode', 'production'], { stdio: ['ignore', 'ignore', process.stderr] });
    }
    jsonfile_1.writeFileSync(`${option['appName']}/dist/customize-manifest.json`, customizeManifestJSON, { spaces: 2, EOL: '\r\n' });
    spawnSync('./node_modules/.bin/kintone-customize-uploader', paramArr, {
        stdio: 'inherit'
    });
    fs_1.unlinkSync(`${option['appName']}/dist/customize-manifest.json`);
};
exports.deployCustomization = deployCustomization;
const deployPlugin = (option) => {
    let authJSON = jsonfile_1.readFileSync(`${option['appName']}/auth.json`);
    spawnSync('./node_modules/.bin/kintone-plugin-uploader', [
        '--domain', authJSON['domain'],
        '--username', authJSON['username'],
        '--password', authJSON['password'],
        `${option['appName']}/dist/plugin.zip`
    ], {
        stdio: 'inherit'
    });
};
exports.deployPlugin = deployPlugin;
//# sourceMappingURL=deployer.js.map