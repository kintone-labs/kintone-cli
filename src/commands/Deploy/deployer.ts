import * as spawn from 'cross-spawn';
import { writeFileSync, readFileSync } from 'jsonfile';
import { unlinkSync, existsSync, mkdirSync } from 'fs';
import {
  addParamArrItem,
  buildCommandImplement,
  mkdirSyncCheck
} from './validator';

const spawnSync = spawn.sync;

const deployCustomization = (option: any) => {
  const customizeManifestJSON = {
    app: option.appID,
    scope: option.scope,
    desktop: option.uploadConfig.desktop,
    mobile: option.uploadConfig.mobile
  };
  const paramArr = [`${option.appName}/dist/customize-manifest.json`];

  const authJSON = readFileSync(`${option.appName}/auth.json`);

  addParamArrItem({
    authJSON,
    paramArr
  });

  mkdirSyncCheck({
    isMkdir: existsSync(`${option.appName}/dist`),
    mkdirSyncCallback: () => mkdirSync(`${option.appName}/dist`)
  });

  buildCommandImplement({
    appName: option.appName,
    isExistsFile: existsSync(`${option.appName}/webpack.config.js`)
  });

  writeFileSync(
    `${option.appName}/dist/customize-manifest.json`,
    customizeManifestJSON,
    { spaces: 2, EOL: '\r\n' }
  );
  spawnSync('./node_modules/.bin/kintone-customize-uploader', paramArr, {
    stdio: 'inherit'
  });
  unlinkSync(`${option.appName}/dist/customize-manifest.json`);
};

const deployPlugin = (option: any) => {
  const authJSON = readFileSync(`${option.appName}/auth.json`);
  spawnSync(
    './node_modules/.bin/kintone-plugin-uploader',
    [
      '--base-url',
      authJSON.domain,
      '--username',
      authJSON.username,
      '--password',
      authJSON.password,
      `${option.appName}/dist/plugin.zip`
    ],
    {
      stdio: 'inherit'
    }
  );
};

export { deployCustomization, deployPlugin };
