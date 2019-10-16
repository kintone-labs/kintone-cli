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
const validator_1 = require("./validator");
const chalk_1 = require("chalk");
const jsonfile_1 = require("jsonfile");
const inquirer_1 = require("inquirer");
const string_1 = require("../../utils/string");
const authCommand = (program) => {
    program
        .command('auth')
        .option('-a, --app-name <appName>', 'Kintone domain')
        .option('-d, --domain <domain>', 'Kintone domain')
        .option('-u, --username <username>', 'Kintone username')
        .option('-p, --password <password>', 'Kintone password')
        .option('-i, --app-id <appID>', 'Kintone app ID')
        .option('-r, --use-proxy', 'Use proxy or not')
        .option('-x, --proxy <proxy>', 'Proxy full URL, including port number')
        .action((cmd) => __awaiter(this, void 0, void 0, function* () {
        let error = validator_1.default.authValidator(cmd);
        if (error && typeof error === 'string') {
            console.log(chalk_1.default.red(error));
            return;
        }
        let authJSON;
        try {
            authJSON = jsonfile_1.readFileSync(`${cmd['appName']}/auth.json`);
        }
        catch (error) {
            authJSON = {};
        }
        let configJSON = jsonfile_1.readFileSync(`${cmd['appName']}/config.json`);
        let answer = yield inquirer_1.prompt([
            {
                type: 'input',
                name: 'domain',
                message: 'What is your kintone domain ?',
                when: !cmd.domain,
                validate: (input) => {
                    if (!string_1.isDomain(input)) {
                        return 'Please enter a valid domain';
                    }
                    return true;
                }
            },
            {
                type: 'input',
                name: 'username',
                message: 'What is your kintone username ?',
                when: !cmd.username,
                validate: (input) => {
                    if (!input) {
                        return 'Username can\'t be empty.';
                    }
                    return true;
                }
            },
            {
                type: 'password',
                name: 'password',
                message: 'What is your kintone password ?',
                when: !cmd.password,
                validate: (input) => {
                    if (!input) {
                        return 'Password can\'t be empty.';
                    }
                    return true;
                }
            },
            {
                type: 'input',
                name: 'appID',
                message: 'What is the app ID ?',
                when: !cmd.appID && !configJSON.appID,
                validate: (input) => {
                    if (!input) {
                        return 'App ID can\'t be empty.';
                    }
                    let numberMatch = input.match(/(^-?\d+|^\d+\.\d*|^\d*\.\d+)(e\d+)?$/);
                    // If a number is found, return that input.
                    if (!numberMatch) {
                        return 'App ID must be a number.';
                    }
                    return true;
                }
            },
            {
                type: 'confirm',
                name: 'useProxy',
                message: 'Do you use proxy ?',
                default: false,
                when: !cmd.useProxy && !cmd.proxy
            },
            {
                type: 'input',
                name: 'proxy',
                message: 'Specify your proxy full URL, including port number:',
                when: (curAnswers) => {
                    return (cmd.useProxy || curAnswers['useProxy']) && !cmd.proxy;
                },
                validate: (input) => {
                    if (!input) {
                        return 'Proxy URL can\'t be empty.';
                    }
                    return true;
                }
            }
        ]);
        authJSON['domain'] = cmd['domain'] || answer['domain'];
        authJSON['username'] = cmd['username'] || answer['username'];
        authJSON['password'] = cmd['password'] || answer['password'];
        if (cmd['proxy'] || answer['proxy'])
            authJSON['proxy'] = cmd['proxy'] || answer['proxy'];
        jsonfile_1.writeFileSync(`${cmd['appName']}/auth.json`, authJSON, { spaces: 4, EOL: "\r\n" });
        if (!configJSON['appID'])
            configJSON['appID'] = cmd['appID'] || answer['appID'];
        jsonfile_1.writeFileSync(`${cmd['appName']}/config.json`, configJSON, { spaces: 4, EOL: "\r\n" });
        console.log(chalk_1.default.yellow('Set auth info complete.'));
        console.log(chalk_1.default.yellow('To start dev, use:'));
        console.log('');
        console.log(chalk_1.default.greenBright(`     kintone-cli dev --app-name ${cmd['appName']}`));
        console.log('');
        console.log(chalk_1.default.yellow('To deploy app, use:'));
        console.log('');
        console.log(chalk_1.default.greenBright(`     kintone-cli deploy --app-name ${cmd['appName']}`));
        console.log('');
    }));
};
exports.default = authCommand;
//# sourceMappingURL=authCommand.js.map