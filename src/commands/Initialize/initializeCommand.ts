import { CommanderStatic } from "commander";
import chalk from 'chalk'
import {spawnSync} from 'child_process'
import {prompt} from 'inquirer'
import validator from './validator'
import {writeFileSync, readFileSync} from 'jsonfile'
import {mkdirSync, existsSync, writeFileSync as writeFileSyncFS} from 'fs'
import {buildWebpackReactTemplate, WebpackParams} from './webpackTemplate'
const generateAppFolder = (option: object): string | boolean => {
    if (!existsSync('package.json')) {
        return 'Project not initialized'
    }
    let packageJSON = readFileSync('package.json')
    let manifestJSON = {}

    if (option['appID']) {
        manifestJSON['appID'] = option['appID']
    }

    if (option['pluginName']) {
        manifestJSON['pluginName'] = option['pluginName']
    }

    manifestJSON['appName'] = option['appName']
    manifestJSON['type'] = option['type']

    if (existsSync(option['appName'])) {
        return 'App folder existed'
    }

    mkdirSync(option['appName']);

    if (option['setAuth']) {
        let authJSON = {
            username: option['username'],
            password: option['password'],
            domain: option['domain']
        }

        writeFileSync(`${option['appName']}/auth.json`,authJSON,{spaces:2, EOL: "\r\n"})
    }

    if (option['useWebpack']) {
        let babelJSON = {
            plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-syntax-dynamic-import"
            ]
        }

        writeFileSync(`${option['appName']}/.babelrc`,babelJSON,{spaces:2, EOL: "\r\n"})

        if (!packageJSON.devDependencies) {
            packageJSON.devDependencies = {}
        }
        packageJSON.devDependencies.webpack = "^4.30.0"
        packageJSON.devDependencies['webpack-cli'] = "^3.2.3"
        packageJSON.devDependencies['babel-loader'] = "^8.0.5"
        packageJSON.devDependencies['style-loader'] = "^0.23.1"
        packageJSON.devDependencies['css-loader'] = "^2.1.0"
        packageJSON.devDependencies["@babel/core"] = "^7.3.3"
        packageJSON.devDependencies["@babel/preset-env"] = "^7.3.1"
        packageJSON.devDependencies["@babel/plugin-proposal-class-properties"] = "^7.3.3"
        packageJSON.devDependencies["@babel/plugin-syntax-dynamic-import"] = "^7.2.0"

        if (!packageJSON.scripts) {
            packageJSON.scripts = {}
        }

        if (option['useTypescript']) {
            packageJSON.devDependencies["@babel/preset-typescript"] = "^7.3.3"
        }
        if (option['useReact']) {
            packageJSON.devDependencies["@babel/preset-react"] = "^7.0.0"
            
        }
        packageJSON.scripts[`build-${option['appName']}`] = `webpack --config ${option['appName']}/webpack.config.js`

        writeFileSync(`package.json`,packageJSON,{spaces:2, EOL: "\r\n"})

        let webpackTemplate = buildWebpackReactTemplate(option as WebpackParams)
        writeFileSyncFS(`${option['appName']}/webpack.config.js`, webpackTemplate)
        spawnSync('npx',['prettier', '--write', `${option['appName']}/webpack.config.js`], {stdio: 'inherit'})
    }

    if (option['useTypescript']) {
        if (!packageJSON.devDependencies) {
            packageJSON.devDependencies = {}
        }
        packageJSON.devDependencies.typescript = "^2.3.3"
        packageJSON.devDependencies.tsc = "^1.20150623.0"
        writeFileSync(`package.json`,packageJSON,{spaces:2, EOL: "\r\n"})
    }

    if (option['useReact']) {
        if (!packageJSON.dependencies) {
            packageJSON.dependencies = {}
        }
        packageJSON.dependencies.react = "^16.8.6"
        packageJSON.dependencies['react-dom'] = "^16.7.0"
        writeFileSync(`package.json`,packageJSON,{spaces:2, EOL: "\r\n"})
    }

    mkdirSync(`${option['appName']}/source`)
    mkdirSync(`${option['appName']}/source/js`)
    mkdirSync(`${option['appName']}/source/css`)
    mkdirSync(`${option['appName']}/dist`)
    writeFileSync(`${option['appName']}/appConfig.json`,manifestJSON,{spaces:2, EOL: "\r\n"})
    writeFileSyncFS(`${option['appName']}/source/${option['entry']}`, '')

    return false
}

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