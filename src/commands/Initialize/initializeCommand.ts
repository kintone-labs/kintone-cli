import { CommanderStatic } from "commander";
import chalk from 'chalk'
import * as spawn from "cross-spawn"
import {prompt} from 'inquirer'
import validator from './validator'
import {writeFileSync} from 'jsonfile'
import {mkdirSync, existsSync} from 'fs'

import {generateAppFolder} from './generator'

const spawnSync = spawn.sync

const initializeCommand = (program: CommanderStatic) => {
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
    ]
    
    program
        .command('create-template')
        .option('-q, --quick', 'Use default template')
        .option('-a, --set-auth', 'Set authentication credentials')
        .option('-n, --app-name <appName>', 'Set app name')
        .option('-s, --use-typescript', 'Use typescript or not')
        .option('-w, --use-webpack', 'Use webpack or not')
        .option('-t, --type <type>', 'Set app type')
        .option('-d, --domain <domain>', 'Set kintone domain')
        .option('-u, --username <username>', 'Set username')
        .option('-p, --password <password>', 'Set password')
        .option('-i, --appID <appID>', 'Set app ID for customization')
        .option('-l, --use-cybozu-lint', 'Use cybozu eslint rules')
        .option('--preset <preset>', 'Preset for generating template')
        .action(async (cmd)=>{
            let error = validator.appValidator(cmd)
            if (error && typeof error === 'string') {
                console.log(chalk.red(error))
                return
            }
            try {
                let answer = {}
                if (cmd.quick) {
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
                            cmd.entry = 'app.jsx'
                            break;
                        case 'ReactTS':
                            cmd.useTypescript = true
                            cmd.useWebpack = true
                            cmd.useReact = true
                            cmd.entry = 'app.tsx'
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
                                return cmd.setAuth || curAnswers['setAuth']
                            }
                        },
                        {
                            type : 'input',
                            name : 'username',
                            message : 'What is your kintone username ?',
                            when: (curAnswers:object) => {
                                return cmd.setAuth || curAnswers['setAuth']
                            }
                        },
                        {
                            type : 'password',
                            name : 'password',
                            message : 'What is your kintone password ?',
                            when: (curAnswers:object) => {
                                return cmd.setAuth || curAnswers['setAuth']
                            }
                        },
                        {
                            type : 'confirm',
                            name : 'useProxy',
                            message : 'Do you use proxy ?',
                            when: (curAnswers:object) => {
                                return cmd.setAuth || curAnswers['setAuth']
                            }
                        },
                        {
                            type : 'input',
                            name : 'proxy',
                            message : 'Specify your proxy full URL, including port number:',
                            when: (curAnswers:object) => {
                                return cmd.useProxy || curAnswers['useProxy']
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
                            message : 'Do you want to use Typescript ?',
                            when: cmd.useTypescript === undefined
                        },
                        {
                            type: 'confirm',
                            name: 'useWebpack',
                            message : 'Do you want to use Webpack ?',
                            when: cmd.useWebpack === undefined && cmd.useReact
                        },
                        {
                            type: 'input',
                            name: 'entry',
                            message : 'What is the entry for Webpack ?',
                            when: (curAnswers:object) => {
                                return cmd.useWebpack || curAnswers['useWebpack']
                            }
                        },
                        {
                            type: 'input',
                            name: 'appName',
                            message : 'What is the app name ?',
                            when: cmd.appName === undefined
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
                    pluginName: cmd.pluginName || answer['pluginName'],
                    useCybozuLint: cmd.useCybozuLint || answer['useCybozuLint'],
                    scope: cmd.scope || answer['scope'],
                    proxy: cmd.proxy || answer['proxy']
                }

                console.log(chalk.yellow('Creating app...'))
                let err = generateAppFolder(appSetting)
                if (err && typeof err === 'string') {
                    console.log(chalk.red(err))
                    return
                }
                console.log(chalk.yellow('Installing dependencies...'))
                spawnSync('npm',['install'], {stdio: 'inherit', windowsHide: true})
                
            } catch (error) {
                console.log(chalk.red(error))
            }
        })

    program
        .command('init')
        .description('Initialize kintone project')
        .option('--install')
        .action(async (cmd)=>{
            console.log(chalk.yellow('Welcome to kintone-cli!'));
            console.log(chalk.yellow('Please, input below information so we can get started!'));
            
            // ask info about project
            const packageInfo = await prompt(questions)
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
            
            // if install is specified run npm install
            if(cmd.install) {
                process.chdir(projectFolder);
                console.log(chalk.yellow('Installing dependencies...'));
                spawnSync('npm', ['i'], {stdio: "inherit", windowsHide: true})
            }
            console.log(chalk.yellow('You are all set! Happy kintone customizing!'));
        })
}

export default initializeCommand