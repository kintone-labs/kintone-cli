import chalk from 'chalk';
import { readFileSync, writeFileSync } from 'jsonfile';
import { prompt } from 'inquirer';
import {
  appIDValidator,
  authValidator,
  domainValidator,
  passwordValidator,
  proxyValidator,
  proxyWhenValidator,
  useProxyValidator,
  usernameValidator
} from './validator';
import { MESSAGES } from '../../constant';
import { updateAuthJSON, configJSONAddProps } from './helper';
import { Command } from 'commander';

const authCommand = (program: Command) => {
  return program
    .command('auth')
    .description('Set authentication credentials')
    .option('-a, --app-name <appName>', 'App name')
    .option('-d, --domain <domain>', 'Kintone domain')
    .option('-u, --username <username>', 'Kintone username')
    .option('-p, --password <password>', 'Kintone password')
    .option('-i, --app-id <appID>', 'Kintone app ID')
    .option('-r, --use-proxy', 'Use proxy or not')
    .option('-x, --proxy <proxy>', 'Proxy full URL, including port number')
    .action(async (cmd) => {
      const error = authValidator(cmd);
      if (error && typeof error === 'string') {
        console.log(chalk.red(error));
        return;
      }
      let authJSON: any;
      try {
        authJSON = readFileSync(`${cmd.appName}/auth.json`);
      } catch (err) {
        authJSON = {};
      }

      const configJSON = readFileSync(`${cmd.appName}/config.json`);

      const answer = await prompt([
        {
          type: 'input',
          name: 'domain',
          message: MESSAGES.KINTONE_DOMAIN_PROMPT,
          when: !cmd.domain,
          validate: domainValidator
        },
        {
          type: 'input',
          name: 'username',
          message: MESSAGES.KINTONE_USERNAME_PROMPT,
          when: !cmd.username,
          validate: usernameValidator
        },
        {
          type: 'password',
          name: 'password',
          message: MESSAGES.KINTONE_PASSWORD_PROMPT,
          when: !cmd.password,
          validate: passwordValidator
        },
        {
          type: 'input',
          name: 'appID',
          message: MESSAGES.APP_ID_PROMPT,
          when: !cmd.appID && !configJSON.appID,
          validate: appIDValidator
        },
        {
          type: 'confirm',
          name: 'useProxy',
          message: MESSAGES.USE_PROXY_PROMPT,
          default: false,
          when: useProxyValidator(cmd)
        },
        {
          type: 'input',
          name: 'proxy',
          message: MESSAGES.PROXY_URL_PROMPT,
          when: (curAnswers: any) => proxyWhenValidator(cmd, curAnswers),
          validate: proxyValidator
        }
      ]);

      updateAuthJSON({ authJSON, cmd, answer });

      writeFileSync(`${cmd.appName}/auth.json`, authJSON, {
        spaces: 2,
        EOL: '\r\n'
      });

      configJSONAddProps({ configJSON, cmd, answer });

      writeFileSync(`${cmd.appName}/config.json`, configJSON, {
        spaces: 2,
        EOL: '\r\n'
      });

      console.log(chalk.yellow('Set auth info complete.'));
      console.log(chalk.yellow('To start dev, use:'));
      console.log('');
      console.log(
        chalk.greenBright(`     kintone-cli dev --app-name ${cmd.appName}`)
      );
      console.log('');
      console.log(chalk.yellow('To deploy app, use:'));
      console.log('');
      console.log(
        chalk.greenBright(`     kintone-cli deploy --app-name ${cmd.appName}`)
      );
      console.log('');
    });
};

export default authCommand;
