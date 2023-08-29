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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataTest = exports.devCommandInit = exports.dataInitDevCommand = void 0;
const globals_1 = require("@jest/globals");
const commander_1 = require("commander");
const cross_spawn_1 = __importDefault(require("cross-spawn"));
const jsonfile_1 = require("jsonfile");
const devCommand_1 = __importStar(require("../devCommand"));
const constant_1 = require("../../../constant");
const constant_2 = require("../../../../unit_test/constant");
const helper_1 = require("../../../../unit_test/helper");
const dataInitDevCommand = ({ process, watch }) => {
    const commandConfig = {
        appName: constant_2.APP_NAME,
        localhost: 'https://domain.kintone.com',
        watch: watch
    };
    const responseMessage = 'Serving at';
    const webpackDevServer = (0, cross_spawn_1.default)('npm', ['run', 'dev', '--', '--https']);
    process.exit = globals_1.jest.fn(() => {
        const err = new Error('An error has occurred');
        throw err;
    });
    return {
        webpackDevServer,
        commandConfig,
        responseMessage
    };
};
exports.dataInitDevCommand = dataInitDevCommand;
const devCommandInit = (typeProject = 'Customization') => __awaiter(void 0, void 0, void 0, function* () {
    const OPTIONS = ['node', 'dev', '--app-name', constant_2.APP_NAME];
    const projectName = (0, helper_1.getRandomProjectName)();
    const currentDir = `${constant_2.DIR_BUILD_PATH}/${projectName}/${constant_2.APP_NAME}`;
    yield (0, helper_1.initProject)(constant_2.DIR_BUILD_PATH, projectName);
    yield (0, helper_1.createTemplateWithType)(projectName, typeProject, true);
    yield (0, helper_1.authCommandImplement)(commander_1.program, process);
    process.argv = OPTIONS;
    const mainProgram = (0, devCommand_1.default)(commander_1.program);
    yield mainProgram.parseAsync(process.argv);
    return currentDir;
});
exports.devCommandInit = devCommandInit;
const dataTest = (dataInit = []) => [
    ...dataInit,
    'https://exmaple-abc.com',
    'test-app/source/js/script.js'
];
exports.dataTest = dataTest;
(0, globals_1.describe)('Dev command', () => {
    const readLineAsyncParam = globals_1.jest.fn();
    (0, globals_1.describe)('Upload config', () => {
        (0, globals_1.test)('Should be "https://exmaple-abc.com" when setting the value to "https://exmaple-abc.com"', () => __awaiter(void 0, void 0, void 0, function* () {
            const currentDir = yield (0, exports.devCommandInit)();
            const config = (0, jsonfile_1.readFileSync)(`${currentDir}/config.json`);
            const uploadConfig = config.uploadConfig;
            uploadConfig.desktop.js = ['https://exmaple-abc.com'];
            uploadConfig.desktop.css = (0, exports.dataTest)(uploadConfig.desktop.css);
            uploadConfig.mobile.js = (0, exports.dataTest)(uploadConfig.mobile.js);
            (0, jsonfile_1.writeFileSync)(`${currentDir}/config.json`, config, constant_1.WRITE_FILE_OPTIONS);
            const { webpackDevServer, commandConfig, responseMessage } = (0, exports.dataInitDevCommand)({ process, watch: false });
            try {
                yield (0, devCommand_1.devCommandHandle)({
                    ws: webpackDevServer,
                    cmd: commandConfig,
                    data: responseMessage,
                    readLineAsyncParam
                });
                const configUpdated = (0, jsonfile_1.readFileSync)(`${currentDir}/config.json`);
                const domainUpload = configUpdated.uploadConfig.desktop.js.find((item) => item === 'https://exmaple-abc.com');
                (0, globals_1.expect)(domainUpload).toEqual('https://exmaple-abc.com');
            }
            catch (error) {
                (0, globals_1.expect)(error).toEqual(error);
            }
        }));
        (0, globals_1.test)('Should be Plugin when setting type is Plugin', () => __awaiter(void 0, void 0, void 0, function* () {
            const currentDir = yield (0, exports.devCommandInit)('Plugin');
            const config = (0, jsonfile_1.readFileSync)(`${currentDir}/config.json`);
            const uploadConfig = config.uploadConfig;
            uploadConfig.desktop.js = ['https://exmaple-abc.com'];
            uploadConfig.desktop.css = (0, exports.dataTest)(uploadConfig.desktop.css);
            uploadConfig.mobile.js = (0, exports.dataTest)(uploadConfig.mobile.js);
            uploadConfig.config.js = (0, exports.dataTest)(uploadConfig.mobile.js);
            uploadConfig.config.css = (0, exports.dataTest)(uploadConfig.desktop.css);
            (0, jsonfile_1.writeFileSync)(`${currentDir}/config.json`, config, constant_1.WRITE_FILE_OPTIONS);
            const { webpackDevServer, commandConfig, responseMessage } = (0, exports.dataInitDevCommand)({ process, watch: false });
            try {
                yield (0, devCommand_1.devCommandHandle)({
                    ws: webpackDevServer,
                    cmd: commandConfig,
                    data: responseMessage,
                    readLineAsyncParam
                });
                const configUpdated = (0, jsonfile_1.readFileSync)(`${currentDir}/config.json`);
                (0, globals_1.expect)(configUpdated.type).toEqual('Plugin');
            }
            catch (error) {
                (0, globals_1.expect)(error).toEqual(error);
            }
        }));
    });
});
//# sourceMappingURL=uploadConfig.test.js.map