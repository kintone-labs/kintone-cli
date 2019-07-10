import { CommanderStatic } from "commander";
import chalk from 'chalk'
import validator from './validator'
import {readFileSync} from 'jsonfile'
import {deployCustomization, deployPlugin} from './deployer'
import {existsSync} from 'fs'

const deployCommand = (program: CommanderStatic) => {
    program
        .command('deploy')
        .option('--app-name <appName>','App name')
        .action(async (cmd) => {
            let error = validator.deployValidator(cmd)
            if (error && typeof error === 'string') {
                console.log(chalk.red(error))
                return
            }
            try {
                let config = readFileSync(`${cmd['appName']}/config.json`)
                if (existsSync(`${cmd['appName']}/webpack.config.js`)) {
                    config.useWebpack = true
                }

                if (config.type === 'Customization') {
                    deployCustomization(config)
                }
                else {
                    deployPlugin(config)
                }

            } catch (error) {
                console.log(error)
            }
        })
}

export default deployCommand