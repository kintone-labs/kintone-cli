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
const constant_1 = require("../../../../unit_test/constant");
const helper_1 = require("../../../../unit_test/helper");
const buildCommand_1 = __importDefault(require("../buildCommand"));
const initTestProject = () => __awaiter(void 0, void 0, void 0, function* () {
    const projectName = (0, helper_1.getRandomProjectName)();
    yield (0, helper_1.initProject)(constant_1.DIR_BUILD_PATH, projectName);
    yield (0, helper_1.createTemplate)(constant_1.DIR_BUILD_PATH, projectName);
    return (0, buildCommand_1.default)(commander_1.program);
});
(0, globals_1.describe)('build command', () => {
    (0, globals_1.describe)('App name', () => {
        (0, globals_1.test)('Should be "test-app" when setting "test-app"', () => __awaiter(void 0, void 0, void 0, function* () {
            const mainProgram = yield initTestProject();
            process.argv = constant_1.OPTIONS_BUILD;
            yield mainProgram.parseAsync(process.argv);
            (0, globals_1.expect)(mainProgram.opts().appName).toBe('test-app');
        }));
        (0, globals_1.test)('Should be "" when setting ""', () => __awaiter(void 0, void 0, void 0, function* () {
            const OPTIONS_MISS_NAME = ['node', 'build', '--app-name', ''];
            const mainProgram = yield initTestProject();
            process.argv = OPTIONS_MISS_NAME;
            yield mainProgram.parseAsync(process.argv);
            (0, globals_1.expect)(mainProgram.opts().appName).toBe('');
        }));
    });
});
//# sourceMappingURL=appName.test.js.map