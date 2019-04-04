import { CommanderStatic } from "commander";
import chalk from 'chalk'
import * as fs from 'fs'

const configCommand = (program: CommanderStatic) => {
    program
        .command('config')
        .description('kintone Node CLI config')
        .option('--domain <domain>', 'Set domain')
        .option('--username <username>', 'Set username')
        .option('--password <password>', 'Set password')
        .action((cmd) => {
            const configArr = (fs.readFileSync(`${__dirname}/../../../.kintone/.config`, "utf8")).split("\n")
            let configData = {}
            configArr.forEach((configString: string) => {
                configData[configString.split("=")[0]] = configString.split("=")[1]
            })
            if (cmd.domain) {
                configData['domain'] = cmd.domain
            }
            if (cmd.username) {
                configData['username'] = cmd.username
            }
            if (cmd.password) {
                configData['password'] = cmd.password
            }

            if (!configData['domain']) {
                console.log(chalk.redBright('Domain required'))
                return
            }
            if (!configData['username']) {
                console.log(chalk.redBright('Username required'))
                return
            }
            if (!configData['password']) {
                console.log(chalk.redBright('Password required'))
                return
            }

            let configStringArr = []
            Object.keys(configData).forEach((key: string)=>{
                if (configData[key]) {
                    configStringArr.push(`${key}=${configData[key]}`)
                }
            })
            
            fs.writeFile(`${__dirname}/../../../.kintone/.config`, configStringArr.join("\n"), function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log(chalk.greenBright('Config success'))
            }); 
            
        });
}

export default configCommand