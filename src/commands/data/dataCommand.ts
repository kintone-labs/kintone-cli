import { CommanderStatic } from "commander";
import chalk from 'chalk'
import * as fs from 'fs'

const dataCommand = (program: CommanderStatic) => {
    program
        .command('addRecord')
        .description('kintone Node CLI add record')
        .option('--appID <appID>', 'App ID')
        .option('--jsonData <recordJSONString>', 'Record JSON data')
        .action((cmd)=>{
            if (!cmd.appID) {
                console.log(chalk.redBright('App ID required'))
                return
            }
            if (!cmd.recordJSONString) {
                console.log(chalk.redBright('Record JSON data required'))
                return
            }
        })
}

export default dataCommand