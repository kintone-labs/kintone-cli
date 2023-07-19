import { deployCommandImplement, deployValidator } from './validator';

const deployCommand = (program: any) => {
  return program
    .command('deploy')
    .description('Deploy customization/plugin for production')
    .option('--app-name <appName>', 'App name')
    .action(async (cmd) => {
      const error = deployValidator(cmd);

      deployCommandImplement({
        error: error && typeof error === 'string',
        appName: cmd.appName
      });
    });
};

export default deployCommand;
