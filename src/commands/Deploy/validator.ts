import * as spawn from 'cross-spawn';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { ERRORS } from '../../constant';
import { deployCustomization, deployPlugin } from './deployer';

const spawnSync = spawn.sync;

export const deployValidatorResult = (
  appName: string,
  isExistsFileSync: any
): boolean | string => {
  if (!appName) {
    return ERRORS.APP_NAME_MISSING;
  }
  if (!isExistsFileSync) {
    return ERRORS.APP_EXISTED;
  }
  return false;
};

export const deployValidator = (params: any): boolean | string =>
  deployValidatorResult(params.appName, existsSync(params.appName));

export const readAndDeployFile = (params: readAndDeployFileResultProps) => {
  try {
    const config = params.config;
    if (params.isExistsSync) {
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
};

export const addParamArrItem = ({
  authJSON,
  paramArr
}: addParamArrItemProps) => {
  if (authJSON.domain) {
    paramArr.push('--base-url');
    paramArr.push(authJSON.domain);
  }
  if (authJSON.username) {
    paramArr.push('--username');
    paramArr.push(authJSON.username);
    paramArr.push('--basic-auth-username');
    paramArr.push(authJSON.username);
  }
  if (authJSON.password) {
    paramArr.push('--password');
    paramArr.push(authJSON.password);
    paramArr.push('--basic-auth-password');
    paramArr.push(authJSON.password);
  }
  if (authJSON.proxy) {
    paramArr.push('--proxy');
    paramArr.push(authJSON.proxy);
  }
};

export const mkdirSyncCheck = ({
  isMkdir,
  mkdirSyncCallback
}: mkdirSyncCheckProps) => !isMkdir && mkdirSyncCallback();

export const buildCommandImplement = ({
  appName,
  isExistsFile
}: buildCommandImplementProps) => {
  isExistsFile &&
    spawnSync(
      'npm',
      ['run', `build-${appName}`, '--', '--mode', 'production'],
      { stdio: ['ignore', 'ignore', process.stderr] }
    );
};

export const deployCommandImplement = ({
  error,
  appName
}: deployCommandImplementProps) =>
  !error && readAndDeployFileImplement(appName);

export const readAndDeployFileImplement = (appName: string) =>
  readAndDeployFile({
    isExistsSync: existsSync(`${appName}/webpack.config.js`),
    config: readFileSync(`${appName}/config.json`)
  });
