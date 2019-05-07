import { CommanderStatic } from "commander";
import chalk from 'chalk'
import {spawnSync} from 'child_process'
import {prompt} from 'inquirer'
import validator from './validator'
import {writeFileSync} from 'jsonfile'
import {mkdirSync, existsSync} from 'fs'

import {generateAppFolder} from './generator'

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
        .option('--set-auth', 'Set authentication credentials')
        .option('--use-typescript', 'Use typescript or not')
        .option('--use-webpack', 'Use webpack or not')
        .option('--type <type>', 'Set app type')
        .option('--domain <domain>', 'Set kintone domain')
        .action(async (cmd)=>{
            let error = validator.appValidator(cmd)
            if (error && typeof error === 'string') {
                console.log(chalk.red(error))
                return
            }
            try {
                if (!cmd.type) {
                    let answerType = await prompt([
                        {
                            type : 'list',
                            name : 'type',
                            message : 'What type of app you want to create ?',
                            choices: ['Customization','Plugin']
                        }
                    ])
                    cmd.type = answerType['type']
                }
                if (!cmd.setAuth) {
                    let answerAuth = await prompt([
                        {
                            type : 'confirm',
                            name : 'setAuth',
                            message : 'Do you want to set authentication credentials ?'
                        }
                    ])
                    cmd.setAuth = answerAuth['setAuth'] 
                }
                if (cmd.setAuth) {
                    let answerCredentials = await prompt([
                        {
                            type : 'input',
                            name : 'domain',
                            message : 'What is your kintone domain ?'
                        },
                        {
                            type : 'input',
                            name : 'username',
                            message : 'What is your kintone username ?'
                        },
                        {
                            type : 'input',
                            name : 'password',
                            message : 'What is your kintone password ?'
                        }
                    ])
                    cmd.domain = answerCredentials['domain']
                    cmd.username = answerCredentials['username']
                    cmd.password = answerCredentials['password']
                }
                if (!cmd.useTypescript) {
                    let answerTypescript = await prompt([
                        {
                            type: 'confirm',
                            name: 'useTypescript',
                            message : 'Do you want to use Typescript ?'
                        }
                    ])
                    cmd.useTypescript = answerTypescript['useTypescript']
                }
                if (!cmd.useWebpack) {
                    let answerWebpack = await prompt([
                        {
                            type: 'confirm',
                            name: 'useWebpack',
                            message : 'Do you want to use Webpack ?'
                        }
                    ])
                    cmd.useWebpack = answerWebpack['useWebpack']
                }
                if (cmd.useWebpack) {
                    let answerUsingWebpack = await prompt([
                        {
                            type: 'confirm',
                            name: 'useReact',
                            message : 'Do you want to use React ?'
                        },
                        {
                            type: 'input',
                            name: 'entry',
                            message : 'What is the entry for Webpack ?'
                        }
                    ])
                    cmd.useReact = answerUsingWebpack['useReact']
                    cmd.entry = answerUsingWebpack['entry']
                }

                if (!cmd.appName) {
                    let answerAppName = await prompt([
                        {
                            type: 'input',
                            name: 'appName',
                            message : 'What is the app name ?'
                        }
                    ])
                    cmd.appName = answerAppName['appName']
                }

                // Config for appConfig.json
                if (cmd.type === 'Plugin') {
                    cmd.pluginName = {
                        en: cmd.appName
                    }
                }
                else if (cmd.type === 'Customization') {
                    if (!cmd.appID) {
                        let answerAppID = await prompt([
                            {
                                type: 'number',
                                name: 'appID',
                                message : 'What is the app ID for customization ?'
                            }
                        ])
                        cmd.appID = answerAppID['appID']
                    }
                    if (!cmd.scope) {
                        let answerScope = await prompt([
                            {
                                type : 'list',
                                name : 'scope',
                                message : 'What is the scope of customization ?',
                                choices: ['ALL','ADMIN','NONE']
                            }
                        ])
                        cmd.scope = answerScope['scope']
                    }
                }

                let appSetting = {
                    setAuth: cmd.setAuth,
                    useTypescript: cmd.useTypescript,
                    useWebpack: cmd.useWebpack,
                    entry: cmd.entry,
                    useReact: cmd.useReact,
                    appName: cmd.appName.replace(" ","-"),
                    domain: cmd.domain,
                    username: cmd.username,
                    password: cmd.password,
                    type: cmd.type,
                    appID: cmd.appID,
                    pluginName: cmd.pluginName
                }

                console.log(chalk.yellow('Creating app...'))
                let err = generateAppFolder(appSetting)
                if (err && typeof err === 'string') {
                    console.log(chalk.red(err))
                    return
                }
                console.log(chalk.yellow('Installing dependencies...'))
                spawnSync('npm',['install'],{stdio: 'inherit'})
            } catch (error) {
                console.log(error)
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
            if(packageInfo['dependencies']['@kintone/kintone-js-sdk'])
            packageInfo['dependencies']['@kintone/kintone-js-sdk'] = latestJsSdkVersion;

            // create project folder 
            const projectFolder = global['currentDir'] + '/' + packageInfo['name'];
            if(existsSync(projectFolder)) {
                console.error(chalk.red('Project folder already exists! Please, run the cli again and choose another project name.'))
                process.exit(-1)
            }
            mkdirSync(projectFolder);

            // write project info object to package.json
            const packageJsonPath = projectFolder + '/package.json'
            writeFileSync(packageJsonPath, packageInfo, { spaces: 2, EOL: '\r\n' });
            
            // if install is specified run npm install
            if(cmd.install) {
                process.chdir(projectFolder);
                console.log(chalk.yellow('Installing dependencies...'));
                spawnSync('npm', ['i'], {stdio: "inherit"})
            }
            console.log(chalk.yellow('You are all set! Happy kintone customizing!'));
        })
}

export default initializeCommand