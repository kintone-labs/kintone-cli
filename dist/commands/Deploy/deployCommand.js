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
const deployer_1 = require("./deployer");
const fs_1 = require("fs");
const deployCommand = (program) => {
    return program
        .command('deploy')
        .description('Deploy customization/plugin for production')
        .option('--app-name <appName>', 'App name')
        .action((cmd) => __awaiter(void 0, void 0, void 0, function* () {
        const error = validator_1.default.deployValidator(cmd);
        if (error && typeof error === 'string') {
            console.log(chalk_1.default.red(error));
            return;
        }
        try {
            const config = (0, jsonfile_1.readFileSync)(`${cmd.appName}/config.json`);
            if ((0, fs_1.existsSync)(`${cmd.appName}/webpack.config.js`)) {
                config.useWebpack = true;
            }
            if (config.type === 'Customization') {
                (0, deployer_1.deployCustomization)(config);
            }
            else {
                (0, deployer_1.deployPlugin)(config);
            }
        }
        catch (err) {
            console.log(err);
        }
    }));
};
exports.default = deployCommand;
//# sourceMappingURL=deployCommand.js.map