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
const validator_1 = __importDefault(require("../validator"));
(0, globals_1.describe)('Initialize command', () => {
    (0, globals_1.describe)('Preset', () => {
        (0, globals_1.test)('Should be "Invalid Preset" when setting invalid preset', () => __awaiter(void 0, void 0, void 0, function* () {
            const params = {
                type: 'Customization',
                preset: 'invalid preset'
            };
            const errorMessage = validator_1.default.appValidator(params);
            (0, globals_1.expect)(errorMessage).toEqual('Invalid Preset');
        }));
    });
});
//# sourceMappingURL=preset.test.js.map