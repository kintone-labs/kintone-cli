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
const deployCommand_1 = __importDefault(require("../deployCommand"));
const initializeTestProject = (projectType) => __awaiter(void 0, void 0, void 0, function* () {
    const projectName = (0, helper_1.getRandomProjectName)();
    const currentDir = `${constant_1.DIR_BUILD_PATH}/${projectName}/${constant_1.APP_NAME}`;
    yield (0, helper_1.initProject)(constant_1.DIR_BUILD_PATH, projectName);
    yield (0, helper_1.createTemplateWithType)(projectName, projectType);
    const isValidProjectType = Object.values(constant_1.PROJECT_TYPE).includes(projectType);
    if (isValidProjectType || projectType === '') {
        yield (0, helper_1.authCommandImplement)(commander_1.program, process);
    }
    return currentDir;
});
(0, globals_1.describe)('Deploy command', () => {
    (0, globals_1.describe)('App type', () => {
        (0, globals_1.test)('Should be "Plugin" when the project is set to "Plugin"', () => __awaiter(void 0, void 0, void 0, function* () {
            const currentDir = yield initializeTestProject('Plugin');
            const mainProgram = (0, deployCommand_1.default)(commander_1.program);
            process.argv = constant_1.OPTIONS_DEPLOY;
            yield mainProgram.parseAsync(process.argv);
            const config = (0, jsonfile_1.readFileSync)(`${currentDir}/config.json`);
            (0, globals_1.expect)(config.type).toBe('Plugin');
        }));
        (0, globals_1.test)('Should be "Customization" when the project is set to "Customization"', () => __awaiter(void 0, void 0, void 0, function* () {
            const currentDir = yield initializeTestProject('Customization');
            const mainProgram = (0, deployCommand_1.default)(commander_1.program);
            process.argv = constant_1.OPTIONS_DEPLOY;
            yield mainProgram.parseAsync(process.argv);
            const config = (0, jsonfile_1.readFileSync)(`${currentDir}/config.json`);
            (0, globals_1.expect)(config.type).toBe('Customization');
        }));
        (0, globals_1.test)('Should not be deployed when project is set to invalid', () => __awaiter(void 0, void 0, void 0, function* () {
            const currentDir = yield initializeTestProject('invalid_type');
            const mainProgram = (0, deployCommand_1.default)(commander_1.program);
            process.argv = constant_1.OPTIONS_DEPLOY;
            yield mainProgram.parseAsync(process.argv);
            const isExistFile = (0, fs_1.existsSync)(`${currentDir}/config.json`);
            (0, globals_1.expect)(isExistFile).toBe(false);
        }));
        (0, globals_1.test)('Should be "Customization" when the project is set to default', () => __awaiter(void 0, void 0, void 0, function* () {
            const currentDir = yield initializeTestProject('');
            const mainProgram = (0, deployCommand_1.default)(commander_1.program);
            process.argv = constant_1.OPTIONS_DEPLOY;
            yield mainProgram.parseAsync(process.argv);
            const config = (0, jsonfile_1.readFileSync)(`${currentDir}/config.json`);
            (0, globals_1.expect)(config.type).toBe('Customization');
        }));
    });
});
//# sourceMappingURL=appType.test.js.map