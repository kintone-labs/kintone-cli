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
const validator_1 = require("./validator");
const jsonfile_1 = require("jsonfile");
const deployer_1 = require("./deployer");
const fs_1 = require("fs");
const deployCommand = (program) => {
    program
        .command('deploy')
        .option('--app-name <appName>', 'App name')
        .action((cmd) => __awaiter(this, void 0, void 0, function* () {
        let error = validator_1.default.deployValidator(cmd);
        if (error && typeof error === 'string') {
            console.log(chalk_1.default.red(error));
            return;
        }
        try {
            let config = jsonfile_1.readFileSync(`${cmd['appName']}/config.json`);
            if (fs_1.existsSync(`${cmd['appName']}/webpack.config.js`)) {
                config.useWebpack = true;
            }
            if (config.type === 'Customization') {
                deployer_1.deployCustomization(config);
            }
            else {
                deployer_1.deployPlugin(config);
            }
        }
        catch (error) {
            console.log(error);
        }
    }));
};
exports.default = deployCommand;
//# sourceMappingURL=deployCommand.js.map