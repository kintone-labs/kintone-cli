import { Command } from 'commander';
import chalk from 'chalk';
import spawn from 'cross-spawn';
import validator from './validator';

const spawnSync = spawn.sync;

const lintCommand = (program: Command) => {
  program
    .command('lint')
    .description('Check/fix code using @cybozu/eslint-config')
    .option('--fix', 'Auto fix eslint errors')
    .option('--app-name <appName>', 'Name of template folder to run eslint')
    .action(async (cmd) => {
      const error = validator.lintValidator(cmd);
      if (error && typeof error === 'string') {
        console.log(chalk.red(error));
        return;
      }
      process.on('SIGINT', () => {
        process.exit();
      });
      console.log(chalk.yellow('Checking syntax...'));
      if (cmd.appName) {
        spawnSync(
          'npm',
          ['run', `lint-${cmd.appName}${cmd.fix ? '-fix' : ''}`],
          { stdio: 'inherit' }
        );
      } else {
        spawnSync('npm', ['run', `lint-all${cmd.fix ? '-fix' : ''}`], {
          stdio: 'inherit'
        });
      }
    });
};

export default lintCommand;
