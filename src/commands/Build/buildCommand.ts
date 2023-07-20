import chalk from 'chalk';
import { buildValidator } from './validator';
import { buildCommandImplement } from './helper';

const buildCommand = (program: any) => {
  return program
    .command('build')
    .description('Build customization/plugin')
    .option('--app-name <appName>', 'App name')
    .action(async (cmd) => {
      const error = buildValidator(cmd);
      if (error && typeof error === 'string') {
        console.log(chalk.red(error));
        return;
      }
      buildCommandImplement(cmd);
    });
};

export default buildCommand;
