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
const eslintRcTemplate_1 = require("../eslintRcTemplate");
(0, globals_1.describe)('Initialize command', () => {
    (0, globals_1.describe)('Eslint template', () => {
        (0, globals_1.test)('Should be "@cybozu/eslint-config/presets/typescript" when using TypeScript', () => __awaiter(void 0, void 0, void 0, function* () {
            const template = (0, eslintRcTemplate_1.buildEslintRcTemplate)({
                useTypescript: true,
                useWebpack: false,
                useReact: false
            });
            const isTypeScriptUsed = template.includes('@cybozu/eslint-config/presets/typescript');
            (0, globals_1.expect)(isTypeScriptUsed).toBe(true);
        }));
        (0, globals_1.test)('Should be "cybozu/eslint-config/presets/react" when using React', () => __awaiter(void 0, void 0, void 0, function* () {
            const template = (0, eslintRcTemplate_1.buildEslintRcTemplate)({
                useTypescript: false,
                useWebpack: false,
                useReact: true
            });
            const isReactUsed = template.includes('@cybozu/eslint-config/presets/react');
            (0, globals_1.expect)(isReactUsed).toBe(true);
        }));
        (0, globals_1.test)('Should be "@cybozu/eslint-config/presets/react-typescript" when using React and TypeScript', () => __awaiter(void 0, void 0, void 0, function* () {
            const template = (0, eslintRcTemplate_1.buildEslintRcTemplate)({
                useTypescript: true,
                useWebpack: false,
                useReact: true
            });
            const isReactWithTypeScriptUsed = template.includes('@cybozu/eslint-config/presets/react-typescript');
            (0, globals_1.expect)(isReactWithTypeScriptUsed).toBe(true);
        }));
        (0, globals_1.test)('Should be "es6" when environment is not set', () => __awaiter(void 0, void 0, void 0, function* () {
            const template = (0, eslintRcTemplate_1.buildEslintRcTemplate)({
                useTypescript: false,
                useWebpack: false,
                useReact: false
            });
            const isEs6Used = template.includes('es6');
            (0, globals_1.expect)(isEs6Used).toBe(true);
        }));
    });
});
//# sourceMappingURL=eslintTemplate.test.js.map