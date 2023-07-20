import * as spawn from 'cross-spawn';
import { existsSync } from 'fs';
import { updateManifestJSON } from './helper';

const spawnSync = spawn.sync;

const buildUsingWebpack = (option: any) => {
  spawnSync('npm', ['run', `build-${option.appName}`], { stdio: 'inherit' });
};

const buildVanillaJS = (option: object) => {
  // function body
};

const buildPlugin = ({
  option,
  writeFileSyncFunc,
  readdirSyncUTF8Func,
  keyFileName,
  renameSyncFunc,
  unlinkSyncFunc
}: buildPluginProps) => {
  const manifestJSON: any = {};

  manifestJSON.manifest_version = 1;
  manifestJSON.version = 1;
  manifestJSON.type = 'APP';
  manifestJSON.icon = option.uploadConfig.icon;
  manifestJSON.name = {
    en: option.appName
  };

  updateManifestJSON({
    manifestJSON,
    option,
    readdirSyncUTF8Func
  });

  writeFileSyncFunc(manifestJSON);

  const paramArr = ['./', '--out', `${option.appName}/dist/plugin.zip`];
  paramArrUpdate({
    paramArr,
    isUpdate: existsSync(`${option.appName}/dist/private.ppk`),
    appName: option.appName
  });

  spawnSync('./node_modules/.bin/kintone-plugin-packer', paramArr, {
    stdio: 'inherit'
  });

  renameSyncImplement({
    appName: option.appName,
    isRenameSync: !existsSync(`${option.appName}/dist/private.ppk`),
    keyFileName,
    renameSyncFunc
  });

  unlinkSyncFunc();
};

const paramArrUpdate = ({
  paramArr,
  isUpdate,
  appName
}: paramArrUpdateProps) => {
  if (isUpdate) {
    paramArr.push('--ppk');
    paramArr.push(`${appName}/dist/private.ppk`);
  }
};

const renameSyncImplement = ({
  appName,
  isRenameSync,
  keyFileName,
  renameSyncFunc
}: renameSyncImplementProps) => {
  if (isRenameSync) {
    renameSyncFunc(`${appName}/dist/${keyFileName[0]}`);
  }
};

const builder = {
  buildUsingWebpack: buildUsingWebpack,
  buildVanillaJS: buildVanillaJS,
  buildPlugin: buildPlugin
};

export default builder;
export {
  buildUsingWebpack,
  buildVanillaJS,
  buildPlugin,
  paramArrUpdate,
  renameSyncImplement
};
