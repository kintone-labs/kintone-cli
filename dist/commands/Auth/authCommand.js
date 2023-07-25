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
const jsonfile_1 = require("jsonfile");
const inquirer_1 = require("inquirer");
const validator_1 = require("./validator");
const constant_1 = require("../../constant");
const authCommand = (program) => {
    return program
        .command('auth')
        .description('Set authentication credentials')
        .option('-a, --app-name <appName>', 'App name')
        .option('-d, --domain <domain>', 'Kintone domain')
        .option('-u, --username <username>', 'Kintone username')
        .option('-p, --password <password>', 'Kintone password')
        .option('-i, --app-id <appID>', 'Kintone app ID')
        .option('-r, --use-proxy', 'Use proxy or not')
        .option('-x, --proxy <proxy>', 'Proxy full URL, including port number')
        .action((cmd) => __awaiter(void 0, void 0, void 0, function* () {
        const error = (0, validator_1.authValidator)(cmd);
        if (error && typeof error === 'string') {
            return;
        }
        let authJSON;
        try {
            authJSON = (0, jsonfile_1.readFileSync)(`${cmd.appName}/auth.json`);
        }
        catch (err) {
            authJSON = {};
        }
        const configJSON = (0, jsonfile_1.readFileSync)(`${cmd.appName}/config.json`);
        const answer = yield (0, inquirer_1.prompt)([
            {
                type: 'input',
                name: 'domain',
                message: constant_1.MESSAGES.KINTONE_DOMAIN_PROMPT,
                when: !cmd.domain,
                validate: validator_1.domainValidator
            },
            {
                type: 'input',
                name: 'username',
                message: constant_1.MESSAGES.KINTONE_USERNAME_PROMPT,
                when: !cmd.username,
                validate: validator_1.usernameValidator
            },
            {
                type: 'password',
                name: 'password',
                message: constant_1.MESSAGES.KINTONE_PASSWORD_PROMPT,
                when: !cmd.password,
                validate: validator_1.passwordValidator
            },
            {
                type: 'input',
                name: 'appID',
                message: constant_1.MESSAGES.APP_ID_PROMPT,
                when: !cmd.appID && !configJSON.appID,
                validate: validator_1.appIDValidator
            },
            {
                type: 'confirm',
                name: 'useProxy',
                message: constant_1.MESSAGES.USE_PROXY_PROMT,
                default: false,
                when: (0, validator_1.useProxyValidator)(cmd)
            },
            {
                type: 'input',
                name: 'proxy',
                message: constant_1.MESSAGES.PROXY_URL_PROMPT,
                when: (curAnswers) => (0, validator_1.proxyWhenValidator)(cmd, curAnswers),
                validate: validator_1.proxyValidator
            }
        ]);
        authJSON.domain = cmd.domain || answer.domain;
        authJSON.username = cmd.username || answer.username;
        authJSON.password = cmd.password || answer.password;
        if (cmd.proxy || answer.proxy)
            authJSON.proxy = cmd.proxy || answer.proxy;
        (0, jsonfile_1.writeFileSync)(`${cmd.appName}/auth.json`, authJSON, {
            spaces: 4,
            EOL: '\r\n'
        });
        if (!configJSON.appID)
            configJSON.appID = cmd.appID || answer.appID;
        (0, jsonfile_1.writeFileSync)(`${cmd.appName}/config.json`, configJSON, {
            spaces: 4,
            EOL: '\r\n'
        });
        console.log(chalk_1.default.yellow('Set auth info complete.'));
        console.log(chalk_1.default.yellow('To start dev, use:'));
        console.log('');
        console.log(chalk_1.default.greenBright(`     kintone-cli dev --app-name ${cmd.appName}`));
        console.log('');
        console.log(chalk_1.default.yellow('To deploy app, use:'));
        console.log('');
        console.log(chalk_1.default.greenBright(`     kintone-cli deploy --app-name ${cmd.appName}`));
        console.log('');
    }));
};
exports.default = authCommand;
//# sourceMappingURL=authCommand.js.map