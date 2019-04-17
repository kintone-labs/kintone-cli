import { CommanderStatic } from "commander";
import chalk from 'chalk'
import recordService from './services/record'

const dataCommand = (program: CommanderStatic) => {
    program
        .command('addRecord')
        .description('kintone Node CLI add record')
        .option('--appID <appID>', 'App ID')
        .option('--jsonData <jsonData>', 'Record JSON data')
        .action(async (cmd)=>{
            if (!cmd.appID) {
                console.log(chalk.redBright('App ID required'))
                return
            }
            if (!cmd.jsonData) {
                console.log(chalk.redBright('Record JSON data required'))
                return
            }
            let result = await recordService.createRecord(cmd.appID, JSON.parse(cmd.jsonData))
            console.log(result)
        })

    program
        .command('readRecord')
        .description('kintone Node CLI read record')
        .option('--appID <appID>', 'App ID')
        .option('--recordID <recordID>', 'Record ID')
        .action(async (cmd)=>{
            if (!cmd.appID) {
                console.log(chalk.redBright('App ID required'))
                return
            }
            if (!cmd.recordID) {
                console.log(chalk.redBright('Record ID required'))
                return
            }
            let result = await recordService.readRecord(cmd.appID, cmd.recordID)
            console.log(result)
        })
}

export default dataCommand