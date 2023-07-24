import * as spawn from 'cross-spawn';
import { writeFileSync } from 'jsonfile';
import {
  unlinkSync,
  existsSync,
  readdirSync,
  renameSync,
  readFileSync
} from 'fs';

const spawnSync = spawn.sync;

const buildUsingWebpack = (option: any) => {
  spawnSync('npm', ['run', `build-${option.appName}`], { stdio: 'inherit' });
};

const buildVanillaJS = (option: object) => {
  // function body
};

const buildPlugin = (option: any) => {
  const manifestJSON: any = {};

  manifestJSON.manifest_version = 1;
  manifestJSON.version = 1;
  manifestJSON.type = 'APP';
  manifestJSON.icon = option.uploadConfig.icon;
  manifestJSON.name = {
    en: option.appName
  };
  if (option && option.uploadConfig && option.uploadConfig.name)
    manifestJSON.name = option.uploadConfig.name;

  manifestJSON.description = {
    en: 'Kintone Plugin'
  };
  if (option && option.uploadConfig && option.uploadConfig.description)
    manifestJSON.description = option.uploadConfig.description;

  if (option && option.uploadConfig && option.uploadConfig.version)
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
    const htmlContent = readFileSync(manifestJSON.config.html, 'utf-8');
    if (!htmlContent) delete manifestJSON.config;
  }

  writeFileSync(`manifest.json`, manifestJSON, { spaces: 4, EOL: '\r\n' });

  const paramArr = ['./', '--out', `${option.appName}/dist/plugin.zip`];
  if (existsSync(`${option.appName}/dist/private.ppk`)) {
    paramArr.push('--ppk');
    paramArr.push(`${option.appName}/dist/private.ppk`);
  }

  spawnSync('./node_modules/.bin/kintone-plugin-packer', paramArr, {
    stdio: 'inherit'
  });

  if (!existsSync(`${option.appName}/dist/private.ppk`)) {
    const keyFileName = readdirSync(`${option.appName}/dist`).filter(
      (name: string) => {
        return /.ppk$/.test(name);
      }
    );

    keyFileName &&
      keyFileName.length &&
      renameSync(
        `${option.appName}/dist/${keyFileName[0]}`,
        `${option.appName}/dist/private.ppk`
      );
  }

  unlinkSync(`manifest.json`);
};

const builder = {
  buildUsingWebpack: buildUsingWebpack,
  buildVanillaJS: buildVanillaJS,
  buildPlugin: buildPlugin
};

export default builder;
export { buildUsingWebpack, buildVanillaJS, buildPlugin };
