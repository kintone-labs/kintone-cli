"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const fs = require("fs");
const configCommand = (program) => {
    program
        .command('config')
        .description('kintone Node CLI config')
        .option('--domain <domain>', 'Set domain')
        .option('--username <username>', 'Set username')
        .option('--password <password>', 'Set password')
        .action((cmd) => {
        const configArr = (fs.readFileSync(`${__dirname}/../../../.kintone/.config`, "utf8")).split("\n");
        let configData = {};
        configArr.forEach((configString) => {
            configData[configString.split("=")[0]] = configString.split("=")[1];
        });
        if (cmd.domain) {
            configData['domain'] = cmd.domain;
        }
        if (cmd.username) {
            configData['username'] = cmd.username;
        }
        if (cmd.password) {
            configData['password'] = cmd.password;
        }
        if (!configData['domain']) {
            console.log(chalk_1.default.redBright('Domain required'));
            return;
        }
        if (!configData['username']) {
            console.log(chalk_1.default.redBright('Username required'));
            return;
        }
        if (!configData['password']) {
            console.log(chalk_1.default.redBright('Password required'));
            return;
        }
        let configStringArr = [];
        Object.keys(configData).forEach((key) => {
            if (configData[key]) {
                configStringArr.push(`${key}=${configData[key]}`);
            }
        });
        fs.writeFile(`${__dirname}/../../../.kintone/.config`, configStringArr.join("\n"), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log(chalk_1.default.greenBright('Config success'));
        });
    });
};
exports.default = configCommand;
//# sourceMappingURL=configCommand.js.map