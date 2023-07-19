import { deployValidator, readAndDeployFile } from './validator';

const deployCommand = (program: any) => {
  return program
    .command('deploy')
    .description('Deploy customization/plugin for production')
    .option('--app-name <appName>', 'App name')
    .action(async (cmd) => {
      const error = deployValidator(cmd);
      if (error && typeof error === 'string') {
        return;
      }
      readAndDeployFile(cmd.appName);
    });
};

export default deployCommand;
