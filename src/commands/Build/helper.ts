import { writeFileSync } from 'jsonfile';
import {
  existsSync,
  readFileSync,
  readdirSync,
  renameSync,
  unlinkSync
} from 'fs';
import { buildPlugin, buildUsingWebpack, buildVanillaJS } from './builder';
import chalk from 'chalk';
import { appFileCheck } from './validator';

export const buildCommandImplement = (cmd: any) => {
  try {
    const config = getFileSync(cmd.appName);
    buildCommandHandle({
      config,
      isBuildWebpack: existsSync(`${config.appName}/webpack.config.js`),
      writeFileSyncFunc: (manifestJSON: any) =>
        writeFileSync(`manifest.json`, manifestJSON, {
          spaces: 4,
          EOL: '\r\n'
        }),
      readdirSyncUTF8Func
    });
  } catch (err) {
    console.log(err);
  }
};

export const buildCommandHandle = ({
  config,
  isBuildWebpack,
  writeFileSyncFunc,
  readdirSyncUTF8Func
}: buildCommandHandleProps) => {
  const isNotError = buildAppImplement({
    config,
    isBuildWebpack: isBuildWebpack,
    writeFileSyncFunc,
    readdirSyncUTF8Func
  });

  appFileCheckImplement({
    isNotError,
    appName: config.appName
  });
};

export const appFileCheckImplement = ({
  isNotError,
  appName
}: appFileCheckImplementProps) => {
  if (!isNotError) return false;

  console.log('');
  console.log(chalk.yellow('Build app complete.'));

  appFileCheck({ appName, isExistsSync: existsSync(`${appName}/auth.json`) });
  return true;
};

export const getFileSync = (appName: string) =>
  readFileSync(`${appName}/config.json`) as any;

export const buildAppImplement = ({
  config,
  isBuildWebpack,
  writeFileSyncFunc,
  readdirSyncUTF8Func
}: buildAppImplementProps) => {
  if (isBuildWebpack) {
    buildUsingWebpack(config);
  } else {
    if (config.type === 'Customization') {
      console.log(chalk.red('No webpack.config.js'));
      return false;
    }
    buildVanillaJS(config);
  }
  if (config.type === 'Plugin') {
    buildPlugin({
      option: config,
      writeFileSyncFunc,
      readdirSyncUTF8Func,
      keyFileName: readdirSync(`${config.appName}/dist`).filter(
        (name: string) => {
          return /.ppk$/.test(name);
        }
      ),
      renameSyncFunc: (file) =>
        renameSync(file, `${config.appName}/dist/private.ppk`),
      unlinkSyncFunc: unlinkSync(`manifest.json`)
    });
  }
  return true;
};

export const updateManifestJSON = ({
  manifestJSON,
  option
}: updateManifestJSONProps) => {
  if (option.uploadConfig && option.uploadConfig.name)
    manifestJSON.name = option.uploadConfig.name;

  manifestJSON.description = {
    en: 'Kintone Plugin'
  };
  if (option.uploadConfig && option.uploadConfig.description)
    manifestJSON.description = option.uploadConfig.description;

  if (option.uploadConfig && option.uploadConfig.version)
    manifestJSON.version = option.uploadConfig.version;

  manifestJSON.desktop = option.uploadConfig.desktop;
  manifestJSON.mobile = option.uploadConfig.mobile;
  manifestJSON.config = option.uploadConfig.config;

  if (
    manifestJSON.config.required_params &&
    manifestJSON.config.required_params.length === 0
  )
    delete manifestJSON.config.required_params;

  if (manifestJSON.config && manifestJSON.config.html) {
    manifestJSONConfig({
      manifestJSON,
      htmlContent: readdirSyncUTF8Func(manifestJSON.config.html)
    });
  }
};

export const manifestJSONConfig = ({
  manifestJSON,
  htmlContent
}: manifestJSONConfigProps) => {
  if (!htmlContent) delete manifestJSON.config;
};

export const readdirSyncUTF8Func = (dir: any) => readdirSync(dir, 'utf-8');
