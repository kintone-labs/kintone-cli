"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const child_process_1 = require("child_process");
const lintCommand = (program) => {
    program
        .command('lint')
        .option('--fix', 'Auto fix eslint errors')
        .option('--appName <appName>', 'Name of template folder to run eslint')
        .action((cmd) => __awaiter(this, void 0, void 0, function* () {
        console.log(chalk_1.default.yellow('Checking syntax...'));
        if (cmd.appName) {
            child_process_1.spawnSync('npm', ['run', `lint-${cmd.appName}${cmd.fix ? '-fix' : ''}`], { stdio: 'inherit' });
        }
        else {
            child_process_1.spawnSync('npm', ['run', `lint-all${cmd.fix ? '-fix' : ''}`], { stdio: 'inherit' });
        }
    }));
};
exports.default = lintCommand;
//# sourceMappingURL=lintCommand.js.map