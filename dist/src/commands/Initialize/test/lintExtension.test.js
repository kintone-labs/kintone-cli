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
(0, globals_1.describe)('Initialize command', () => {
    const appOption = { useReact: true, useTypescript: true };
    (0, globals_1.describe)('Lint extension', () => {
        (0, globals_1.test)('Should be .tsx when using React and TypeScript', () => __awaiter(void 0, void 0, void 0, function* () {
            const fileExtension = (0, generator_1.getLintedExtension)(appOption);
            (0, globals_1.expect)(fileExtension).toBe('.tsx');
        }));
        (0, globals_1.test)('Should be .jsx when using React but not using TypeScript', () => __awaiter(void 0, void 0, void 0, function* () {
            appOption.useTypescript = false;
            const fileExtension = (0, generator_1.getLintedExtension)(appOption);
            (0, globals_1.expect)(fileExtension).toBe('.jsx');
        }));
        (0, globals_1.test)('Should be .ts when not using React but using TypeScript', () => __awaiter(void 0, void 0, void 0, function* () {
            appOption.useReact = false;
            appOption.useTypescript = true;
            const fileExtension = (0, generator_1.getLintedExtension)(appOption);
            (0, globals_1.expect)(fileExtension).toBe('.ts');
        }));
        (0, globals_1.test)('Should be .js when neither React nor TypeScript is used', () => __awaiter(void 0, void 0, void 0, function* () {
            appOption.useReact = false;
            appOption.useTypescript = false;
            const fileExtension = (0, generator_1.getLintedExtension)(appOption);
            (0, globals_1.expect)(fileExtension).toBe('.js');
        }));
    });
});
//# sourceMappingURL=lintExtension.test.js.map