import {deployCustomization, deployPlugin} from '../Deploy/deployer'
import { existsSync } from "fs";
import * as spawn from "cross-spawn"
import { ChildProcessWithoutNullStreams } from "child_process"
import chalk from 'chalk'
import { buildPlugin } from '../Build/builder';

const spawnSync = spawn.sync

const cleanExit = (ws:ChildProcessWithoutNullStreams) => {
    ws.kill()
    process.exit()
}
const devCustomize = (ws, config: any) => {

    // Attaching links to kintone
    console.log(chalk.yellow('Attaching links to kintone...'))
    try {
        deployCustomization(config)
    } catch (error) {
        console.log(chalk.red(error))
        cleanExit(ws)
    }

    if(!config.watch) {
        console.log(chalk.yellow('All done. Happy customizing!'))
        console.log(chalk.yellow('Press Ctrl + C to stop local web server.'))
    } else {
        // watch for changes
        if (existsSync(`${config.appName}/webpack.config.js`)) {
            console.log(chalk.yellow('Watching for changes...'))
            spawnSync('npm', ['run',`build-${config.appName}`, '--', '--watch', '--mode', 'development'], {stdio:'inherit'})
        }
    }
}

const devPlugin = (ws, config: any) => {
    console.log(chalk.yellow('Building plugin...'))
    try {
        buildPlugin(config)
        deployPlugin(config)
    } catch (error) {
        console.log(chalk.red(error))
        cleanExit(ws)
    }

    if(!config.watch) {
        console.log(chalk.yellow('All done. Happy customizing!'))
        console.log(chalk.yellow('Press Ctrl + C to stop local web server.'))
    } else {
        // watch for changes
        if (existsSync(`${config.appName}/webpack.config.js`)) {
            console.log(chalk.yellow('Watching for changes...'))
            spawnSync('npm', ['run',`build-${config.appName}`, '--', '--watch', '--mode', 'development'], {stdio:'inherit'})
        }
    }
}

export {
    devCustomize,
    devPlugin
}