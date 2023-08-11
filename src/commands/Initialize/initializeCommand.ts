import { Command } from 'commander';
import chalk from 'chalk';
import spawn from 'cross-spawn';
import { prompt } from 'inquirer';
import validator from './validator';
import { writeFileSync } from 'jsonfile';
import { mkdirSync, existsSync, writeFileSync as writeFileSyncFS } from 'fs';

import { generateAppFolder } from './generator';

import {
  ERRORS,
  DEFAULT_PROJECT_VERSION,
  DEPENDENCIES,
  MESSAGES
} from '../../constant';
import { isDomain } from '../../utils/string';
import { AppType, CustomizationScope } from '../../dto/app';

const getPromptsCreateTemplate = (cmd: any) => {
  const appTypes: AppType[] = ['Customization', 'Plugin'];
  const customizationScope: CustomizationScope[] = ['ALL', 'ADMIN', 'NONE'];
  console.log(cmd, 'cmdcmdcmdcmd')
  
  return [
    {
      type: 'list',
      name: 'type',
      message: MESSAGES.TYPE_OF_APP_PROMPT,
      choices: appTypes,
      when: cmd.type === undefined
    },
    {
      type: 'confirm',
      name: 'setAuth',
      message: MESSAGES.AUTHENTICATION_CREDENTIALS_PROMPT,
      when: cmd.setAuth === undefined
    },
    {
      type: 'input',
      name: 'domain',
      message: MESSAGES.KINTONE_DOMAIN_PROMPT,
      when: (curAnswers: any) => {
        return (cmd.setAuth || curAnswers.setAuth) && !cmd.domain;
      },
      validate: (input: any, curAnswer: object): any => {
        if (!input.startsWith('https://'))
          return ERRORS.DOMAIN_STARTS_WITH_HTTPS;
        if (!isDomain(input)) {
          return ERRORS.VALID_DOMAIN;
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'username',
      message: MESSAGES.KINTONE_USERNAME_PROMPT,
      when: (curAnswers: any) => {
        return (cmd.setAuth || curAnswers.setAuth) && !cmd.username;
      }
    },
    {
      type: 'password',
      name: 'password',
      message: MESSAGES.KINTONE_PASSWORD_PROMPT,
      when: (curAnswers: any) => {
        return (cmd.setAuth || curAnswers.setAuth) && !cmd.password;
      }
    },
    {
      type: 'confirm',
      name: 'useProxy',
      message: MESSAGES.USE_PROXY_PROMPT,
      default: false,
      when: (curAnswers: any) => {
        return (cmd.setAuth || curAnswers.setAuth) && !cmd.proxy;
      }
    },
    {
      type: 'input',
      name: 'proxy',
      message: MESSAGES.PROXY_URL_PROMPT,
      when: (curAnswers: any) => {
        return curAnswers.useProxy && !cmd.proxy;
      }
    },
    {
      type: 'confirm',
      name: 'useReact',
      message: MESSAGES.USE_REACT_PROMPT,
      when: cmd.useReact === undefined
    },
    {
      type: 'confirm',
      name: 'useTypescript',
      message: MESSAGES.USE_TYPESCRIPT_PROMPT,
      when: cmd.useTypescript === undefined
    },
    {
      type: 'confirm',
      name: 'useWebpack',
      message: MESSAGES.USE_WEBPACK_PROMPT,
      when: cmd.useWebpack === undefined
    },
    {
      type: 'input',
      name: 'entry',
      message: MESSAGES.WEBPACK_ENTRY_PROMPT,
      default: (curAnswers: any) => {
        let ext = '.js';
        const tempOption = { ...cmd, ...curAnswers };
        if (tempOption.useReact && tempOption.useTypescript) {
          ext = '.tsx';
        } else if (tempOption.useReact) {
          ext = '.jsx';
        } else if (tempOption.useTypescript) {
          ext = '.ts';
        }
        return `index${ext}`;
      },
      when: (curAnswers: any) => {
        return (cmd.useWebpack || curAnswers.useWebpack) && !cmd.entry;
      }
    },
    {
      type: 'confirm',
      name: 'useCybozuLint',
      message: MESSAGES.USE_ESLINT_CONFIG_PROMPT,
      when: cmd.useCybozuLint === undefined
    },
    {
      type: 'input',
      name: 'appName',
      message: MESSAGES.APP_NAME_PROMPT,
      when: cmd.appName === undefined,
      validate: (input) => {
        if (!input) {
          return ERRORS.MISSING_APP_NAME;
        }
        return true;
      }
    },
    {
      type: 'number',
      name: 'appID',
      message: MESSAGES.APP_ID_PROMPT,
      when: (curAnswers: any) => {
        return (
          (cmd.setAuth || curAnswers.setAuth) &&
          !cmd.appID &&
          (cmd.type === 'Customization' || curAnswers.type === 'Customization')
        );
      }
    },
    {
      type: 'list',
      name: 'scope',
      message: MESSAGES.CUSTOMIZATION_SCOPE_PROMPT,
      choices: customizationScope,
      when: (curAnswers: any) => {
        return (
          (cmd.type === 'Customization' ||
            curAnswers.type === 'Customization') &&
          !cmd.scope
        );
      }
    }
  ];
};

const getPromptsInit = (packageInfo) => {
  return [
    {
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: 'kintone-customization-project',
      when: !packageInfo.name
    },
    {
      type: 'input',
      name: 'version',
      message: 'Version',
      default: DEFAULT_PROJECT_VERSION,
      when: !packageInfo.version
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description',
      default: 'kintone customization project',
      when: !packageInfo.description
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author',
      default: '',
      when: packageInfo.author === undefined
    },
    {
      type: 'input',
      name: 'license',
      message: 'License',
      default: 'MIT',
      when: !packageInfo.license
    },
    {
      type: 'confirm',
      name: 'dependencies.@kintone/kintone-ui-component',
      message: MESSAGES.USE_KINTONE_UI_COMPONENT_PROMPT,
      default: true,
      when:
        packageInfo.dependencies &&
        packageInfo.dependencies['@kintone/kintone-ui-component'] === undefined
    },
    {
      type: 'confirm',
      name: 'dependencies.@kintone/rest-api-client',
      message: MESSAGES.USE_REST_API_CLIENT_PROMPT,
      default: true,
      when:
        packageInfo.dependencies &&
        packageInfo.dependencies['@kintone/rest-api-client'] === undefined
    }
  ];
};

export const getAppSetting = (cmd, answer) => {
  const appSetting = {
    setAuth: cmd.setAuth || answer.setAuth,
    useTypescript: cmd.useTypescript || answer.useTypescript,
    useWebpack: cmd.useWebpack || answer.useWebpack,
    entry: cmd.entry || answer.entry,
    useReact: cmd.useReact || answer.useReact,
    appName: (cmd.appName || answer.appName).replace(' ', '-'),
    domain: cmd.domain || answer.domain,
    username: cmd.username || answer.username,
    password: cmd.password || answer.password,
    type: cmd.type || answer.type,
    appID: cmd.appID || answer.appID,
    useCybozuLint: cmd.useCybozuLint || answer.useCybozuLint,
    scope: cmd.scope || answer.scope,
    proxy: cmd.proxy || answer.proxy
  };

  if (answer.proxy === 'null') appSetting.proxy = '';

  return appSetting;
};

const createProjectFolder = (packageInfo) => {
  const projectFolder = global.currentDir + '/' + packageInfo.name;
  if (existsSync(projectFolder)) {
    console.error(chalk.red(ERRORS.PROJECT_FOLDER_EXISTS));
    process.exit(-1);
  }
  mkdirSync(projectFolder);
  return projectFolder;
};

async function processProjectInfo(packageInfo) {
  const prompts = getPromptsInit(packageInfo);
  const answers = await prompt(prompts);
  const updatedPackageInfo = { ...packageInfo, ...answers };

  if (updatedPackageInfo.dependencies['@kintone/kintone-ui-component']) {
    updatedPackageInfo.dependencies['@kintone/kintone-ui-component'] =
      DEPENDENCIES['@kintone/kintone-ui-component'];
  } else {
    delete updatedPackageInfo.dependencies['@kintone/kintone-ui-component'];
  }

  if (updatedPackageInfo.dependencies['@kintone/rest-api-client']) {
    updatedPackageInfo.dependencies['@kintone/rest-api-client'] =
      DEPENDENCIES['@kintone/rest-api-client'];
  } else {
    delete updatedPackageInfo.dependencies['@kintone/rest-api-client'];
  }

  return updatedPackageInfo;
}

const spawnSync = spawn.sync;

const initializeCommand = (program: Command) => {
  program
    .command('create-template')
    .description('Create customization/plugin template')
    .option('-q, --quick', 'Use default template')
    .option('--preset <preset>', 'Preset for generating template')
    .option('-t, --type <type>', 'Set app type')
    .option('--scope <scope>', 'Set scope of customization')
    .option('-a, --set-auth', 'Set authentication credentials')
    .option('-d, --domain <domain>', 'Set kintone domain')
    .option('-u, --username <username>', 'Set username')
    .option('-p, --password <password>', 'Set password')
    .option('-n, --app-name <appName>', 'Set app name')
    .option('-s, --use-typescript', 'Use typescript or not')
    .option('-r, --use-react', 'Use React or not')
    .option('-w, --use-webpack', 'Use webpack or not')
    .option('--entry <entry>', 'Webpack entry')
    .option('-i, --app-id <appID>', 'Set app ID for customization')
    .option('-l, --use-cybozu-lint', 'Use cybozu eslint rules')
    .option('--proxy <proxyURL>', 'Proxy URL')
    .action(async (cmd) => {
      cmd.appID = cmd.appId;
      const error = validator.appValidator(cmd);
      if (error && typeof error === 'string') {
        console.log(chalk.red(error));
        return;
      }
      try {
        let answer: any = {};
        if (cmd.quick) {
          cmd.setAuth = false;
          cmd.useProxy = false;
          cmd.useTypescript = false;
          cmd.useWebpack = false;
          cmd.useCybozuLint = false;
          cmd.useReact = false;
          cmd.type = cmd.type || 'Customization';
          cmd.appName = cmd.appName || `kintone-${Date.now()}`;
          cmd.scope = cmd.scope || 'ALL';
        }
        if (cmd.preset) {
          switch (cmd.preset) {
            case 'React':
              applyReactPreset(cmd);
              break;
            case 'ReactTS':
              applyReactTSPreset(cmd);
              break;
            default:
              break;
          }
        }
        const prompts = getPromptsCreateTemplate(cmd);
        answer = await prompt(prompts);

        // Config for appConfig.json
        const appSetting = getAppSetting(cmd, answer);

        console.log(chalk.yellow(MESSAGES.CREATE_APP_MESSAGE));
        const err = generateAppFolder(appSetting);
        if (err && typeof err === 'string') {
          console.log(chalk.red(err));
          return;
        }
        console.log(chalk.yellow(MESSAGES.INSTALLING_DEPENDENCIES_MESSAGE));
        spawnSync('npm', ['install'], { stdio: 'inherit', windowsHide: true });
        console.log('');
        printAppDevelopmentInstructions(appSetting);
      } catch (err) {
        console.log(chalk.red(err));
      }
    });

  program
    .command('init')
    .description('Initialize kintone project')
    .option('--install', 'Install dependencies or not')
    .option('--quick', 'Quickly create a kintone project')
    .option('-p, --project-name <projectName>', 'Project name')
    .action(async (cmd) => {
      let packageInfo: any = {};
      if (cmd.quick) {
        packageInfo.name = 'kintone-customization-project';
        packageInfo.version = DEFAULT_PROJECT_VERSION;
        packageInfo.description = 'kintone customization project';
        packageInfo.author = '';
        packageInfo.license = 'MIT';
        packageInfo.dependencies = {};
        packageInfo.dependencies['@kintone/kintone-ui-component'] = true;
        packageInfo.dependencies['@kintone/rest-api-client'] = true;
      } else {
        console.log(chalk.yellow(MESSAGES.WELCOME_MESSAGE));
        console.log(chalk.yellow(MESSAGES.GET_STARTED_MESSAGE));
      }

      if (cmd.projectName) {
        packageInfo.name = cmd.projectName;
      }

      // ask info about project
      packageInfo = await processProjectInfo(packageInfo);
      const projectFolder = createProjectFolder(packageInfo);

      // write project info object to package.json
      if (!packageInfo.devDependencies) {
        packageInfo.devDependencies = {};
      }
      packageInfo.devDependencies['local-web-server'] = '^2.6.1';
      if (!packageInfo.scripts) {
        packageInfo.scripts = {};
      }
      packageInfo.scripts.dev = 'ws';
      const packageJsonPath = projectFolder + '/package.json';
      writeFileSync(packageJsonPath, packageInfo, { spaces: 2, EOL: '\r\n' });

      process.chdir(projectFolder);
      spawnSync('git', ['init'], { stdio: 'inherit' });
      writeFileSyncFS(`${projectFolder}/.gitignore`, 'node_modules');

      // if install is specified run npm install
      if (cmd.install) {
        console.log(chalk.yellow(MESSAGES.INSTALLING_DEPENDENCIES_MESSAGE));
        spawnSync('npm', ['i'], { stdio: 'inherit', windowsHide: true });
      }
      printProjectCreationMessage(packageInfo);
    });
};

export const printAppDevelopmentInstructions = (appSetting) => {
  if (!appSetting.setAuth) {
    console.log(chalk.yellow(MESSAGES.SET_AUTH_INFO_MESSAGE));
    console.log('');
    console.log(
      chalk.greenBright(
        `     kintone-cli auth --app-name ${appSetting.appName}`
      )
    );
    console.log('');
  } else {
    console.log(chalk.yellow(MESSAGES.START_DEVELOPING_APP_MESSAGE));
    console.log('');
    console.log(
      chalk.greenBright(
        `     kintone-cli dev --app-name ${appSetting.appName} --watch`
      )
    );
    console.log('');
  }
};

const printProjectCreationMessage = (packageInfo) => {
  console.log('');
  console.log(chalk.yellow(MESSAGES.PROJECT_CREATED_MESSAGE));
  console.log(chalk.yellow(MESSAGES.CREATE_NEW_APP_MESSAGE));
  console.log('');
  console.log(chalk.green(`   cd ${packageInfo.name}`));
  console.log('');
  console.log(chalk.green('   kintone-cli create-template'));
  console.log('');
};

const applyReactPreset = (cmd) => {
  cmd.useTypescript = false;
  cmd.useWebpack = true;
  cmd.useReact = true;
  cmd.entry = 'index.jsx';
};

const applyReactTSPreset = (cmd) => {
  cmd.useTypescript = true;
  cmd.useWebpack = true;
  cmd.useReact = true;
  cmd.entry = 'index.tsx';
};

export default initializeCommand;
