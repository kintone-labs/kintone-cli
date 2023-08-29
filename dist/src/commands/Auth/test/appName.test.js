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
const authCommand_1 = __importDefault(require("../authCommand"));
const validator_1 = require("../validator");
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
    const options = [
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
    (0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield initializeTestProject(options);
    }));
    (0, globals_1.describe)('App name', () => {
        (0, globals_1.test)('Should not have an error when setting app name to a valid value', () => __awaiter(void 0, void 0, void 0, function* () {
            const params = { appName: constant_1.APP_NAME };
            const isError = (0, validator_1.authValidator)(params);
            (0, globals_1.expect)(isError).toBe(false);
        }));
        (0, globals_1.test)('Should be "App name missing" when setting app name to a empty value', () => __awaiter(void 0, void 0, void 0, function* () {
            const params = {};
            const isError = (0, validator_1.authValidator)(params);
            (0, globals_1.expect)(isError).toEqual('App name missing.');
        }));
    });
});
//# sourceMappingURL=appName.test.js.map