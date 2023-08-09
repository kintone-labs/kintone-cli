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
exports.createTemplate = exports.createTemplateWithType = exports.initProject = exports.getRandomProjectName = void 0;
const commander_1 = require("commander");
const path_1 = __importDefault(require("path"));
const initializeCommand_1 = __importDefault(require("../../dist/commands/Initialize/initializeCommand"));
const constant_1 = require("../constant");
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
function createTemplateWithType(projectName, type) {
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
//# sourceMappingURL=index.js.map