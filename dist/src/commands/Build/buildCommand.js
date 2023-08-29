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
const validator_1 = __importDefault(require("./validator"));
const jsonfile_1 = require("jsonfile");
const fs_1 = require("fs");
const builder_1 = require("./builder");
const buildCommand = (program) => {
    return program
        .command('build')
        .description('Build customization/plugin')
        .option('--app-name <appName>', 'App name')
        .action((cmd) => __awaiter(void 0, void 0, void 0, function* () {
        const error = validator_1.default.buildValidator(cmd);
        if (error && typeof error === 'string') {
            console.log(chalk_1.default.red(error));
            return;
        }
        try {
            const config = (0, jsonfile_1.readFileSync)(`${cmd.appName}/config.json`);
            if ((0, fs_1.existsSync)(`${config.appName}/webpack.config.js`)) {
                (0, builder_1.buildUsingWebpack)(config);
            }
            else {
                if (config.type === 'Customization') {
                    console.log(chalk_1.default.red('No webpack.config.js'));
                    return;
                }
                (0, builder_1.buildVanillaJS)(config);
            }
            if (config.type === 'Plugin') {
                (0, builder_1.buildPlugin)(config);
            }
            console.log('');
            console.log(chalk_1.default.yellow('Build app complete.'));
            if (!(0, fs_1.existsSync)(`${config.appName}/auth.json`)) {
                console.log(chalk_1.default.yellow('To set auth info, use:'));
                console.log('');
                console.log(chalk_1.default.greenBright(`     kintone-cli auth --app-name ${config.appName}`));
                console.log('');
            }
            else {
                console.log(chalk_1.default.yellow('To deploy app, use:'));
                console.log('');
                console.log(chalk_1.default.greenBright(`     kintone-cli deploy --app-name ${config.appName}`));
                console.log('');
            }
        }
        catch (err) {
            console.log(err);
        }
    }));
};
exports.default = buildCommand;
//# sourceMappingURL=buildCommand.js.map