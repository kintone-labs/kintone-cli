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
exports.createTemplateNotQuick = exports.authCommandImplement = exports.createTemplateWithArgv = exports.createTemplate = exports.createTemplateWithType = exports.initProjectWithInstall = exports.initProject = exports.getRandomProjectName = void 0;
const commander_1 = require("commander");
const path_1 = __importDefault(require("path"));
const initializeCommand_1 = __importDefault(require("../../src/commands/Initialize/initializeCommand"));
const constant_1 = require("../constant");
const authCommand_1 = __importDefault(require("../../src/commands/Auth/authCommand"));
const getRandomProjectName = () => `${Math.random().toString(36).substring(2, 12)}`;
exports.getRandomProjectName = getRandomProjectName;
function initProject(buildDir, projectName) {
    return __awaiter(this, void 0, void 0, function* () {
        process.chdir(path_1.default.join(buildDir));
        global.currentDir = process.cwd();
        (0, initializeCommand_1.default)(commander_1.program);
        process.argv = [
            'node',
            'dist',
            'init',
            '--quick',
            '--project-name',
            projectName
        ];
        yield commander_1.program.parseAsync(process.argv);
    });
}
exports.initProject = initProject;
function initProjectWithInstall(buildDir, projectName) {
    return __awaiter(this, void 0, void 0, function* () {
        process.chdir(path_1.default.join(buildDir));
        global.currentDir = process.cwd();
        (0, initializeCommand_1.default)(commander_1.program);
        process.argv = [
            'node',
            'dist',
            'init',
            '--install',
            '--quick',
            '--project-name',
            projectName
        ];
        yield commander_1.program.parseAsync(process.argv);
    });
}
exports.initProjectWithInstall = initProjectWithInstall;
function createTemplateWithType(projectName, type, useWebpack = false) {
    return __awaiter(this, void 0, void 0, function* () {
        process.chdir(constant_1.DIR_BUILD_PATH + '/' + projectName);
        global.currentDir = process.cwd();
        (0, initializeCommand_1.default)(commander_1.program);
        process.argv = [
            'node',
            'dist',
            'create-template',
            '--quick',
            '--type',
            type,
            '--app-name',
            'test-app',
            '--app-id',
            '100'
        ];
        if (useWebpack) {
            process.argv = [
                'node',
                'dist',
                'create-template',
                '--type',
                type,
                '--app-name',
                'test-app',
                '--app-id',
                '100',
                '--set-auth',
                'false',
                '--domain',
                'https://test.com',
                '--username',
                'user',
                '--password',
                'user',
                '--proxy',
                'false',
                '--use-react',
                'false',
                '--use-typescript',
                'true',
                '--use-webpack',
                'true',
                '--entry',
                'index.tsx',
                '--use-cybozu-lint',
                'true',
                '--app-id',
                '3',
                '--scope',
                'ALL'
            ];
        }
        yield commander_1.program.parseAsync(process.argv);
    });
}
exports.createTemplateWithType = createTemplateWithType;
function createTemplate(buildDir, projectName) {
    return __awaiter(this, void 0, void 0, function* () {
        process.chdir(buildDir + '/' + projectName);
        global.currentDir = process.cwd();
        (0, initializeCommand_1.default)(commander_1.program);
        process.argv = [
            'node',
            'dist',
            'create-template',
            '--quick',
            '--app-name',
            'test-app',
            '--app-id',
            '100'
        ];
        yield commander_1.program.parseAsync(process.argv);
    });
}
exports.createTemplate = createTemplate;
function createTemplateWithArgv(projectName, argv) {
    return __awaiter(this, void 0, void 0, function* () {
        process.chdir(constant_1.DIR_BUILD_PATH + '/' + projectName);
        global.currentDir = process.cwd();
        (0, initializeCommand_1.default)(commander_1.program);
        process.argv = argv;
        yield commander_1.program.parseAsync(process.argv);
    });
}
exports.createTemplateWithArgv = createTemplateWithArgv;
const authCommandImplement = (authProgramInput, authProcess) => __awaiter(void 0, void 0, void 0, function* () {
    const authProgram = (0, authCommand_1.default)(authProgramInput);
    const AUTH_OPTIONS = [
        'node',
        'auth',
        '--app-name',
        'test-app',
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
    authProcess.argv = AUTH_OPTIONS;
    yield authProgram.parseAsync(authProcess.argv);
});
exports.authCommandImplement = authCommandImplement;
function createTemplateNotQuick(projectName) {
    return __awaiter(this, void 0, void 0, function* () {
        process.chdir(constant_1.DIR_BUILD_PATH + '/' + projectName);
        global.currentDir = process.cwd();
        (0, initializeCommand_1.default)(commander_1.program);
        process.argv = [
            'node',
            'dist',
            'create-template',
            '--type',
            'Customization',
            '--app-name',
            'test-app',
            '--app-id',
            '100',
            '--type',
            'Customization',
            '--set-auth',
            'false',
            '--domain',
            'https://test.com',
            '--username',
            'user',
            '--password',
            'user',
            '--proxy',
            'false',
            '--use-react',
            'false',
            '--use-typescript',
            'true',
            '--use-webpack',
            'true',
            '--entry',
            'index.tsx',
            '--use-cybozu-lint',
            'true',
            '--app-id',
            '3',
            '--scope',
            'ALL'
        ];
        yield commander_1.program.parseAsync(process.argv);
    });
}
exports.createTemplateNotQuick = createTemplateNotQuick;
//# sourceMappingURL=index.js.map