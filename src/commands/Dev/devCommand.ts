import { CommanderStatic } from "commander"
import chalk from 'chalk'
import {readFileSync} from 'jsonfile'
import { spawnSync, spawn, ChildProcessWithoutNullStreams } from "child_process"
import {deployCustomization} from '../Deploy/deployer'
import stripAnsi from 'strip-ansi'
import { existsSync } from "fs";

const cleanExit = (ws:ChildProcessWithoutNullStreams) => {
    ws.kill()
    process.exit()
}

const isURL = (str: string) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
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
                
                let webserverInfo = data.toString().replace('Serving at', '')
                webserverInfo = webserverInfo.split(',')
                const serverAddr = stripAnsi(webserverInfo[1].trim())

                let config = readFileSync(`${cmd['appName']}/config.json`)

                const distFileLinkArr = []

                config.uploadConfig.desktop.js.forEach((item)=>{
                    if (isURL(item)) {
                        distFileLinkArr.push(item)
                    }
                    else {
                        distFileLinkArr.push(`${serverAddr}/${item}`)
                    }
                })

                // (IN FUTURE) check if there is no webpack.config.js upload file links according to config

                // build the first time and upload link to kintone
                if (existsSync(`${cmd.appName}/webpack.config.js`)) {
                    console.log(chalk.yellow('Building distributed file...'))
                    spawnSync('npm', ['run',`build-${cmd.appName}`, '--', '--mode', 'development'], {stdio:['ignore', 'ignore', process.stderr]})
                }

                // Attaching links to kintone
                console.log(chalk.yellow('Attaching links to kintone...'))
                try {
                    config.uploadConfig.desktop.js = distFileLinkArr
                    config.uploadConfig.mobile.js = []
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
                    if (existsSync(`${cmd.appName}/webpack.config.js`)) {
                        console.log(chalk.yellow('Watching for changes...'))
                        spawnSync('npm', ['run',`build-${cmd.appName}`, '--', '--watch'], {stdio:'inherit'})
                    }
                }
            })
        })
}

export default devCommand