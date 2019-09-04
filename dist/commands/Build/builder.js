"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spawn = require("cross-spawn");
const jsonfile_1 = require("jsonfile");
const fs_1 = require("fs");
const spawnSync = spawn.sync;
const buildUsingWebpack = (option) => {
    spawnSync('npm', ['run', `build-${option['appName']}`], { stdio: 'inherit' });
};
exports.buildUsingWebpack = buildUsingWebpack;
const buildVanillaJS = (option) => {
};
exports.buildVanillaJS = buildVanillaJS;
const buildPlugin = (option) => {
    let manifestJSON = {};
    manifestJSON['manifest_version'] = 1;
    manifestJSON['version'] = 1;
    manifestJSON['type'] = 'APP';
    manifestJSON['icon'] = option['icon'];
    manifestJSON['name'] = {
        "en": option['appName']
    };
    manifestJSON['description'] = {
        "en": "Kintone Plugin"
    };
    manifestJSON['desktop'] = option['uploadConfig']['desktop'];
    manifestJSON['mobile'] = option['uploadConfig']['mobile'];
    manifestJSON['config'] = option['uploadConfig']['config'];
    jsonfile_1.writeFileSync(`manifest.json`, manifestJSON, { spaces: 4, EOL: "\r\n" });
    let paramArr = ['./', '--out', `${option['appName']}/dist/plugin.zip`];
    if (fs_1.existsSync(`${option['appName']}/dist/private.ppk`)) {
        paramArr.push('--ppk');
        paramArr.push(`${option['appName']}/dist/private.ppk`);
    }
    spawnSync('./node_modules/.bin/kintone-plugin-packer', paramArr, {
        stdio: 'inherit'
    });
    if (!fs_1.existsSync(`${option['appName']}/dist/private.ppk`)) {
        let keyFileName = fs_1.readdirSync(`${option['appName']}/dist`).filter((name) => {
            return /.ppk$/.test(name);
        });
        fs_1.renameSync(`${option['appName']}/dist/${keyFileName[0]}`, `${option['appName']}/dist/private.ppk`);
        //console.log(keyFileName)
    }
    fs_1.unlinkSync(`manifest.json`);
};
exports.buildPlugin = buildPlugin;
const builder = {
    buildUsingWebpack: buildUsingWebpack,
    buildVanillaJS: buildVanillaJS,
    buildPlugin: buildPlugin
};
exports.default = builder;
//# sourceMappingURL=builder.js.map