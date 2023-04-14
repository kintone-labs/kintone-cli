"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devPlugin = exports.devCustomize = void 0;
const deployer_1 = require("../Deploy/deployer");
const fs_1 = require("fs");
const spawn = require("cross-spawn");
const chalk_1 = require("chalk");
const builder_1 = require("../Build/builder");
const spawnSync = spawn.sync;
const cleanExit = (ws) => {
    ws.kill();
    process.exit();
};
const devCustomize = (ws, config) => {
    // Attaching links to kintone
    console.log(chalk_1.default.yellow('Attaching links to kintone...'));
    try {
        (0, deployer_1.deployCustomization)(config);
    }
    catch (error) {
        console.log(chalk_1.default.red(error));
        cleanExit(ws);
    }
    if (!config.watch) {
        console.log(chalk_1.default.yellow('All done. Happy customizing!'));
        console.log(chalk_1.default.yellow('Press Ctrl + C to stop local web server.'));
    }
    else if ((0, fs_1.existsSync)(`${config.appName}/webpack.config.js`)) {
        console.log(chalk_1.default.yellow('Watching for changes...'));
        spawnSync('npm', [
            'run',
            `build-${config.appName}`,
            '--',
            '--watch',
            '--mode',
            'development'
        ], { stdio: 'inherit' });
    }
};
exports.devCustomize = devCustomize;
const devPlugin = (ws, config) => {
    console.log(chalk_1.default.yellow('Building plugin...'));
    try {
        (0, builder_1.buildPlugin)(config);
        (0, deployer_1.deployPlugin)(config);
    }
    catch (error) {
        console.log(chalk_1.default.red(error));
        cleanExit(ws);
    }
    if (!config.watch) {
        console.log(chalk_1.default.yellow('All done. Happy customizing!'));
        console.log(chalk_1.default.yellow('Press Ctrl + C to stop local web server.'));
    }
    else if ((0, fs_1.existsSync)(`${config.appName}/webpack.config.js`)) {
        console.log(chalk_1.default.yellow('Watching for changes...'));
        spawnSync('npm', [
            'run',
            `build-${config.appName}`,
            '--',
            '--watch',
            '--mode',
            'development'
        ], { stdio: 'inherit' });
    }
};
exports.devPlugin = devPlugin;
//# sourceMappingURL=devGenerator.js.map