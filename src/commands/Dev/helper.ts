import { readFileSync } from 'jsonfile';
import stripAnsi from 'strip-ansi';
import { prompt } from 'inquirer';
import { devCustomize, devPlugin } from './devGenerator';
import chalk from 'chalk';

export const devCommandHandle = async ({ ws, cmd, data, readLineAsync }) => {
  let watching = false;
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
};

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

export const getLoopBackAddress = async (resp: any, localhost: boolean) => {
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
