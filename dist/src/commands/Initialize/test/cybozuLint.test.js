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
const jsonfile_1 = require("jsonfile");
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
    (0, globals_1.describe)('Cybozu lint', () => {
        (0, globals_1.test)('Should be undefined when Cybozu Lint is not used', () => __awaiter(void 0, void 0, void 0, function* () {
            yield initializeTestProject();
            const packageJSON = {
                name: constant_1.APP_NAME,
                version: '1.0.0',
                description: 'kintone customization project',
                author: '',
                license: 'MIT',
                dependencies: {
                    '@kintone/kintone-ui-component': '^0.9.4',
                    '@kintone/rest-api-client': '^4.0.3'
                },
                devDependencies: {
                    'local-web-server': '^2.6.1',
                    '@kintone/plugin-packer': '^7.0.4',
                    '@kintone/plugin-uploader': '8.0.0'
                },
                scripts: {
                    dev: 'ws'
                }
            };
            const cybozuLint = (0, generator_1.configureCybozuLint)(appOption, packageJSON);
            (0, globals_1.expect)(cybozuLint).toBe(undefined);
        }));
        (0, globals_1.test)('Should be true when Cybozu Lint is used', () => __awaiter(void 0, void 0, void 0, function* () {
            const initTest = yield initializeTestProject();
            appOption.useCybozuLint = true;
            const packageJSON = {
                name: constant_1.APP_NAME,
                version: '1.0.0',
                description: 'kintone customization project',
                author: '',
                license: 'MIT',
                dependencies: {
                    '@kintone/kintone-ui-component': '^0.9.4'
                },
                devDependencies: {
                    'local-web-server': '^2.6.1'
                },
                scripts: {
                    dev: 'ws'
                }
            };
            (0, generator_1.configureCybozuLint)(appOption, packageJSON);
            const packageInstalled = (0, jsonfile_1.readFileSync)(`${initTest.currentDir}/package.json`);
            const isCybozuLintInstalled = '@cybozu/eslint-config' in packageInstalled.devDependencies;
            (0, globals_1.expect)(isCybozuLintInstalled).toBe(true);
        }));
    });
});
//# sourceMappingURL=cybozuLint.test.js.map