"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devCommandHandle = void 0;
const jsonfile_1 = require("jsonfile");
const strip_ansi_1 = __importDefault(require("strip-ansi"));
const inquirer_1 = require("inquirer");
const devGenerator_1 = require("./devGenerator");
const chalk_1 = __importDefault(require("chalk"));
const readline = require('readline');
const devCommandHandle = (ws, cmd, data) => __awaiter(void 0, void 0, void 0, function* () {
    let watching = false;
    const resp = data.toString();
    console.log(resp, 'resprespresp', data);
    const serverAddr = yield getLoopBackAddress(resp, cmd.localhost);
    const config = (0, jsonfile_1.readFileSync)(`${cmd.appName}/config.json`);
    config.uploadConfig.desktop.js = config.uploadConfig.desktop.js.map((item) => {
        if (!isURL(item))
            return `${serverAddr}/${item}`;
        return item;
    });
    config.uploadConfig.mobile.js = config.uploadConfig.mobile.js.map((item) => {
        if (!isURL(item))
            return `${serverAddr}/${item}`;
        return item;
    });
    config.uploadConfig.desktop.css = config.uploadConfig.desktop.css.map((item) => {
        if (!isURL(item))
            return `${serverAddr}/${item}`;
        return item;
    });
    if (config.type !== 'Customization') {
        config.uploadConfig.config.js = config.uploadConfig.config.js.map((item) => {
            if (!isURL(item))
                return `${serverAddr}/${item}`;
            return item;
        });
        config.uploadConfig.config.css = config.uploadConfig.config.css.map((item) => {
            if (!isURL(item))
                return `${serverAddr}/${item}`;
            return item;
        });
    }
    config.watch = cmd.watch;
    console.log('');
    console.log(chalk_1.default.yellow(`Please open this link in your browser to trust kintone ${config.type} files:`));
    console.log('');
    console.log(`   ${chalk_1.default.green(`${serverAddr}`)}`);
    console.log('');
    console.log(chalk_1.default.yellow('Then, press any key to continue:'));
    yield readLineAsync();
    if (!watching) {
        watching = true;
        if (config.type === 'Customization') {
            (0, devGenerator_1.devCustomize)(ws, config);
        }
        else if (config.type === 'Plugin') {
            (0, devGenerator_1.devPlugin)(ws, config);
        }
    }
});
exports.devCommandHandle = devCommandHandle;
const isURL = (str) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~@+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
};
const getLoopBackAddress = (resp, localhost) => __awaiter(void 0, void 0, void 0, function* () {
    if (resp.indexOf('Serving at') === -1) {
        console.log(chalk_1.default.red(`${resp}`));
        return '';
    }
    const webServerInfo = resp.replace('Serving at', '');
    const loopbackAddress = webServerInfo.split(',');
    const localAddress = [];
    for (let index = 0; index < loopbackAddress.length; index++) {
        const url = loopbackAddress[index].trim();
        const address = (0, strip_ansi_1.default)(url);
        if (address)
            localAddress.push(address);
    }
    if (localAddress.length < 1) {
        console.log(chalk_1.default.red(`There is no local link, Please try again.`));
        return '';
    }
    if (localhost) {
        const LOCAL_ADDRESS_DEFAULT = 'https://127.0.0.1:8000';
        if (localAddress.indexOf(LOCAL_ADDRESS_DEFAULT) > -1)
            return LOCAL_ADDRESS_DEFAULT;
        return localAddress[localAddress.length - 1];
    }
    const answer = yield (0, inquirer_1.prompt)([
        {
            type: 'list',
            name: 'localAddress',
            message: 'Please choose a loopback address',
            when: !localhost,
            choices: localAddress
        }
    ]);
    return answer.localAddress;
});
const readLineAsync = () => {
    const rl = readline.createInterface({
        input: process.stdin
    });
    return new Promise((resolve) => {
        rl.prompt();
        rl.on('line', (line) => {
            rl.close();
            resolve(line);
        });
    });
};
//# sourceMappingURL=helper.js.map