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
exports.initializeTestProject = void 0;
const globals_1 = require("@jest/globals");
const commander_1 = require("commander");
const constant_1 = require("../../../../unit_test/constant");
const helper_1 = require("../../../../unit_test/helper");
const lintCommand_1 = __importDefault(require("../lintCommand"));
const jsonfile_1 = require("jsonfile");
const initializeTestProject = () => __awaiter(void 0, void 0, void 0, function* () {
    const projectName = (0, helper_1.getRandomProjectName)();
    const currentDir = `${constant_1.DIR_BUILD_PATH}/${projectName}`;
    yield (0, helper_1.initProject)(constant_1.DIR_BUILD_PATH, projectName);
    yield (0, helper_1.createTemplateNotQuick)(projectName);
    return {
        mainProgram: (0, lintCommand_1.default)(commander_1.program),
        currentDir
    };
});
exports.initializeTestProject = initializeTestProject;
(0, globals_1.describe)('Lint command', () => {
    (0, globals_1.describe)('Fix option', () => {
        (0, globals_1.test)('Should be have "lint-test-app-fix" when setting lint with --fix', () => __awaiter(void 0, void 0, void 0, function* () {
            const initTest = yield (0, exports.initializeTestProject)();
            process.argv = ['node', 'lint', '--fix', '--app-name', constant_1.APP_NAME];
            yield initTest.mainProgram.parseAsync(process.argv);
            const templateFile = (0, jsonfile_1.readFileSync)(`${initTest.currentDir}/package.json`);
            const isLint = `lint-${constant_1.APP_NAME}-fix` in templateFile.scripts;
            (0, globals_1.expect)(isLint).toEqual(true);
        }));
        (0, globals_1.test)('Should be "test-app" when setting "test-app" without the "--fix" option', () => __awaiter(void 0, void 0, void 0, function* () {
            const initTest = yield (0, exports.initializeTestProject)();
            process.argv = ['node', 'lint', '--app-name', 'test-app'];
            yield initTest.mainProgram.parseAsync(process.argv);
            (0, globals_1.expect)(initTest.mainProgram.opts().appName).toEqual('test-app');
        }));
    });
});
//# sourceMappingURL=fixOption.test.js.map