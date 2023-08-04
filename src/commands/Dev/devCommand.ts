import { Command } from 'commander';
import chalk from 'chalk';
import spawn from 'cross-spawn';
import { existsSync } from 'fs';
import validator from './validator';
import { devCommandHandle } from './helper';
const readline = require('readline');

const spawnSync = spawn.sync;

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

const devCommand = (program: Command) => {
  return program
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
        await devCommandHandle({ ws, cmd, data, readLineAsync });
      });
    });
};

export default devCommand;
