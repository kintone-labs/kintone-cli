import { CommanderStatic } from "commander"
import chalk from 'chalk'
import {readFileSync} from 'jsonfile'
import { spawnSync, spawn, ChildProcessWithoutNullStreams } from "child_process"
import {deployCustomization} from '../Deploy/deployer'
import stripAnsi from 'strip-ansi'

const cleanExit = (ws:ChildProcessWithoutNullStreams) => {
    ws.kill()
    process.exit()
}

const devCommand = (program: CommanderStatic) => {
    program
        .command('dev')
        .option('--watch','Watch for changes in source code')
        .option('--appName <appName>','Watch for changes in source code')
        .action(async (cmd) => {
            if(!cmd.appName) {
                console.log(chalk.red('Please, specify app name!'))
                process.exit(-1)
            }
            process.on('SIGINT', () => {
                process.exit()
            })
            let watching = false
            console.log(chalk.yellow('Starting local webserver...'))
            const ws = spawn('npm', ['run','dev', '--', '--https'])
            ws.stderr.on('data', (data) => {
                console.log(data.toString())
                let webserverInfo = data.toString().replace('Serving at', '')
                webserverInfo = webserverInfo.split(',')
                const serverAddr = stripAnsi(webserverInfo[0].trim())
                const distFileLink = `${serverAddr}/${cmd.appName}/dist/${cmd.appName}.min.js`

                // (IN FUTURE) check if there is no webpack.config.js upload file links according to config

                // build the first time and upload link to kintone
                console.log(chalk.yellow('Building distributed file...'))
                spawnSync('npm', ['run',`build-${cmd.appName}`], {stdio:['ignore', 'ignore', process.stderr]})

                // Attaching links to kintone
                console.log(chalk.yellow('Attaching links to kintone...'))
                try {
                    let config = readFileSync(`${cmd['appName']}/config.json`)
                    config.uploadConfig.desktop.js = [distFileLink]
                    config.uploadConfig.mobile.js = []
                    console.log(config.uploadConfig.desktop.js[0])
                    if (config.type === 'Customization') {
                        deployCustomization(config)
                    }
                } catch (error) {
                    console.log(chalk.red(error))
                    cleanExit(ws)
                }

                if(!cmd.watch) {
                    console.log(chalk.yellow('All done. Happy customizing!'))
                    console.log(chalk.yellow('Press Ctrl + C to stop local web server.'))
                } else if(!watching) {
                    // watch for changes
                    watching = true
                    console.log(chalk.yellow('Watching for changes...'))
                    spawnSync('npm', ['run',`build-${cmd.appName}`, '--', '--watch'], {stdio:'inherit'})
                }
            })
        })
}

export default devCommand