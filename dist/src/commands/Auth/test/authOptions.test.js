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
const commander_1 = require("commander");
const globals_1 = require("@jest/globals");
const authCommand_1 = __importDefault(require("../authCommand"));
const helper_1 = require("../../../../unit_test/helper");
const constant_1 = require("../../../../unit_test/constant");
const AUTH_OPTIONS = [
    'node',
    'auth',
    '--app-name',
    constant_1.APP_NAME,
    '--domain',
    'https://domain.kintone.com',
    '--app-id',
    '100',
    '--username',
    'user',
    '--password',
    'password',
    '--use-proxy',
    '--proxy',
    'http://localhost:8080'
];
const initializeTestProject = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const projectName = (0, helper_1.getRandomProjectName)();
    const mainProgram = (0, authCommand_1.default)(commander_1.program);
    yield (0, helper_1.initProject)(constant_1.DIR_BUILD_PATH, projectName);
    yield (0, helper_1.createTemplate)(constant_1.DIR_BUILD_PATH, projectName);
    process.argv = options;
    yield mainProgram.parseAsync(process.argv);
    return mainProgram;
});
(0, globals_1.describe)('Auth command', () => {
    let mainProgram;
    (0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        mainProgram = yield initializeTestProject(AUTH_OPTIONS);
    }));
    (0, globals_1.describe)('Options', () => {
        (0, globals_1.test)('should have appName set to "test-app"', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, globals_1.expect)(mainProgram.opts().appName).toBe('test-app');
        }));
        (0, globals_1.test)('should have domain set to "https://domain.kintone.com"', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, globals_1.expect)(mainProgram.opts().domain).toBe('https://domain.kintone.com');
        }));
        (0, globals_1.test)('should have username set to "user"', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, globals_1.expect)(mainProgram.opts().username).toBe('user');
        }));
        (0, globals_1.test)('should have password set to "password"', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, globals_1.expect)(mainProgram.opts().password).toBe('password');
        }));
        (0, globals_1.test)('should have appId set to "100"', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, globals_1.expect)(mainProgram.opts().appId).toBe('100');
        }));
        (0, globals_1.test)('should have userProxy set to "true"', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, globals_1.expect)(mainProgram.opts().useProxy).toBe(true);
        }));
        (0, globals_1.test)('should have proxy set to "http://localhost:8080"', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, globals_1.expect)(mainProgram.opts().proxy).toBe('http://localhost:8080');
        }));
    });
});
//# sourceMappingURL=authOptions.test.js.map