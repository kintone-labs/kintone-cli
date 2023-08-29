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
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const generator_1 = require("../generator");
const helper_1 = require("../../../../unit_test/helper");
const constant_1 = require("../../../../unit_test/constant");
const initializeTestProject = (initProjectType = helper_1.initProject) => __awaiter(void 0, void 0, void 0, function* () {
    const projectName = (0, helper_1.getRandomProjectName)();
    const currentDir = `${constant_1.DIR_BUILD_PATH}/${projectName}`;
    yield initProjectType(constant_1.DIR_BUILD_PATH, projectName);
    const argv = [
        'node',
        'dist',
        'create-template',
        '--quick',
        '--app-name',
        constant_1.APP_NAME,
        '--app-id',
        '100'
    ];
    yield (0, helper_1.createTemplateWithArgv)(projectName, argv);
    return { projectName, currentDir };
});
(0, globals_1.describe)('Initialize command', () => {
    const appOption = {
        appName: constant_1.APP_NAME,
        type: 'Customization',
        appID: '100',
        scope: 'ALL'
    };
    (0, globals_1.describe)('App Folder', () => {
        (0, globals_1.test)('Should create a folder when the app option is set correctly', () => __awaiter(void 0, void 0, void 0, function* () {
            yield initializeTestProject();
            appOption.setAuth = true;
            appOption.appName = 'test-app-1';
            appOption.useCybozuLint = true;
            const creationSuccessful = (0, generator_1.generateAppFolder)(appOption);
            (0, globals_1.expect)(creationSuccessful).toBe(false);
        }));
        (0, globals_1.test)('Should display "App folder existed." when the app name already exists', () => __awaiter(void 0, void 0, void 0, function* () {
            appOption.useCybozuLint = true;
            appOption.appName = 'test-app-1';
            const errorMessage = (0, generator_1.generateAppFolder)(appOption);
            (0, globals_1.expect)(errorMessage).toBe('App folder existed.');
        }));
    });
});
//# sourceMappingURL=appFolder.test.js.map