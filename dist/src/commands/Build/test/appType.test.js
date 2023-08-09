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
const fs_1 = require("fs");
const jsonfile_1 = require("jsonfile");
const constant_1 = require("../../../../unit_test/constant");
const helper_1 = require("../../../../unit_test/helper");
const buildCommand_1 = __importDefault(require("../buildCommand"));
const initTestProject = (projectType) => __awaiter(void 0, void 0, void 0, function* () {
    const projectName = (0, helper_1.getRandomProjectName)();
    yield (0, helper_1.initProject)(constant_1.DIR_BUILD_PATH, projectName);
    yield (0, helper_1.createTemplateWithType)(projectName, projectType);
    const mainProgram = (0, buildCommand_1.default)(commander_1.program);
    process.argv = constant_1.OPTIONS_BUILD;
    yield mainProgram.parseAsync(process.argv);
    return `${constant_1.DIR_BUILD_PATH}/${projectName}/${constant_1.APP_NAME}`;
});
(0, globals_1.describe)('build command', () => {
    (0, globals_1.describe)('App type', () => {
        (0, globals_1.test)('Should be "Plugin" when setting "Plugin"', () => __awaiter(void 0, void 0, void 0, function* () {
            const appDir = yield initTestProject(constant_1.PROJECT_TYPE.PLUGIN);
            const config = (0, jsonfile_1.readFileSync)(`${appDir}/config.json`);
            (0, globals_1.expect)(config.type).toBe(constant_1.PROJECT_TYPE.PLUGIN);
        }));
        (0, globals_1.test)('Should be "Customization" when setting "Customization"', () => __awaiter(void 0, void 0, void 0, function* () {
            const appDir = yield initTestProject(constant_1.PROJECT_TYPE.CUSTOMIZATION);
            const config = (0, jsonfile_1.readFileSync)(`${appDir}/config.json`);
            (0, globals_1.expect)(config.type).toBe(constant_1.PROJECT_TYPE.CUSTOMIZATION);
        }));
        (0, globals_1.test)('Should not create the project template when setting invalid type', () => __awaiter(void 0, void 0, void 0, function* () {
            const appDir = yield initTestProject('invalid_type');
            const isExistFile = (0, fs_1.existsSync)(`${appDir}/config.json`);
            (0, globals_1.expect)(isExistFile).toBe(false);
        }));
        (0, globals_1.test)('Should be "Customization" when setting default type', () => __awaiter(void 0, void 0, void 0, function* () {
            const appDir = yield initTestProject('');
            const config = (0, jsonfile_1.readFileSync)(`${appDir}/config.json`);
            (0, globals_1.expect)(config.type).toBe(constant_1.PROJECT_TYPE.CUSTOMIZATION);
        }));
    });
});
//# sourceMappingURL=appType.test.js.map