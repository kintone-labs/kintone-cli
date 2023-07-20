import { Command } from 'commander';
import chalk from 'chalk';
import validator from './validator';
import { readFileSync } from 'jsonfile';
import { deployCustomization, deployPlugin } from './deployer';
import { existsSync } from 'fs';

const deployCommand = (program: any) => {
  program
    .command('deploy')
    .description('Deploy customization/plugin for production')
    .option('--app-name <appName>', 'App name')
    .action(async (cmd) => {
      const error = validator.deployValidator(cmd);
      if (error && typeof error === 'string') {
        console.log(chalk.red(error));
        return;
      }
      try {
        const config = readFileSync(`${cmd.appName}/config.json`);
        if (existsSync(`${cmd.appName}/webpack.config.js`)) {
          config.useWebpack = true;
        }

        if (config.type === 'Customization') {
          deployCustomization(config);
        } else {
          deployPlugin(config);
        }
      } catch (err) {
        console.log(err);
      }
    });
};

export default deployCommand;
