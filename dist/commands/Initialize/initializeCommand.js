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
const inquirer_1 = require("inquirer");
const validator_1 = require("./validator");
const jsonfile_1 = require("jsonfile");
const fs_1 = require("fs");
const generator_1 = require("./generator");
const initializeCommand = (program) => {
    const latestUIComponentVersion = '^0.2.0';
    const latestJsSdkVersion = '^0.2.0';
    const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'Project name',
            default: 'kintone-customization-project'
        },
        {
            type: 'input',
            name: 'version',
            message: 'Version',
            default: '0.0.1'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Description',
            default: 'kintone customization project'
        },
        {
            type: 'input',
            name: 'author',
            message: 'Author',
            default: ''
        },
        {
            type: 'input',
            name: 'license',
            message: 'License',
            default: 'MIT'
        },
        {
            type: 'confirm',
            name: 'dependencies.@kintone/kintone-ui-component',
            message: 'Do you want to use @kintone/kintone-ui-component?',
            default: true
        },
        {
            type: 'confirm',
            name: 'dependencies.@kintone/kintone-js-sdk',
            message: 'Do you want to use @kintone/kintone-js-sdk?',
            default: true
        }
    ];
    program
        .command('create-template')
        .option('--set-auth', 'Set authentication credentials')
        .option('--use-typescript', 'Use typescript or not')
        .option('--use-webpack', 'Use webpack or not')
        .option('--type <type>', 'Set app type')
        .option('--domain <domain>', 'Set kintone domain')
        .option('--username <username>', 'Set username')
        .option('--password <password>', 'Set password')
        .option('--appID <appID>', 'Set app ID for customization')
        .option('--use-cybozu-lint', 'Use cybozu eslint rules')
        .action((cmd) => __awaiter(this, void 0, void 0, function* () {
        let error = validator_1.default.appValidator(cmd);
        if (error && typeof error === 'string') {
            console.log(chalk_1.default.red(error));
            return;
        }
        try {
            if (!cmd.type) {
                let answerType = yield inquirer_1.prompt([
                    {
                        type: 'list',
                        name: 'type',
                        message: 'What type of app you want to create ?',
                        choices: ['Customization', 'Plugin']
                    }
                ]);
                cmd.type = answerType['type'];
            }
            if (!cmd.setAuth) {
                let answerAuth = yield inquirer_1.prompt([
                    {
                        type: 'confirm',
                        name: 'setAuth',
                        message: 'Do you want to set authentication credentials ?'
                    }
                ]);
                cmd.setAuth = answerAuth['setAuth'];
            }
            if (cmd.setAuth) {
                let answerCredentials = yield inquirer_1.prompt([
                    {
                        type: 'input',
                        name: 'domain',
                        message: 'What is your kintone domain ?'
                    },
                    {
                        type: 'input',
                        name: 'username',
                        message: 'What is your kintone username ?'
                    },
                    {
                        type: 'input',
                        name: 'password',
                        message: 'What is your kintone password ?'
                    },
                    {
                        type: 'confirm',
                        name: 'useProxy',
                        message: 'Do you use proxy ?'
                    },
                    {
                        type: 'input',
                        name: 'proxy',
                        message: 'Specify your proxy full URL, including port number:',
                        when: (answers) => {
                            return !!answers.useProxy;
                        }
                    }
                ]);
                cmd.domain = answerCredentials['domain'];
                cmd.username = answerCredentials['username'];
                cmd.password = answerCredentials['password'];
                cmd.proxy = answerCredentials['proxy'];
            }
            if (!cmd.useTypescript) {
                let answerTypescript = yield inquirer_1.prompt([
                    {
                        type: 'confirm',
                        name: 'useTypescript',
                        message: 'Do you want to use Typescript ?'
                    }
                ]);
                cmd.useTypescript = answerTypescript['useTypescript'];
            }
            if (!cmd.useWebpack) {
                let answerWebpack = yield inquirer_1.prompt([
                    {
                        type: 'confirm',
                        name: 'useWebpack',
                        message: 'Do you want to use Webpack ?'
                    }
                ]);
                cmd.useWebpack = answerWebpack['useWebpack'];
            }
            if (cmd.useWebpack) {
                let answerUsingWebpack = yield inquirer_1.prompt([
                    {
                        type: 'confirm',
                        name: 'useReact',
                        message: 'Do you want to use React ?'
                    },
                    {
                        type: 'input',
                        name: 'entry',
                        message: 'What is the entry for Webpack ?'
                    }
                ]);
                cmd.useReact = answerUsingWebpack['useReact'];
                cmd.entry = answerUsingWebpack['entry'];
            }
            if (!cmd.appName) {
                let answerAppName = yield inquirer_1.prompt([
                    {
                        type: 'input',
                        name: 'appName',
                        message: 'What is the app name ?'
                    }
                ]);
                cmd.appName = answerAppName['appName'];
            }
            if (!cmd.useCybozuLint) {
                let answerUseCybozuLint = yield inquirer_1.prompt([
                    {
                        type: 'confirm',
                        name: 'useCybozuLint',
                        message: 'Do you want to use @cybozu/eslint-config for syntax checking ?'
                    }
                ]);
                cmd.useCybozuLint = answerUseCybozuLint['useCybozuLint'];
            }
            // Config for appConfig.json
            if (cmd.type === 'Customization') {
                if (!cmd.appID) {
                    let answerAppID = yield inquirer_1.prompt([
                        {
                            type: 'number',
                            name: 'appID',
                            message: 'What is the app ID for customization ?'
                        }
                    ]);
                    cmd.appID = answerAppID['appID'];
                }
                if (!cmd.scope) {
                    let answerScope = yield inquirer_1.prompt([
                        {
                            type: 'list',
                            name: 'scope',
                            message: 'What is the scope of customization ?',
                            choices: ['ALL', 'ADMIN', 'NONE']
                        }
                    ]);
                    cmd.scope = answerScope['scope'];
                }
            }
            let appSetting = {
                setAuth: cmd.setAuth,
                useTypescript: cmd.useTypescript,
                useWebpack: cmd.useWebpack,
                entry: cmd.entry,
                useReact: cmd.useReact,
                appName: cmd.appName.replace(" ", "-"),
                domain: cmd.domain,
                username: cmd.username,
                password: cmd.password,
                type: cmd.type,
                appID: cmd.appID,
                pluginName: cmd.pluginName,
                useCybozuLint: cmd.useCybozuLint,
                scope: cmd.scope,
                proxy: cmd.proxy
            };
            console.log(chalk_1.default.yellow('Creating app...'));
            let err = generator_1.generateAppFolder(appSetting);
            if (err && typeof err === 'string') {
                console.log(chalk_1.default.red(err));
                return;
            }
            console.log(chalk_1.default.yellow('Installing dependencies...'));
            child_process_1.spawnSync('npm', ['install'], { stdio: 'inherit', windowsHide: true });
            if (cmd.useCybozuLint) {
                child_process_1.spawnSync('npm', ['install', '--save-dev', 'eslint', '@cybozu/eslint-config'], { stdio: 'inherit', windowsHide: true });
            }
        }
        catch (error) {
            console.log(error);
        }
    }));
    program
        .command('init')
        .description('Initialize kintone project')
        .option('--install')
        .action((cmd) => __awaiter(this, void 0, void 0, function* () {
        console.log(chalk_1.default.yellow('Welcome to kintone-cli!'));
        console.log(chalk_1.default.yellow('Please, input below information so we can get started!'));
        // ask info about project
        const packageInfo = yield inquirer_1.prompt(questions);
        if (packageInfo['dependencies']['@kintone/kintone-ui-component'])
            packageInfo['dependencies']['@kintone/kintone-ui-component'] = latestUIComponentVersion;
        else
            delete packageInfo['dependencies']['@kintone/kintone-ui-component'];
        if (packageInfo['dependencies']['@kintone/kintone-js-sdk'])
            packageInfo['dependencies']['@kintone/kintone-js-sdk'] = latestJsSdkVersion;
        else
            delete packageInfo['dependencies']['@kintone/kintone-js-sdk'];
        // create project folder 
        const projectFolder = global['currentDir'] + '/' + packageInfo['name'];
        if (fs_1.existsSync(projectFolder)) {
            console.error(chalk_1.default.red('Project folder already exists! Please, run the cli again and choose another project name.'));
            process.exit(-1);
        }
        fs_1.mkdirSync(projectFolder);
        // write project info object to package.json
        if (!packageInfo['devDependencies']) {
            packageInfo['devDependencies'] = {};
        }
        packageInfo['devDependencies']['local-web-server'] = '^2.6.1';
        if (!packageInfo['scripts']) {
            packageInfo['scripts'] = {};
        }
        packageInfo['scripts']['dev'] = 'ws';
        const packageJsonPath = projectFolder + '/package.json';
        jsonfile_1.writeFileSync(packageJsonPath, packageInfo, { spaces: 2, EOL: '\r\n' });
        // if install is specified run npm install
        if (cmd.install) {
            process.chdir(projectFolder);
            console.log(chalk_1.default.yellow('Installing dependencies...'));
            child_process_1.spawnSync('npm', ['i'], { stdio: "inherit", windowsHide: true });
        }
        console.log(chalk_1.default.yellow('You are all set! Happy kintone customizing!'));
    }));
};
exports.default = initializeCommand;
//# sourceMappingURL=initializeCommand.js.map