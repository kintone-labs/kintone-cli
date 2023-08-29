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
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const commander_1 = require("commander");
const jsonfile_1 = require("jsonfile");
const constant_1 = require("../../../../unit_test/constant");
const helper_1 = require("../../../../unit_test/helper");
const constant_2 = require("../../../constant");
const devCommand_1 = __importStar(require("../devCommand"));
const initTestProject = () => __awaiter(void 0, void 0, void 0, function* () {
    const projectName = (0, helper_1.getRandomProjectName)();
    const OPTIONS = ['node', 'dev', '--app-name', constant_1.APP_NAME];
    const current_dir = `${constant_1.DIR_BUILD_PATH}/${projectName}/${constant_1.APP_NAME}`;
    yield (0, helper_1.initProject)(constant_1.DIR_BUILD_PATH, projectName);
    yield (0, helper_1.createTemplate)(constant_1.DIR_BUILD_PATH, projectName);
    const mainProgram = (0, devCommand_1.default)(commander_1.program);
    process.argv = OPTIONS;
    yield mainProgram.parseAsync(process.argv);
    const config = (0, jsonfile_1.readFileSync)(`${current_dir}/config.json`);
    const dataTest = (dataInit) => [
        ...dataInit,
        'https://exmaple-abc.com',
        'test-app/source/js/script.js'
    ];
    config.uploadConfig.desktop.js = dataTest(config.uploadConfig.desktop.js);
    config.uploadConfig.desktop.css = dataTest(config.uploadConfig.desktop.css);
    config.uploadConfig.mobile.js = dataTest(config.uploadConfig.mobile.js);
    (0, jsonfile_1.writeFileSync)(`${current_dir}/config.json`, config, constant_2.WRITE_FILE_OPTIONS);
});
(0, globals_1.describe)('Dev command', () => {
    (0, globals_1.describe)('Localhost address', () => {
        (0, globals_1.test)('Should be "" when setting the value to ""', () => __awaiter(void 0, void 0, void 0, function* () {
            yield initTestProject();
            const resp = '';
            const loopBackAddress = yield (0, devCommand_1.getLoopBackAddress)(resp, true);
            (0, globals_1.expect)(loopBackAddress).toEqual('');
        }));
        (0, globals_1.test)('Should be "" when setting the value to "Serving at"', () => __awaiter(void 0, void 0, void 0, function* () {
            yield initTestProject();
            const resp = 'Serving at';
            const loopBackAddress = yield (0, devCommand_1.getLoopBackAddress)(resp, true);
            (0, globals_1.expect)(loopBackAddress).toEqual('');
        }));
        (0, globals_1.test)('Should be "https://domain.kintone.com" setting the value to "https://domain.kintone.com"', () => __awaiter(void 0, void 0, void 0, function* () {
            yield initTestProject();
            const resp = 'Serving at,https://domain.kintone.com';
            const loopBackAddress = yield (0, devCommand_1.getLoopBackAddress)(resp, true);
            (0, globals_1.expect)(loopBackAddress).toEqual('https://domain.kintone.com');
        }));
        (0, globals_1.test)('Should be "https://127.0.0.1:8000" setting the value to "https://127.0.0.1:8000"', () => __awaiter(void 0, void 0, void 0, function* () {
            yield initTestProject();
            const resp = 'Serving at,https://127.0.0.1:8000';
            const loopBackAddress = yield (0, devCommand_1.getLoopBackAddress)(resp, true);
            (0, globals_1.expect)(loopBackAddress).toEqual('https://127.0.0.1:8000');
        }));
    });
});
//# sourceMappingURL=localhost.test.js.map