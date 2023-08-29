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
const helper_1 = require("../../../../unit_test/helper");
const constant_1 = require("../../../../unit_test/constant");
const fs_1 = require("fs");
const initializeCommand_1 = require("../initializeCommand");
const constant_2 = require("../../../constant");
const jsonfile_1 = require("jsonfile");
const validator_1 = __importDefault(require("../validator"));
const initializeTestProject = (argv, initProjectType = helper_1.initProject) => __awaiter(void 0, void 0, void 0, function* () {
    const projectName = (0, helper_1.getRandomProjectName)();
    yield initProjectType(constant_1.DIR_BUILD_PATH, projectName);
    yield (0, helper_1.createTemplateWithArgv)(projectName, argv);
    return projectName;
});
(0, globals_1.describe)('Initialize command', () => {
    (0, globals_1.describe)('App Type', () => {
        (0, globals_1.test)('Should use React template when the preset is set to React', () => __awaiter(void 0, void 0, void 0, function* () {
            const argv = [
                'node',
                'dist',
                'create-template',
                '--quick',
                '--app-name',
                constant_1.APP_NAME,
                '--preset',
                'React',
                '--type',
                'Plugin'
            ];
            const projectName = yield initializeTestProject(argv);
            const template = (0, fs_1.readFileSync)(`${constant_1.DIR_BUILD_PATH}/${projectName}/${constant_1.APP_NAME}/source/index.jsx`, 'utf8');
            const isReactTemplate = template.includes("import * as React from 'react';");
            (0, globals_1.expect)(isReactTemplate).toBe(true);
        }));
        (0, globals_1.test)('Should be exist tsconfig file when the preset is set to ReactTS', () => __awaiter(void 0, void 0, void 0, function* () {
            const argv = [
                'node',
                'dist',
                'create-template',
                '--quick',
                '--app-name',
                constant_1.APP_NAME,
                '--preset',
                'ReactTS'
            ];
            const projectName = yield initializeTestProject(argv);
            (0, jsonfile_1.writeFileSync)(`${constant_1.DIR_BUILD_PATH}/${projectName}/config.json`, constant_1.WEBPACK_CONTENT, constant_2.WRITE_FILE_OPTIONS);
            const doesFileExist = (0, fs_1.existsSync)(`${constant_1.DIR_BUILD_PATH}/${projectName}/test-app/tsconfig.json`);
            (0, globals_1.expect)(doesFileExist).toBe(true);
        }));
        (0, globals_1.test)('Should not be created the folder when setting an invalid scope', () => __awaiter(void 0, void 0, void 0, function* () {
            const argv = [
                'node',
                'dist',
                'create-template',
                '--quick',
                '--preset',
                'React',
                '--type',
                'Customization',
                '--scope',
                'invalid scope'
            ];
            const projectName = yield initializeTestProject(argv);
            const doesFolderExist = (0, fs_1.existsSync)(`${constant_1.DIR_BUILD_PATH}/${projectName}/test-app`);
            (0, globals_1.expect)(doesFolderExist).toBe(false);
        }));
        (0, globals_1.test)('Should not be created the folder when node will be installed and setting an invalid scope', () => __awaiter(void 0, void 0, void 0, function* () {
            const argv = [
                'node',
                'dist',
                'create-template',
                '--quick',
                '--preset',
                'React',
                '--type',
                'Customization',
                '--scope',
                'testScope'
            ];
            const projectName = yield initializeTestProject(argv, helper_1.initProjectWithInstall);
            const doesFolderExist = (0, fs_1.existsSync)(`${constant_1.DIR_BUILD_PATH}/${projectName}/test-app`);
            (0, globals_1.expect)(doesFolderExist).toBe(false);
        }));
        (0, globals_1.test)('Should be undefined when the option is set incorrectly', () => __awaiter(void 0, void 0, void 0, function* () {
            const status = (0, initializeCommand_1.printAppDevelopmentInstructions)({ setAuth: true });
            (0, globals_1.expect)(status).toBe(undefined);
        }));
        (0, globals_1.test)('Should be the setting value same as the answer value"', () => __awaiter(void 0, void 0, void 0, function* () {
            const answer = {
                setAuth: true,
                useTypescript: true,
                useWebpack: true,
                entry: 'index.tsx',
                useReact: true,
                appName: constant_1.APP_NAME,
                domain: 'domain.com',
                username: 'username',
                password: 'password',
                type: 'Customization',
                appID: '100',
                useCybozuLint: true,
                scope: 'ALL',
                proxy: null
            };
            const cmd = {};
            const setting = (0, initializeCommand_1.getAppSetting)(cmd, answer);
            const isEqualValue = JSON.stringify(setting) === JSON.stringify(answer);
            (0, globals_1.expect)(isEqualValue).toBe(true);
        }));
        (0, globals_1.test)('Should be "Invalid App Type" when setting invalid app type', () => __awaiter(void 0, void 0, void 0, function* () {
            const params = { type: 'invalid type' };
            const errorMessage = validator_1.default.appValidator(params);
            (0, globals_1.expect)(errorMessage).toEqual('Invalid App Type');
        }));
    });
});
//# sourceMappingURL=appType.test.js.map