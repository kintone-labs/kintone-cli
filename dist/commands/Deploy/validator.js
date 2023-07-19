"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAndDeployFileImplement = exports.deployCommandImplement = exports.buildCommandImplement = exports.mkdirSyncCheck = exports.addParamArrItem = exports.readAndDeployFile = exports.deployValidator = exports.deployValidatorResult = void 0;
const spawn = require("cross-spawn");
const fs_1 = require("fs");
const constant_1 = require("../../constant");
const deployer_1 = require("./deployer");
const spawnSync = spawn.sync;
const deployValidatorResult = (appName, isExistsFileSync) => {
    if (!appName) {
        return constant_1.ERRORS.APP_NAME_MISSING;
    }
    if (!isExistsFileSync) {
        return constant_1.ERRORS.APP_EXISTED;
    }
    return false;
};
exports.deployValidatorResult = deployValidatorResult;
const deployValidator = (params) => (0, exports.deployValidatorResult)(params.appName, (0, fs_1.existsSync)(params.appName));
exports.deployValidator = deployValidator;
const readAndDeployFile = (params) => {
    try {
        const config = params.config;
        if (params.isExistsSync) {
            config.useWebpack = true;
        }
        if (config.type === 'Customization') {
            (0, deployer_1.deployCustomization)(config);
        }
        else {
            (0, deployer_1.deployPlugin)(config);
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.readAndDeployFile = readAndDeployFile;
const addParamArrItem = ({ authJSON, paramArr }) => {
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
};
exports.addParamArrItem = addParamArrItem;
const mkdirSyncCheck = ({ isMkdir, mkdirSyncCallback }) => !isMkdir && mkdirSyncCallback();
exports.mkdirSyncCheck = mkdirSyncCheck;
const buildCommandImplement = ({ appName, isExistsFile }) => {
    isExistsFile &&
        spawnSync('npm', ['run', `build-${appName}`, '--', '--mode', 'production'], { stdio: ['ignore', 'ignore', process.stderr] });
};
exports.buildCommandImplement = buildCommandImplement;
const deployCommandImplement = ({ error, appName }) => !error && (0, exports.readAndDeployFileImplement)(appName);
exports.deployCommandImplement = deployCommandImplement;
const readAndDeployFileImplement = (appName) => (0, exports.readAndDeployFile)({
    isExistsSync: (0, fs_1.existsSync)(`${appName}/webpack.config.js`),
    config: (0, fs_1.readFileSync)(`${appName}/config.json`)
});
exports.readAndDeployFileImplement = readAndDeployFileImplement;
//# sourceMappingURL=validator.js.map