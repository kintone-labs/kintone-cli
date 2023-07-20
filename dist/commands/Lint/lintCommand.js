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
const cross_spawn_1 = __importDefault(require("cross-spawn"));
const validator_1 = __importDefault(require("./validator"));
const spawnSync = cross_spawn_1.default.sync;
const lintCommand = (program) => {
    program
        .command('lint')
        .description('Check/fix code using @cybozu/eslint-config')
        .option('--fix', 'Auto fix eslint errors')
        .option('--app-name <appName>', 'Name of template folder to run eslint')
        .action((cmd) => __awaiter(void 0, void 0, void 0, function* () {
        const error = validator_1.default.lintValidator(cmd);
        if (error && typeof error === 'string') {
            console.log(chalk_1.default.red(error));
            return;
        }
        process.on('SIGINT', () => {
            process.exit();
        });
        console.log(chalk_1.default.yellow('Checking syntax...'));
        if (cmd.appName) {
            spawnSync('npm', ['run', `lint-${cmd.appName}${cmd.fix ? '-fix' : ''}`], { stdio: 'inherit' });
        }
        else {
            spawnSync('npm', ['run', `lint-all${cmd.fix ? '-fix' : ''}`], {
                stdio: 'inherit'
            });
        }
    }));
};
exports.default = lintCommand;
//# sourceMappingURL=lintCommand.js.map