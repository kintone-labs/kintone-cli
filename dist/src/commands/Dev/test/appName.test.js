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
const devCommand_1 = __importDefault(require("../devCommand"));
const constant_1 = require("../../../../unit_test/constant");
const helper_1 = require("../../../../unit_test/helper");
const validator_1 = __importDefault(require("../validator"));
const initializeTestProject = () => __awaiter(void 0, void 0, void 0, function* () {
    const projectName = (0, helper_1.getRandomProjectName)();
    const currentDir = `${constant_1.DIR_BUILD_PATH}/${projectName}/${constant_1.APP_NAME}`;
    const webpackDir = `${currentDir}/webpack.config.js`;
    yield (0, helper_1.initProject)(constant_1.DIR_BUILD_PATH, projectName);
    yield (0, helper_1.createTemplate)(constant_1.DIR_BUILD_PATH, projectName);
    return webpackDir;
});
(0, globals_1.describe)('Dev command', () => {
    (0, globals_1.describe)('App name', () => {
        (0, globals_1.test)('Should be "test-app" when setting the value "test-app"', () => __awaiter(void 0, void 0, void 0, function* () {
            const options = ['node', 'dev', '--app-name', constant_1.APP_NAME];
            const webpackDir = yield initializeTestProject();
            (0, helper_1.authCommandImplement)(commander_1.program, process);
            process.argv = options;
            const mainProgram = (0, devCommand_1.default)(commander_1.program);
            (0, jsonfile_1.writeFileSync)(webpackDir, constant_1.WEBPACK_CONTENT);
            yield mainProgram.parseAsync(process.argv);
            (0, globals_1.expect)(mainProgram.opts().appName).toEqual('test-app');
        }));
        (0, globals_1.test)('Should be "" when setting the value ""', () => __awaiter(void 0, void 0, void 0, function* () {
            const options = ['node', 'dev', '--app-name', ''];
            const webpackDir = yield initializeTestProject();
            const mainProgram = (0, devCommand_1.default)(commander_1.program);
            process.argv = options;
            (0, jsonfile_1.writeFileSync)(webpackDir, constant_1.WEBPACK_CONTENT);
            yield mainProgram.parseAsync(process.argv);
            (0, globals_1.expect)(mainProgram.opts().appName).toEqual('');
        }));
        (0, globals_1.test)('Should be "App name missing" when setting ""', () => __awaiter(void 0, void 0, void 0, function* () {
            const params = { appName: '' };
            const isValidAppName = validator_1.default.devValidator(params);
            (0, globals_1.expect)(isValidAppName).toBe('App name missing');
        }));
        (0, globals_1.test)('Should display the message "App not existed" when setting app name does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const params = { appName: 'not-existed-app' };
            const isValidAppName = validator_1.default.devValidator(params);
            (0, globals_1.expect)(isValidAppName).toEqual('App not existed');
        }));
    });
});
//# sourceMappingURL=appName.test.js.map