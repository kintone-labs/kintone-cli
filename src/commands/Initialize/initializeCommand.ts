import { CommanderStatic } from "commander";
import chalk from 'chalk'
import {spawn} from 'child_process'

const initializeCommand = (program: CommanderStatic) => {
    program
        .command('init')
        .description('Init kintone project')
        .action(async (cmd)=>{
            console.log(123)
            spawn('npm',['init']);
        })
}

export default initializeCommand