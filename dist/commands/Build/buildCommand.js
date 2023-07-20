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
const chalk_1 = __importDefault(require("chalk"));
const validator_1 = require("./validator");
const helper_1 = require("./helper");
const buildCommand = (program) => {
    return program
        .command('build')
        .description('Build customization/plugin')
        .option('--app-name <appName>', 'App name')
        .action((cmd) => __awaiter(void 0, void 0, void 0, function* () {
        const error = (0, validator_1.buildValidator)(cmd);
        if (error && typeof error === 'string') {
            console.log(chalk_1.default.red(error));
            return;
        }
        (0, helper_1.buildCommandImplement)(cmd);
    }));
};
exports.default = buildCommand;
//# sourceMappingURL=buildCommand.js.map