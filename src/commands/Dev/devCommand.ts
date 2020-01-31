import { CommanderStatic } from "commander"
import chalk from 'chalk'
import {readFileSync} from 'jsonfile'
import * as spawn from "cross-spawn"
import stripAnsi from 'strip-ansi'
import { existsSync } from "fs";
import {devCustomize, devPlugin} from './devGenerator'
import validator from './validator'

const spawnSync = spawn.sync

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
        .option('--watch', 'Watch for changes in source code')
        .option('--app-name <appName>', 'Watch for changes in source code')
        .option('--localhost', 'Use localhost as link')
        .action(async (cmd) => {
            let error = validator.devValidator(cmd)
            if (error && typeof error === 'string') {
                console.log(chalk.red(error))
                return
            }
            process.on('SIGINT', () => {
                process.exit()
            })
            let watching = false
            
            // build the first time and upload link to kintone
            if (existsSync(`${cmd.appName}/webpack.config.js`)) {
                console.log(chalk.yellow('Building distributed file...'))
                spawnSync('npm', ['run',`build-${cmd.appName}`, '--', '--mode', 'development'], {stdio:['ignore', 'ignore', process.stderr]})
            }

            console.log(chalk.yellow('Starting local webserver...'))
            const ws = spawn('npm', ['run','dev', '--', '--https'])

            ws.stderr.on('data', (data) => {   
                let webserverInfo = data.toString().replace('Serving at', '')
                webserverInfo = webserverInfo.split(',')

                const serverAddr = stripAnsi((cmd.localhost ? webserverInfo[1] : webserverInfo[webserverInfo.length - 1]).trim())

                let config = readFileSync(`${cmd['appName']}/config.json`)

                config.uploadConfig.desktop.js = config.uploadConfig.desktop.js.map((item: string)=>{
                    if (!isURL(item)) return `${serverAddr}/${item}`
                    return item
                })

                config.uploadConfig.mobile.js = config.uploadConfig.mobile.js.map((item: string)=>{
                    if (!isURL(item)) return `${serverAddr}/${item}`
                    return item
                })

                config.uploadConfig.desktop.css = config.uploadConfig.desktop.css.map((item: string)=>{
                    if (!isURL(item)) return `${serverAddr}/${item}`
                    return item
                })

                if (config.type !== 'Customization') {
                  config.uploadConfig.config.js = config.uploadConfig.config.js.map((item: string) =>{
                    if (!isURL(item)) return `${serverAddr}/${item}`
                    return item
                  });

                  config.uploadConfig.config.css = config.uploadConfig.config.css.map((item: string) =>{
                    if (!isURL(item)) return `${serverAddr}/${item}`
                    return item
                  });
                }

                config.watch = cmd.watch

                console.log('')
                console.log(chalk.yellow(`Please open this link in your browser to trust kintone ${config.type} files:`))
                console.log('')
                console.log(`   ${chalk.green(`${serverAddr}`)}`)
                console.log('')

                console.log(chalk.yellow('Then, press any key to continue:'));

                process.stdin.on('data', ()=>{
                    if (!watching) {
                        watching = true
                        if (config.type === 'Customization') {
                            devCustomize(ws, config)
                        }
                        else if (config.type === 'Plugin') {
                            devPlugin(ws, config)
                        }
                    }
                });

            })
        })
}

export default devCommand