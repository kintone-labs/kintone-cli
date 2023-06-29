import { CommanderStatic } from 'commander';
import chalk from 'chalk';
import { readFileSync } from 'jsonfile';
import * as spawn from 'cross-spawn';
import stripAnsi from 'strip-ansi';
import { existsSync } from 'fs';
import { prompt } from 'inquirer';
import { devCustomize, devPlugin } from './devGenerator';
import validator from './validator';
const readline = require('readline');

const spawnSync = spawn.sync;

const isURL = (str: string) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~@+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
};

const getLoopBackAddress = async (resp: any, localhost: boolean) => {
  if (resp.indexOf('Serving at') === -1) {
    console.log(chalk.red(`${resp}`));
    return '';
  }
  const webServerInfo = resp.replace('Serving at', '');
  const loopbackAddress = webServerInfo.split(',');
  const localAddress = [];
  for (let index = 0; index < loopbackAddress.length; index++) {
    const url = loopbackAddress[index].trim();
    const address = stripAnsi(url);
    if (address) localAddress.push(address);
  }
  if (localAddress.length < 1) {
    console.log(chalk.red(`There is no local link, Please try again.`));
    return '';
  }
  if (localhost) {
    const LOCAL_ADDRESS_DEFAULT = 'https://127.0.0.1:8000';
    if (localAddress.indexOf(LOCAL_ADDRESS_DEFAULT) > -1)
      return LOCAL_ADDRESS_DEFAULT;
    return localAddress[localAddress.length - 1];
  }
  const answer = await prompt([
    {
      type: 'list',
      name: 'localAddress',
      message: 'Please choose a loopback address',
      when: !localhost,
      choices: localAddress
    }
  ]);
  return answer.localAddress;
};

const readLineAsync = () => {
  const rl = readline.createInterface({
    input: process.stdin
  });
  return new Promise((resolve) => {
    rl.prompt();
    rl.on('line', (line: string) => {
      rl.close();
      resolve(line);
    });
  });
};

const devCommand = (program: CommanderStatic) => {
  program
    .command('dev')
    .description('Deploy customization/plugin for development')
    .option('--watch', 'Watch for changes in source code')
    .option('--app-name <appName>', 'App name')
    .option('--localhost', 'Use localhost as link')
    .action(async (cmd) => {
      const error = validator.devValidator(cmd);
      if (error && typeof error === 'string') {
        console.log(chalk.red(error));
        return;
      }
      process.on('SIGINT', () => {
        process.exit();
      });
      let watching = false;

      // build the first time and upload link to kintone
      if (existsSync(`${cmd.appName}/webpack.config.js`)) {
        console.log(chalk.yellow('Building distributed file...'));
        spawnSync(
          'npm',
          ['run', `build-${cmd.appName}`, '--', '--mode', 'development'],
          { stdio: ['ignore', 'ignore', process.stderr] }
        );
      }

      console.log(chalk.yellow('Starting local webserver...'));
      const ws = spawn('npm', ['run', 'dev', '--', '--https']);

      ws.stderr.on('data', async (data) => {
        const resp = data.toString();
        const serverAddr = await getLoopBackAddress(resp, cmd.localhost);

        const config = readFileSync(`${cmd.appName}/config.json`);

        config.uploadConfig.desktop.js = config.uploadConfig.desktop.js.map(
          (item: string) => {
            if (!isURL(item)) return `${serverAddr}/${item}`;
            return item;
          }
        );

        config.uploadConfig.mobile.js = config.uploadConfig.mobile.js.map(
          (item: string) => {
            if (!isURL(item)) return `${serverAddr}/${item}`;
            return item;
          }
        );

        config.uploadConfig.desktop.css = config.uploadConfig.desktop.css.map(
          (item: string) => {
            if (!isURL(item)) return `${serverAddr}/${item}`;
            return item;
          }
        );

        if (config.type !== 'Customization') {
          config.uploadConfig.config.js = config.uploadConfig.config.js.map(
            (item: string) => {
              if (!isURL(item)) return `${serverAddr}/${item}`;
              return item;
            }
          );

          config.uploadConfig.config.css = config.uploadConfig.config.css.map(
            (item: string) => {
              if (!isURL(item)) return `${serverAddr}/${item}`;
              return item;
            }
          );
        }

        config.watch = cmd.watch;

        console.log('');
        console.log(
          chalk.yellow(
            `Please open this link in your browser to trust kintone ${config.type} files:`
          )
        );
        console.log('');
        console.log(`   ${chalk.green(`${serverAddr}`)}`);
        console.log('');

        console.log(chalk.yellow('Then, press any key to continue:'));

        await readLineAsync();
        if (!watching) {
          watching = true;
          if (config.type === 'Customization') {
            devCustomize(ws, config);
          } else if (config.type === 'Plugin') {
            devPlugin(ws, config);
          }
        }
      });
    });
};

export default devCommand;
