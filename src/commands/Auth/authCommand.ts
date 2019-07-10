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
                }
            ])
            
            authJSON['domain'] = cmd['domain'] || answer['domain']
            authJSON['username'] = cmd['username'] || answer['username']
            authJSON['password'] = cmd['password'] || answer['password']

            writeFileSync(`${cmd['appName']}/auth.json`, authJSON, {spaces: 4, EOL: "\r\n"});

            console.log(chalk.yellow('Set auth info complete.'))
            console.log(chalk.yellow('To start dev, use:'))
            console.log('')
            console.log(chalk.greenBright('     kintone-cli dev --app-name <appName>'))
            console.log('')
            console.log(chalk.yellow('To deploy app, use:'))
            console.log('')
            console.log(chalk.greenBright('     kintone-cli deploy --app-name <appName>'))
            console.log('')
        })
}

export default authCommand