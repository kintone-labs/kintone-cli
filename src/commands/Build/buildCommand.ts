import { Command } from 'commander';
import chalk from 'chalk';
import validator from './validator';
import { readFileSync } from 'jsonfile';
import { existsSync } from 'fs';
import { buildUsingWebpack, buildVanillaJS, buildPlugin } from './builder';

const buildCommand = (program: Command) => {
  program
    .command('build')
    .description('Build customization/plugin')
    .option('--app-name <appName>', 'App name')
    .action(async (cmd) => {
      const error = validator.buildValidator(cmd);
      if (error && typeof error === 'string') {
        console.log(chalk.red(error));
        return;
      }
      try {
        const config = readFileSync(`${cmd.appName}/config.json`);

        if (existsSync(`${config.appName}/webpack.config.js`)) {
          buildUsingWebpack(config);
        } else {
          if (config.type === 'Customization') {
            console.log(chalk.red('No webpack.config.js'));
            return;
          }
          buildVanillaJS(config);
        }
        if (config.type === 'Plugin') {
          buildPlugin(config);
        }
        console.log('');
        console.log(chalk.yellow('Build app complete.'));

        if (!existsSync(`${config.appName}/auth.json`)) {
          console.log(chalk.yellow('To set auth info, use:'));
          console.log('');
          console.log(
            chalk.greenBright(
              `     kintone-cli auth --app-name ${config.appName}`
            )
          );
          console.log('');
        } else {
          console.log(chalk.yellow('To deploy app, use:'));
          console.log('');
          console.log(
            chalk.greenBright(
              `     kintone-cli deploy --app-name ${config.appName}`
            )
          );
          console.log('');
        }
      } catch (err) {
        console.log(err);
      }
    });
};

export default buildCommand;
