import { CommanderStatic } from "commander";
import validator from './validator'
import chalk from 'chalk'
import {readFileSync, writeFileSync} from 'jsonfile'
import {prompt} from 'inquirer'
import { isDomain } from "../../utils/string";

const authCommand = (program: CommanderStatic) => {
    program
        .command('auth')
        .option('-a, --app-name <appName>', 'Kintone domain')
        .option('-d, --domain <domain>', 'Kintone domain')
        .option('-u, --username <username>', 'Kintone username')
        .option('-p, --password <password>', 'Kintone password')
        .option('-i, --app-id <appID>', 'Kintone app ID')
        .option('-r, --use-proxy', 'Use proxy or not')
        .option('-x, --proxy <proxy>', 'Proxy full URL, including port number')
        .action(async (cmd)=>{
            let error = validator.authValidator(cmd)
            if (error && typeof error === 'string') {
                console.log(chalk.red(error))
                return
            }
            let authJSON: object
            try {
                authJSON = readFileSync(`${cmd['appName']}/auth.json`)
            } catch (error) {
                authJSON = {}
            }

            let configJSON = readFileSync(`${cmd['appName']}/config.json`)

            let answer = await prompt([
                {
                    type : 'input',
                    name : 'domain',
                    message : 'What is your kintone domain ?',
                    when: !cmd.domain,
                    validate: (input: any): any => {
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
                    when: !cmd.username,
                    validate: (input: any): any => {
                        if (!input) {
                            return 'Username can\'t be empty.'
                        }
                        return true
                    }
                },
                {
                    type : 'password',
                    name : 'password',
                    message : 'What is your kintone password ?',
                    when: !cmd.password,
                    validate: (input: any): any => {
                        if (!input) {
                            return 'Password can\'t be empty.'
                        }
                        return true
                    }
                },
                {
                    type: 'input',
                    name: 'appID',
                    message : 'What is the app ID ?',
                    when: !cmd.appID && !configJSON.appID,
                    validate: (input: any): any => {
                        if (!input) {
                            return 'App ID can\'t be empty.'
                        }
                        let numberMatch = input.match(/(^-?\d+|^\d+\.\d*|^\d*\.\d+)(e\d+)?$/);
                        // If a number is found, return that input.
                        if (!numberMatch) {
                            return 'App ID must be a number.'
                        }
                        return true
                    }
                },
                {
                    type : 'confirm',
                    name : 'useProxy',
                    message : 'Do you use proxy ?',
                    default: false,
                    when: !cmd.useProxy && !cmd.proxy
                },
                {
                    type : 'input',
                    name : 'proxy',
                    message : 'Specify your proxy full URL, including port number:',
                    when: (curAnswers:object) => {
                        return (cmd.useProxy || curAnswers['useProxy']) && !cmd.proxy
                    },
                    validate: (input: any): any => {
                        if (!input) {
                            return 'Proxy URL can\'t be empty.'
                        }
                        return true
                    }
                }
            ])
            
            authJSON['domain'] = cmd['domain'] || answer['domain']
            authJSON['username'] = cmd['username'] || answer['username']
            authJSON['password'] = cmd['password'] || answer['password']

            if (cmd['proxy'] || answer['proxy']) authJSON['proxy'] = cmd['proxy'] || answer['proxy']

            writeFileSync(`${cmd['appName']}/auth.json`, authJSON, {spaces: 4, EOL: "\r\n"});

            if (!configJSON['appID']) configJSON['appID'] = cmd['appID'] || answer['appID']
            writeFileSync(`${cmd['appName']}/config.json`, configJSON, {spaces: 4, EOL: "\r\n"});

            console.log(chalk.yellow('Set auth info complete.'))
            console.log(chalk.yellow('To start dev, use:'))
            console.log('')
            console.log(chalk.greenBright(`     kintone-cli dev --app-name ${cmd['appName']}`))
            console.log('')
            console.log(chalk.yellow('To deploy app, use:'))
            console.log('')
            console.log(chalk.greenBright(`     kintone-cli deploy --app-name ${cmd['appName']}`))
            console.log('')
        })
}

export default authCommand