"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const jsonfile_1 = require("jsonfile");
const child_process_1 = require("child_process");
const deployer_1 = require("../Deploy/deployer");
const strip_ansi_1 = require("strip-ansi");
const fs_1 = require("fs");
const cleanExit = (ws) => {
    ws.kill();
    process.exit();
};
const isURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
};
const devCommand = (program) => {
    program
        .command('dev')
        .option('--watch', 'Watch for changes in source code')
        .option('--appName <appName>', 'Watch for changes in source code')
        .action((cmd) => __awaiter(this, void 0, void 0, function* () {
        if (!cmd.appName) {
            console.log(chalk_1.default.red('Please, specify app name!'));
            process.exit(-1);
        }
        process.on('SIGINT', () => {
            process.exit();
        });
        let watching = false;
        console.log(chalk_1.default.yellow('Starting local webserver...'));
        const ws = child_process_1.spawn('npm', ['run', 'dev', '--', '--https']);
        ws.stderr.on('data', (data) => {
            console.log(data.toString());
            let webserverInfo = data.toString().replace('Serving at', '');
            webserverInfo = webserverInfo.split(',');
            const serverAddr = strip_ansi_1.default(webserverInfo[0].trim());
            let config = jsonfile_1.readFileSync(`${cmd['appName']}/config.json`);
            const distFileLinkArr = [];
            config.uploadConfig.desktop.js.forEach((item) => {
                if (isURL(item)) {
                    distFileLinkArr.push(item);
                }
                else {
                    distFileLinkArr.push(`${serverAddr}/${item}`);
                }
            });
            // (IN FUTURE) check if there is no webpack.config.js upload file links according to config
            // build the first time and upload link to kintone
            if (fs_1.existsSync(`${cmd.appName}/webpack.config.js`)) {
                console.log(chalk_1.default.yellow('Building distributed file...'));
                child_process_1.spawnSync('npm', ['run', `build-${cmd.appName}`], { stdio: ['ignore', 'ignore', process.stderr] });
            }
            // Attaching links to kintone
            console.log(chalk_1.default.yellow('Attaching links to kintone...'));
            try {
                config.uploadConfig.desktop.js = distFileLinkArr;
                config.uploadConfig.mobile.js = [];
                if (config.type === 'Customization') {
                    deployer_1.deployCustomization(config);
                }
            }
            catch (error) {
                console.log(chalk_1.default.red(error));
                cleanExit(ws);
            }
            if (!cmd.watch) {
                console.log(chalk_1.default.yellow('All done. Happy customizing!'));
                console.log(chalk_1.default.yellow('Press Ctrl + C to stop local web server.'));
            }
            else if (!watching) {
                // watch for changes
                watching = true;
                if (fs_1.existsSync(`${cmd.appName}/webpack.config.js`)) {
                    console.log(chalk_1.default.yellow('Watching for changes...'));
                    child_process_1.spawnSync('npm', ['run', `build-${cmd.appName}`, '--', '--watch'], { stdio: 'inherit' });
                }
            }
        });
    }));
};
exports.default = devCommand;
