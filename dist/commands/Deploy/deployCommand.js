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
const validator_1 = require("./validator");
const deployCommand = (program) => {
    return program
        .command('deploy')
        .description('Deploy customization/plugin for production')
        .option('--app-name <appName>', 'App name')
        .action((cmd) => __awaiter(void 0, void 0, void 0, function* () {
        const error = (0, validator_1.deployValidator)(cmd);
        if (error && typeof error === 'string') {
            return;
        }
        (0, validator_1.readAndDeployFile)(cmd.appName);
    }));
};
exports.default = deployCommand;
//# sourceMappingURL=deployCommand.js.map