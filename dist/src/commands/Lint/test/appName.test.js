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
const constant_1 = require("../../../../unit_test/constant");
const fs_1 = require("fs");
const validator_1 = __importDefault(require("../validator"));
const fixOption_test_1 = require("./fixOption.test");
(0, globals_1.describe)('Lint command', () => {
    (0, globals_1.describe)('App name', () => {
        (0, globals_1.test)('Should display the message "App name missing" when the app name is set to be empty', () => __awaiter(void 0, void 0, void 0, function* () {
            const initTest = yield (0, fixOption_test_1.initializeTestProject)();
            process.argv = ['node', 'lint', '--app-name', ''];
            const params = {};
            yield initTest.mainProgram.parseAsync(process.argv);
            const isValidAppName = validator_1.default.lintValidator(params);
            (0, globals_1.expect)(isValidAppName).toEqual('App name missing');
        }));
        (0, globals_1.test)('Should display the message "App not existed" when setting app name does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const initTest = yield (0, fixOption_test_1.initializeTestProject)();
            process.argv = ['node', 'lint', '--fix', '--app-name', 'test-app'];
            (0, fs_1.rmSync)(initTest.currentDir, { recursive: true, force: true });
            const params = { appName: constant_1.APP_NAME };
            yield initTest.mainProgram.parseAsync(process.argv);
            process.argv = ['node', 'lint', '--app-name', 'test-app'];
            const isValidAppName = validator_1.default.lintValidator(params);
            (0, globals_1.expect)(isValidAppName).toEqual('App not existed');
        }));
    });
});
//# sourceMappingURL=appName.test.js.map