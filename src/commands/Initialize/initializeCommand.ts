import { CommanderStatic } from "commander";
import chalk from 'chalk'
import * as spawn from "cross-spawn"
import {prompt} from 'inquirer'
import validator from './validator'
import {writeFileSync} from 'jsonfile'
import {mkdirSync, existsSync, writeFileSync as writeFileSyncFS} from 'fs'

import {generateAppFolder} from './generator'
import { isDomain } from "../../utils/string";

const spawnSync = spawn.sync

const initializeCommand = (program: CommanderStatic) => {
    const latestUIComponentVersion = '^0.6.0';
    const latestJsSdkVersion = '^0.7.4';
    
    program
        .command('create-template')
        .option('-q, --quick', 'Use default template')
        .option('--yes', 'Use default template')
        .option('--preset <preset>', 'Preset for generating template')
        .option('-t, --type <type>', 'Set app type')
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
        .action(async (cmd)=>{
            cmd.appID = cmd.appId
            let error = validator.appValidator(cmd)
            if (error && typeof error === 'string') {
                console.log(chalk.red(error))
                return
            }
            try {
                let answer = {}
                if (cmd.quick || cmd.yes) {
                    cmd.setAuth = false
                    cmd.useProxy = false
                    cmd.useTypescript = false
                    cmd.useWebpack = false
                    cmd.useCybozuLint = false
                    cmd.useReact = false
                    cmd.type = cmd.type || 'Customization'
                    cmd.appName = cmd.appName || `kintone-${Date.now()}`
                    cmd.scope = cmd.scope || 'ALL'
                }
                if (cmd.preset) {
                    switch (cmd.preset) {
                        case 'React':
                            cmd.useTypescript = false
                            cmd.useWebpack = true
                            cmd.useReact = true
                            cmd.entry = 'index.jsx'
                            break;
                        case 'ReactTS':
                            cmd.useTypescript = true
                            cmd.useWebpack = true
                            cmd.useReact = true
                            cmd.entry = 'index.tsx'
                            break;
                        default:
                            break;
                    }
                }
                answer = await prompt([
                    {
                        type : 'list',
                        name : 'type',
                        message : 'What type of app you want to create ?',
                        choices: ['Customization','Plugin'],
                        when: cmd.type === undefined
                    },
                    {
                        type : 'confirm',
                        name : 'setAuth',
                        message : 'Do you want to set authentication credentials ?',
                        when: cmd.setAuth === undefined
                    },
                    {
                        type : 'input',
                        name : 'domain',
                        message : 'What is your kintone domain ?',
                        when: (curAnswers:object) => {
                            return (cmd.setAuth || curAnswers['setAuth']) && !cmd.domain
                        },
                        validate: (input: any,curAnswer: object): any => {
                            if (!isDomain(input)) {
                                return 'Please enter a valid domain'
                            }
                            return true
                        }
                    },
                    {
                        type : 'input',
                        name : 'username',
                        message : 'What is your kintone username ?',
                        when: (curAnswers:object) => {
                            return (cmd.setAuth || curAnswers['setAuth']) && !cmd.username
                        }
                    },
                    {
                        type : 'password',
                        name : 'password',
                        message : 'What is your kintone password ?',
                        when: (curAnswers:object) => {
                            return (cmd.setAuth || curAnswers['setAuth']) && !cmd.password
                        }
                    },
                    {
                        type : 'confirm',
                        name : 'useProxy',
                        message : 'Do you use proxy ?',
                        default: false,
                        when: (curAnswers:object) => {
                            return (cmd.setAuth || curAnswers['setAuth']) && !cmd.proxy
                        }
                    },
                    {
                        type : 'input',
                        name : 'proxy',
                        message : 'Specify your proxy full URL, including port number:',
                        when: (curAnswers:object) => {
                            return curAnswers['useProxy'] && !cmd.proxy
                        }
                    },
                    {
                        type: 'confirm',
                        name: 'useReact',
                        message : 'Do you want to use React ?',
                        when: cmd.useReact === undefined
                    },
                    {
                        type: 'confirm',
                        name: 'useTypescript',
                        message : 'Do you want to use TypeScript ?',
                        when: cmd.useTypescript === undefined
                    },
                    {
                        type: 'confirm',
                        name: 'useWebpack',
                        message : 'Do you want to use webpack ?',
                        when: cmd.useWebpack === undefined
                    },
                    {
                        type: 'input',
                        name: 'entry',
                        message : 'What is the entry for webpack ?',
                        default: (curAnswers:object) => {
                            let ext = '.js'
                            let tempOption = {...cmd,...curAnswers}
                            if (tempOption['useReact'] && tempOption['useTypescript']) {
                                ext = '.tsx'
                            }
                            else if (tempOption['useReact']) {
                                ext = '.jsx'
                            }
                            else if (tempOption['useTypescript']) {
                                ext = '.ts'
                            }
                            return `index${ext}`;
                        },
                        when: (curAnswers:object) => {
                            return (cmd.useWebpack || curAnswers['useWebpack']) && !cmd.entry
                        }
                    },
                    {
                        type: 'input',
                        name: 'appName',
                        message : 'What is the app name ?',
                        when: cmd.appName === undefined,
                        validate: (input) => {
                            if (!input) {
                                return 'Missing app name'
                            }
                            return true
                        }
                    },
                    {
                        type: 'confirm',
                        name: 'useCybozuLint',
                        message : 'Do you want to use @cybozu/eslint-config for syntax checking ?',
                        when: cmd.useCybozuLint === undefined
                    },
                    {
                        type: 'number',
                        name: 'appID',
                        message : 'What is the app ID ?',
                        when: (curAnswers:object) => {
                            return(
                                (cmd.setAuth || curAnswers['setAuth']) 
                                && 
                                (!cmd.appID)
                                &&
                                (cmd.type === 'Customization' || curAnswers['type'] === 'Customization')
                            )
                        }
                    },
                    {
                        type : 'list',
                        name : 'scope',
                        message : 'What is the scope of customization ?',
                        choices: ['ALL','ADMIN','NONE'],
                        when: (curAnswers:object) => {
                            return(
                                (cmd.type === 'Customization' || curAnswers['type'] === 'Customization') 
                                && 
                                (!cmd.scope)
                            )
                        }
                    }
                ])    
                
                
                // Config for appConfig.json
                let appSetting = {
                    setAuth: cmd.setAuth || answer['setAuth'],
                    useTypescript: cmd.useTypescript || answer['useTypescript'],
                    useWebpack: cmd.useWebpack || answer['useWebpack'],
                    entry: cmd.entry || answer['entry'],
                    useReact: cmd.useReact || answer['useReact'],
                    appName: (cmd.appName || answer['appName']).replace(" ","-"),
                    domain: cmd.domain || answer['domain'],
                    username: cmd.username || answer['username'],
                    password: cmd.password || answer['password'],
                    type: cmd.type || answer['type'],
                    appID: cmd.appID || answer['appID'],
                    useCybozuLint: cmd.useCybozuLint || answer['useCybozuLint'],
                    scope: cmd.scope || answer['scope'],
                    proxy: cmd.proxy || answer['proxy']  
                }

                if (answer['proxy'] === 'null') appSetting.proxy = false

                console.log(chalk.yellow('Creating app...'))
                let err = generateAppFolder(appSetting)
                if (err && typeof err === 'string') {
                    console.log(chalk.red(err))
                    return
                }
                console.log(chalk.yellow('Installing dependencies...'))
                spawnSync('npm',['install'], {stdio: 'inherit', windowsHide: true})
                console.log('')
                if (!appSetting.setAuth) {
                    console.log(chalk.yellow('To set auth info, use:'))
                    console.log('')
                    console.log(chalk.greenBright(`     kintone-cli auth --app-name ${appSetting.appName}`))
                    console.log('')
                }
                else {
                    console.log(chalk.yellow('To start developing app, use:'))
                    console.log('')
                    console.log(chalk.greenBright(`     kintone-cli dev --app-name ${appSetting.appName} --watch`))
                    console.log('')
                }
            } catch (error) {
                console.log(chalk.red(error))
            }
        })

    program
        .command('init')
        .description('Initialize kintone project')
        .option('--install', 'Install dependencies or not')
        .option('--quick', 'Quickly create a kintone project')
        .option('-p, --project-name <projectName>', 'Project name')
        .action(async (cmd)=>{
            let packageInfo = {}
            if (cmd.quick) {
                packageInfo['name'] = 'kintone-customization-project'
                packageInfo['version'] = '0.0.1'
                packageInfo['description'] = 'kintone customization project'
                packageInfo['author'] = ''
                packageInfo['license'] = 'MIT'
                packageInfo['dependencies'] = {}
                packageInfo['dependencies']['@kintone/kintone-ui-component'] = true
                packageInfo['dependencies']['@kintone/kintone-js-sdk'] = true
            }
            else {
                console.log(chalk.yellow('Welcome to kintone-cli!'));
                console.log(chalk.yellow('Please, input below information so we can get started!'));
            }

            if (cmd.projectName) {
                packageInfo['name'] = cmd.projectName
            }
            
            // ask info about project
            const answer = await prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Project name',
                    default: 'kintone-customization-project',
                    when: !packageInfo['name']
                },
                {
                    type: 'input',
                    name: 'version',
                    message: 'Version',
                    default: '0.0.1',
                    when: !packageInfo['version']
                },
                {
                    type: 'input',
                    name: 'description',
                    message: 'Description',
                    default: 'kintone customization project',
                    when: !packageInfo['description']
                },
                {
                    type: 'input',
                    name: 'author',
                    message: 'Author',
                    default: '',
                    when: packageInfo['author'] === undefined
                },
                {
                    type: 'input',
                    name: 'license',
                    message: 'License',
                    default: 'MIT',
                    when: !packageInfo['license']
                },
                {
                    type: 'confirm',
                    name: 'dependencies.@kintone/kintone-ui-component',
                    message: 'Do you want to use @kintone/kintone-ui-component?',
                    default: true,
                    when: packageInfo['dependencies'] && packageInfo['dependencies']['@kintone/kintone-ui-component'] === undefined
                },
                {
                    type: 'confirm',
                    name: 'dependencies.@kintone/kintone-js-sdk',
                    message: 'Do you want to use @kintone/kintone-js-sdk?',
                    default: true,
                    when: packageInfo['dependencies'] && packageInfo['dependencies']['@kintone/kintone-js-sdk'] === undefined
                }
            ])
            packageInfo = {...packageInfo, ...answer}
            if(packageInfo['dependencies']['@kintone/kintone-ui-component'])
                packageInfo['dependencies']['@kintone/kintone-ui-component'] = latestUIComponentVersion;
            else 
                delete packageInfo['dependencies']['@kintone/kintone-ui-component']
                
            if(packageInfo['dependencies']['@kintone/kintone-js-sdk'])
                packageInfo['dependencies']['@kintone/kintone-js-sdk'] = latestJsSdkVersion;
            else
                delete packageInfo['dependencies']['@kintone/kintone-js-sdk']

            // create project folder 
            const projectFolder = global['currentDir'] + '/' + packageInfo['name'];
            if(existsSync(projectFolder)) {
                console.error(chalk.red('Project folder already exists! Please, run the cli again and choose another project name.'))
                process.exit(-1)
            }
            mkdirSync(projectFolder);

            // write project info object to package.json
            if(!packageInfo['devDependencies']) {
                packageInfo['devDependencies'] = {}
            }
            packageInfo['devDependencies']['local-web-server'] = '^2.6.1'
            if(!packageInfo['scripts']) {
                packageInfo['scripts'] = {}
            }
            packageInfo['scripts']['dev'] = 'ws'
            const packageJsonPath = projectFolder + '/package.json'
            writeFileSync(packageJsonPath, packageInfo, { spaces: 2, EOL: '\r\n' });
            
            process.chdir(projectFolder);
            spawnSync('git', ['init'], {stdio: "inherit"})
            writeFileSyncFS(`${projectFolder}/.gitignore`,'node_modules')
            
            // if install is specified run npm install
            if(cmd.install) {
                console.log(chalk.yellow('Installing dependencies...'));
                spawnSync('npm', ['i'], {stdio: "inherit", windowsHide: true})
            }
            console.log('')
            console.log(chalk.yellow('Project created!'));
            console.log(chalk.yellow('To create new app, use:'));
            console.log('');
            console.log(chalk.green('   kintone-cli create-template'));
            console.log('');
        })
}

export default initializeCommand