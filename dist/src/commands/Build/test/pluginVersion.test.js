"use strict";
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
const globals_1 = require("@jest/globals");
const commander_1 = require("commander");
const jsonfile_1 = require("jsonfile");
const constant_1 = require("../../../../unit_test/constant");
const helper_1 = require("../../../../unit_test/helper");
const constant_2 = require("../../../constant");
const buildCommand_1 = __importDefault(require("../buildCommand"));
const initTestProject = (version) => __awaiter(void 0, void 0, void 0, function* () {
    const projectName = (0, helper_1.getRandomProjectName)();
    const currentDir = `${constant_1.DIR_BUILD_PATH}/${projectName}/${constant_1.APP_NAME}`;
    yield (0, helper_1.initProject)(constant_1.DIR_BUILD_PATH, projectName);
    yield (0, helper_1.createTemplateWithType)(projectName, constant_1.PROJECT_TYPE.PLUGIN);
    const mainProgram = (0, buildCommand_1.default)(commander_1.program);
    process.argv = constant_1.OPTIONS_BUILD;
    const config = (0, jsonfile_1.readFileSync)(`${currentDir}/config.json`);
    Object.assign(config.uploadConfig, { version });
    (0, jsonfile_1.writeFileSync)(`${currentDir}/auth.json`, constant_2.DECLARE_KINTONE);
    (0, jsonfile_1.writeFileSync)(`${currentDir}/dist/private.ppk`, constant_1.PRIVATE_KEY);
    (0, jsonfile_1.writeFileSync)(`${currentDir}/config.json`, config, constant_2.WRITE_FILE_OPTIONS);
    yield mainProgram.parseAsync(process.argv);
    return currentDir;
});
(0, globals_1.describe)('Build command', () => {
    (0, globals_1.describe)('Plugin version', () => {
        (0, globals_1.test)('Should be "1.0.0" when setting "1.0.0"', () => __awaiter(void 0, void 0, void 0, function* () {
            const appDir = yield initTestProject('1.0.0');
            const config = (0, jsonfile_1.readFileSync)(`${appDir}/config.json`);
            const result = { version: config.uploadConfig.version };
            (0, globals_1.expect)(result).toEqual({ version: '1.0.0' });
        }));
        (0, globals_1.test)('Should be "" when setting ""', () => __awaiter(void 0, void 0, void 0, function* () {
            const appDir = yield initTestProject('');
            const config = (0, jsonfile_1.readFileSync)(`${appDir}/config.json`);
            const result = { version: config.uploadConfig.version };
            (0, globals_1.expect)(result).toEqual({ version: '' });
        }));
    });
});
//# sourceMappingURL=pluginVersion.test.js.map