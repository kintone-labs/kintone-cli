import { CommanderStatic } from "commander";
import chalk from 'chalk'
import {spawn} from 'child_process'

const initializeCommand = (program: CommanderStatic) => {
    program
        .command('init')
        .description('Init kintone project')
        .action(async (cmd)=>{
            console.log(chalk.yellow('Init project using npm init...'))
            spawn('npm',['init'], {stdio: [process.stdin, process.stdout, process.stderr]});
        })
}

export default initializeCommand