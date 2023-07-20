"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifestJSONConfig = exports.updateManifestJSON = exports.buildAppImplement = exports.getFileSync = exports.appFileCheckImplement = exports.buildCommandHandle = exports.buildCommandImplement = void 0;
const fs_1 = require("fs");
const builder_1 = require("./builder");
const chalk_1 = __importDefault(require("chalk"));
const validator_1 = require("./validator");
const buildCommandImplement = (cmd) => {
    try {
        const config = (0, exports.getFileSync)(cmd.appName);
        (0, exports.buildCommandHandle)({
            config,
            isBuildWebpack: (0, fs_1.existsSync)(`${config.appName}/webpack.config.js`)
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.buildCommandImplement = buildCommandImplement;
const buildCommandHandle = ({ config, isBuildWebpack }) => {
    const isNotError = (0, exports.buildAppImplement)({
        config,
        isBuildWebpack: isBuildWebpack
    });
    (0, exports.appFileCheckImplement)({
        isNotError,
        appName: config.appName
    });
};
exports.buildCommandHandle = buildCommandHandle;
const appFileCheckImplement = ({ isNotError, appName }) => {
    if (!isNotError)
        return false;
    console.log('');
    console.log(chalk_1.default.yellow('Build app complete.'));
    (0, validator_1.appFileCheck)({ appName, isExistsSync: (0, fs_1.existsSync)(`${appName}/auth.json`) });
    return true;
};
exports.appFileCheckImplement = appFileCheckImplement;
const getFileSync = (appName) => (0, fs_1.readFileSync)(`${appName}/config.json`);
exports.getFileSync = getFileSync;
const buildAppImplement = ({ config, isBuildWebpack }) => {
    if (isBuildWebpack) {
        (0, builder_1.buildUsingWebpack)(config);
    }
    else {
        if (config.type === 'Customization') {
            console.log(chalk_1.default.red('No webpack.config.js'));
            return false;
        }
        (0, builder_1.buildVanillaJS)(config);
    }
    if (config.type === 'Plugin') {
        (0, builder_1.buildPlugin)(config);
    }
    return true;
};
exports.buildAppImplement = buildAppImplement;
const updateManifestJSON = ({ manifestJSON, option }) => {
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
        (0, exports.manifestJSONConfig)({
            manifestJSON,
            htmlContent: (0, fs_1.readFileSync)(manifestJSON.config.html, 'utf-8')
        });
    }
};
exports.updateManifestJSON = updateManifestJSON;
const manifestJSONConfig = ({ manifestJSON, htmlContent }) => {
    if (!htmlContent)
        delete manifestJSON.config;
};
exports.manifestJSONConfig = manifestJSONConfig;
//# sourceMappingURL=helper.js.map