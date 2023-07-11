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
const chalk_1 = require("chalk");
const spawn = require("cross-spawn");
const inquirer_1 = require("inquirer");
const validator_1 = require("./validator");
const jsonfile_1 = require("jsonfile");
const fs_1 = require("fs");
const generator_1 = require("./generator");
const constant_1 = require("../../constant");
const string_1 = require("../../utils/string");
const getPromptsCreateTemplate = (cmd) => {
    return [
        {
            type: 'list',
            name: 'type',
            message: 'What type of app you want to create ?',
            choices: ['Customization', 'Plugin'],
            when: cmd.type === undefined
        },
        {
            type: 'confirm',
            name: 'setAuth',
            message: 'Do you want to set authentication credentials ?',
            when: cmd.setAuth === undefined
        },
        {
            type: 'input',
            name: 'domain',
            message: 'What is your kintone domain ?',
            when: (curAnswers) => {
                return (cmd.setAuth || curAnswers.setAuth) && !cmd.domain;
            },
            validate: (input, curAnswer) => {
                if (!input.startsWith('https://'))
                    return 'Domain has to start with https';
                if (!(0, string_1.isDomain)(input)) {
                    return 'Please enter a valid domain';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'username',
            message: 'What is your kintone username ?',
            when: (curAnswers) => {
                return (cmd.setAuth || curAnswers.setAuth) && !cmd.username;
            }
        },
        {
            type: 'password',
            name: 'password',
            message: 'What is your kintone password ?',
            when: (curAnswers) => {
                return (cmd.setAuth || curAnswers.setAuth) && !cmd.password;
            }
        },
        {
            type: 'confirm',
            name: 'useProxy',
            message: 'Do you use proxy ?',
            default: false,
            when: (curAnswers) => {
                return (cmd.setAuth || curAnswers.setAuth) && !cmd.proxy;
            }
        },
        {
            type: 'input',
            name: 'proxy',
            message: 'Specify your proxy full URL, including port number:',
            when: (curAnswers) => {
                return curAnswers.useProxy && !cmd.proxy;
            }
        },
        {
            type: 'confirm',
            name: 'useReact',
            message: 'Do you want to use React ?',
            when: cmd.useReact === undefined
        },
        {
            type: 'confirm',
            name: 'useTypescript',
            message: 'Do you want to use TypeScript ?',
            when: cmd.useTypescript === undefined
        },
        {
            type: 'confirm',
            name: 'useWebpack',
            message: 'Do you want to use webpack ?',
            when: cmd.useWebpack === undefined
        },
        {
            type: 'input',
            name: 'entry',
            message: 'What is the entry for webpack ?',
            default: (curAnswers) => {
                let ext = '.js';
                const tempOption = Object.assign(Object.assign({}, cmd), curAnswers);
                if (tempOption.useReact && tempOption.useTypescript) {
                    ext = '.tsx';
                }
                else if (tempOption.useReact) {
                    ext = '.jsx';
                }
                else if (tempOption.useTypescript) {
                    ext = '.ts';
                }
                return `index${ext}`;
            },
            when: (curAnswers) => {
                return (cmd.useWebpack || curAnswers.useWebpack) && !cmd.entry;
            }
        },
        {
            type: 'confirm',
            name: 'useCybozuLint',
            message: 'Do you want to use @cybozu/eslint-config for syntax checking ?',
            when: cmd.useCybozuLint === undefined
        },
        {
            type: 'input',
            name: 'appName',
            message: 'What is the app name ?',
            when: cmd.appName === undefined,
            validate: (input) => {
                if (!input) {
                    return 'Missing app name';
                }
                return true;
            }
        },
        {
            type: 'number',
            name: 'appID',
            message: 'What is the app ID ?',
            when: (curAnswers) => {
                return ((cmd.setAuth || curAnswers.setAuth) &&
                    !cmd.appID &&
                    (cmd.type === 'Customization' || curAnswers.type === 'Customization'));
            }
        },
        {
            type: 'list',
            name: 'scope',
            message: 'What is the scope of customization ?',
            choices: ['ALL', 'ADMIN', 'NONE'],
            when: (curAnswers) => {
                return ((cmd.type === 'Customization' ||
                    curAnswers.type === 'Customization') &&
                    !cmd.scope);
            }
        }
    ];
};
const getPromptsInit = (packageInfo) => {
    return [
        {
            type: 'input',
            name: 'name',
            message: 'Project name',
            default: 'kintone-customization-project',
            when: !packageInfo.name
        },
        {
            type: 'input',
            name: 'version',
            message: 'Version',
            default: constant_1.DEFAULT_PROJECT_VERSION,
            when: !packageInfo.version
        },
        {
            type: 'input',
            name: 'description',
            message: 'Description',
            default: 'kintone customization project',
            when: !packageInfo.description
        },
        {
            type: 'input',
            name: 'author',
            message: 'Author',
            default: '',
            when: packageInfo.author === undefined
        },
        {
            type: 'input',
            name: 'license',
            message: 'License',
            default: 'MIT',
            when: !packageInfo.license
        },
        {
            type: 'confirm',
            name: 'dependencies.@kintone/kintone-ui-component',
            message: 'Do you want to use @kintone/kintone-ui-component?',
            default: true,
            when: packageInfo.dependencies &&
                packageInfo.dependencies['@kintone/kintone-ui-component'] === undefined
        },
        {
            type: 'confirm',
            name: 'dependencies.@kintone/rest-api-client',
            message: 'Do you want to use @kintone/rest-api-client?',
            default: true,
            when: packageInfo.dependencies &&
                packageInfo.dependencies['@kintone/rest-api-client'] === undefined
        }
    ];
};
const getAppSetting = (cmd, answer) => {
    const appSetting = {
        setAuth: cmd.setAuth || answer.setAuth,
        useTypescript: cmd.useTypescript || answer.useTypescript,
        useWebpack: cmd.useWebpack || answer.useWebpack,
        entry: cmd.entry || answer.entry,
        useReact: cmd.useReact || answer.useReact,
        appName: (cmd.appName || answer.appName).replace(' ', '-'),
        domain: cmd.domain || answer.domain,
        username: cmd.username || answer.username,
        password: cmd.password || answer.password,
        type: cmd.type || answer.type,
        appID: cmd.appID || answer.appID,
        useCybozuLint: cmd.useCybozuLint || answer.useCybozuLint,
        scope: cmd.scope || answer.scope,
        proxy: cmd.proxy || answer.proxy
    };
    if (answer.proxy === 'null')
        appSetting.proxy = '';
    return appSetting;
};
const createProjectFolder = (packageInfo) => {
    const projectFolder = global.currentDir + '/' + packageInfo.name;
    if ((0, fs_1.existsSync)(projectFolder)) {
        console.error(chalk_1.default.red('Project folder already exists! Please, run the cli again and choose another project name.'));
        process.exit(-1);
    }
    (0, fs_1.mkdirSync)(projectFolder);
    return projectFolder;
};
function processProjectInfo(packageInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const prompts = getPromptsInit(packageInfo);
        const answers = yield (0, inquirer_1.prompt)(prompts);
        const updatedPackageInfo = Object.assign(Object.assign({}, packageInfo), answers);
        if (updatedPackageInfo.dependencies['@kintone/kintone-ui-component']) {
            updatedPackageInfo.dependencies['@kintone/kintone-ui-component'] =
                constant_1.DEPENDENCIES['@kintone/kintone-ui-component'];
        }
        else {
            delete updatedPackageInfo.dependencies['@kintone/kintone-ui-component'];
        }
        if (updatedPackageInfo.dependencies['@kintone/rest-api-client']) {
            updatedPackageInfo.dependencies['@kintone/rest-api-client'] =
                constant_1.DEPENDENCIES['@kintone/rest-api-client'];
        }
        else {
            delete updatedPackageInfo.dependencies['@kintone/rest-api-client'];
        }
        return updatedPackageInfo;
    });
}
const spawnSync = spawn.sync;
const initializeCommand = (program) => {
    program
        .command('create-template')
        .description('Create customization/plugin template')
        .option('-q, --quick', 'Use default template')
        .option('--preset <preset>', 'Preset for generating template')
        .option('-t, --type <type>', 'Set app type')
        .option('--scope <scope>', 'Set scope of customization')
        .option('-a, --set-auth', 'Set authentication credentials')
        .option('-d, --domain <domain>', 'Set kintone domain')
        .option('-u, --username <username>', 'Set username')
        .option('-p, --password <password>', 'Set password')
        .option('-n, --app-name <appName>', 'Set app name')
        .option('-s, --use-typescript', 'Use typescript or not')
        .option('-r, --use-react', 'Use React or not')
        .option('-w, --use-webpack', 'Use webpack or not')
        .option('--entry <entry>', 'Webpack entry')
        .option('-i, --app-id <appID>', 'Set app ID for customization')
        .option('-l, --use-cybozu-lint', 'Use cybozu eslint rules')
        .option('--proxy <proxyURL>', 'Proxy URL')
        .action((cmd) => __awaiter(void 0, void 0, void 0, function* () {
        cmd.appID = cmd.appId;
        const error = validator_1.default.appValidator(cmd);
        if (error && typeof error === 'string') {
            console.log(chalk_1.default.red(error));
            return;
        }
        try {
            let answer = {};
            if (cmd.quick) {
                cmd.setAuth = false;
                cmd.useProxy = false;
                cmd.useTypescript = false;
                cmd.useWebpack = false;
                cmd.useCybozuLint = false;
                cmd.useReact = false;
                cmd.type = cmd.type || 'Customization';
                cmd.appName = cmd.appName || `kintone-${Date.now()}`;
                cmd.scope = cmd.scope || 'ALL';
            }
            if (cmd.preset) {
                switch (cmd.preset) {
                    case 'React':
                        applyReactPreset(cmd);
                        break;
                    case 'ReactTS':
                        applyReactTSPreset(cmd);
                        break;
                    default:
                        break;
                }
            }
            const prompts = getPromptsCreateTemplate(cmd);
            answer = yield (0, inquirer_1.prompt)(prompts);
            // Config for appConfig.json
            const appSetting = getAppSetting(cmd, answer);
            console.log(chalk_1.default.yellow('Creating app...'));
            const err = (0, generator_1.generateAppFolder)(appSetting);
            if (err && typeof err === 'string') {
                console.log(chalk_1.default.red(err));
                return;
            }
            console.log(chalk_1.default.yellow('Installing dependencies...'));
            spawnSync('npm', ['install'], { stdio: 'inherit', windowsHide: true });
            console.log('');
            printAppDevelopmentInstructions(appSetting);
        }
        catch (err) {
            console.log(chalk_1.default.red(err));
        }
    }));
    program
        .command('init')
        .description('Initialize kintone project')
        .option('--install', 'Install dependencies or not')
        .option('--quick', 'Quickly create a kintone project')
        .option('-p, --project-name <projectName>', 'Project name')
        .action((cmd) => __awaiter(void 0, void 0, void 0, function* () {
        let packageInfo = {};
        if (cmd.quick) {
            packageInfo.name = 'kintone-customization-project';
            packageInfo.version = constant_1.DEFAULT_PROJECT_VERSION;
            packageInfo.description = 'kintone customization project';
            packageInfo.author = '';
            packageInfo.license = 'MIT';
            packageInfo.dependencies = {};
            packageInfo.dependencies['@kintone/kintone-ui-component'] = true;
            packageInfo.dependencies['@kintone/rest-api-client'] = true;
        }
        else {
            console.log(chalk_1.default.yellow('Welcome to kintone-cli!'));
            console.log(chalk_1.default.yellow('Please, input below information so we can get started!'));
        }
        if (cmd.projectName) {
            packageInfo.name = cmd.projectName;
        }
        // ask info about project
        packageInfo = yield processProjectInfo(packageInfo);
        const projectFolder = createProjectFolder(packageInfo);
        // write project info object to package.json
        if (!packageInfo.devDependencies) {
            packageInfo.devDependencies = {};
        }
        packageInfo.devDependencies['local-web-server'] = '^2.6.1';
        if (!packageInfo.scripts) {
            packageInfo.scripts = {};
        }
        packageInfo.scripts.dev = 'ws';
        const packageJsonPath = projectFolder + '/package.json';
        (0, jsonfile_1.writeFileSync)(packageJsonPath, packageInfo, { spaces: 2, EOL: '\r\n' });
        process.chdir(projectFolder);
        spawnSync('git', ['init'], { stdio: 'inherit' });
        (0, fs_1.writeFileSync)(`${projectFolder}/.gitignore`, 'node_modules');
        // if install is specified run npm install
        if (cmd.install) {
            console.log(chalk_1.default.yellow('Installing dependencies...'));
            spawnSync('npm', ['i'], { stdio: 'inherit', windowsHide: true });
        }
        printProjectCreationMessage(packageInfo);
    }));
};
const printAppDevelopmentInstructions = (appSetting) => {
    if (!appSetting.setAuth) {
        console.log(chalk_1.default.yellow('To set auth info, use:'));
        console.log('');
        console.log(chalk_1.default.greenBright(`     kintone-cli auth --app-name ${appSetting.appName}`));
        console.log('');
    }
    else {
        console.log(chalk_1.default.yellow('To start developing app, use:'));
        console.log('');
        console.log(chalk_1.default.greenBright(`     kintone-cli dev --app-name ${appSetting.appName} --watch`));
        console.log('');
    }
};
const printProjectCreationMessage = (packageInfo) => {
    console.log('');
    console.log(chalk_1.default.yellow('Project created!'));
    console.log(chalk_1.default.yellow('To create a new app, use:'));
    console.log('');
    console.log(chalk_1.default.green(`   cd ${packageInfo.name}`));
    console.log('');
    console.log(chalk_1.default.green('   kintone-cli create-template'));
    console.log('');
};
const applyReactPreset = (cmd) => {
    cmd.useTypescript = false;
    cmd.useWebpack = true;
    cmd.useReact = true;
    cmd.entry = 'index.jsx';
};
const applyReactTSPreset = (cmd) => {
    cmd.useTypescript = true;
    cmd.useWebpack = true;
    cmd.useReact = true;
    cmd.entry = 'index.tsx';
};
exports.default = initializeCommand;
//# sourceMappingURL=initializeCommand.js.map