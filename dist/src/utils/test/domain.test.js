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
const string_1 = require("../string");
(0, globals_1.describe)('Utils', () => {
    (0, globals_1.describe)('Domain', () => {
        (0, globals_1.test)('Should be "false" when setting invalid domain name', () => __awaiter(void 0, void 0, void 0, function* () {
            const domain = '127.0.0:8080';
            (0, globals_1.expect)((0, string_1.isDomain)(domain)).toBe(false);
        }));
        (0, globals_1.test)('Should be "true" when setting valid domain name', () => __awaiter(void 0, void 0, void 0, function* () {
            const domain = 'sdd-demo.cybozu.com';
            (0, globals_1.expect)((0, string_1.isDomain)(domain)).toBe(true);
        }));
    });
});
//# sourceMappingURL=domain.test.js.map