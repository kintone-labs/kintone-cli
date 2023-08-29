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
const webpackTemplate_1 = require("../webpackTemplate");
(0, globals_1.describe)('Initialize command', () => {
    const params = {
        entry: 'entry',
        appName: 'app-name',
        type: 'Plugin'
    };
    (0, globals_1.describe)('Webpack template', () => {
        (0, globals_1.test)('Should have app-name.min.js in output entry when the type is set to "invalid type"', () => __awaiter(void 0, void 0, void 0, function* () {
            const webpackTemplate = (0, webpackTemplate_1.buildWebpackReactTemplate)(Object.assign(Object.assign({}, params), { useTypescript: false, useReact: false, type: 'invalid type' }));
            const doesFileExist = webpackTemplate.includes("filename: 'app-name.min.js'");
            (0, globals_1.expect)(doesFileExist).toBe(true);
        }));
        (0, globals_1.test)('Should have config.min.js in output entry when the type is set to "Plugin"', () => __awaiter(void 0, void 0, void 0, function* () {
            const webpackTemplate = (0, webpackTemplate_1.buildWebpackReactTemplate)(Object.assign(Object.assign({}, params), { useTypescript: false, useReact: false }));
            const doesFileExist = webpackTemplate.includes("filename: 'config.min.js'");
            (0, globals_1.expect)(doesFileExist).toBe(true);
        }));
        (0, globals_1.test)('Should have config.ts file when the "useTypeScript" is set to true', () => __awaiter(void 0, void 0, void 0, function* () {
            const webpackTemplate = (0, webpackTemplate_1.buildWebpackReactTemplate)(Object.assign(Object.assign({}, params), { useTypescript: true, useReact: false }));
            const doesFileExist = webpackTemplate.includes('config.ts');
            (0, globals_1.expect)(doesFileExist).toBe(true);
        }));
        (0, globals_1.test)('Should have rule tsx when both "useReact" and "useTypeScript" settings are set to true', () => __awaiter(void 0, void 0, void 0, function* () {
            const webpackTemplate = (0, webpackTemplate_1.buildWebpackReactTemplate)(Object.assign(Object.assign({}, params), { useTypescript: true, useReact: true }));
            const isRuleTsx = webpackTemplate.includes('test: /.tsx?$/,');
            (0, globals_1.expect)(isRuleTsx).toBe(true);
        }));
        (0, globals_1.test)('Should have rule jsx when the "useReact" is set to true', () => __awaiter(void 0, void 0, void 0, function* () {
            const webpackTemplate = (0, webpackTemplate_1.buildWebpackReactTemplate)(Object.assign(Object.assign({}, params), { useTypescript: false, useReact: true }));
            const isRuleJsx = webpackTemplate.includes('test: /.jsx?$/,');
            (0, globals_1.expect)(isRuleJsx).toBe(true);
        }));
    });
});
//# sourceMappingURL=webpackTemplate.test.js.map