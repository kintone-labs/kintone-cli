import chalk from 'chalk';
import { existsSync } from 'fs';

export const buildValidator = (params: any): boolean | string => {
  if (!params.appName) {
    return 'App name missing';
  }
  if (!existsSync(params.appName)) {
    return 'App not existed';
  }
  return false;
};

export const appFileCheck = ({ appName, isExistsSync }: appFileCheckProps) => {
  if (!isExistsSync) {
    console.log(chalk.yellow('To set auth info, use:'));
    console.log('');
    console.log(
      chalk.greenBright(`     kintone-cli auth --app-name ${appName}`)
    );
    console.log('');
    return false;
  }
  console.log(chalk.yellow('To deploy app, use:'));
  console.log('');
  console.log(
    chalk.greenBright(`     kintone-cli deploy --app-name ${appName}`)
  );
  console.log('');
  return true;
};
