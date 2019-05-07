import { CommanderStatic } from "commander";
import chalk from 'chalk'
import validator from './validator'
import {readFileSync} from 'jsonfile'
import { existsSync } from "fs";
import {buildUsingWebpack, buildVanillaJS} from './builder'

const buildCommand = (program: CommanderStatic) => {
    program
        .command('build')
        .option('--appName <appName>','App name')
        .action(async (cmd) => {
            let error = validator.buildValidator(cmd)
            if (error && typeof error === 'string') {
                console.log(chalk.red(error))
                return
            }
            try {
                let config = readFileSync(`${cmd['appName']}/config.json`)

                if (existsSync(`${config['appName']}/webpack.config.js`)) {
                    buildUsingWebpack(config)
                }
                else {
                    if (config['type'] === 'Customization') {
                        console.log(chalk.red('No webpack.config.js'))
                        return
                    }
                    buildVanillaJS(config)
                }

            } catch (error) {
                console.log(error)
            }
        })
}

export default buildCommand