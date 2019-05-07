import { CommanderStatic } from "commander"
import chalk from 'chalk'
import {spawnSync} from 'child_process'

const lintCommand = (program: CommanderStatic) => {
    program
        .command('lint')
        .option('--fix', 'Auto fix eslint errors')
        .option('--folder <folder>', 'Name of template folder to run eslint')
        .action(async (cmd)=>{
          console.log(chalk.yellow('Checking syntax...'));
          if(cmd.folder) {
            spawnSync('npm', ['run', `lint-${cmd.folder}${cmd.fix?'-fix':''}`], {stdio: 'inherit'});
          }
          else {
            spawnSync('npm', ['run', `lint-all${cmd.fix?'-fix':''}`], {stdio: 'inherit'});
          }
        })
}

export default lintCommand