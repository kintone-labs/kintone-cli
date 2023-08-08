import { describe, expect, test } from '@jest/globals';
import { program } from 'commander';
import { readFileSync, writeFileSync } from 'jsonfile';
import {
  APP_NAME,
  DIR_BUILD_PATH,
  OPTIONS_BUILD,
  PRIVATE_KEY,
  PROJECT_TYPE
} from '../../../../unit_test/constant';
import {
  createTemplateWithType,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import { DECLARE_KINTONE, WRITE_FILE_OPTIONS } from '../../../constant';
import buildCommand from '../buildCommand';

const initTestProject = async (version: string) => {
  const projectName = getRandomProjectName();
  const currentDir = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplateWithType(projectName, PROJECT_TYPE.PLUGIN);

  const mainProgram = buildCommand(program);
  process.argv = OPTIONS_BUILD;
  const config = readFileSync(`${currentDir}/config.json`);
  Object.assign(config.uploadConfig, { version });

  writeFileSync(`${currentDir}/auth.json`, DECLARE_KINTONE);
  writeFileSync(`${currentDir}/dist/private.ppk`, PRIVATE_KEY);
  writeFileSync(`${currentDir}/config.json`, config, WRITE_FILE_OPTIONS);

  await mainProgram.parseAsync(process.argv);
  return currentDir;
};

describe('build command', () => {
  describe('Plugin version', () => {
    test('Should be "1.0.0" when setting "1.0.0"', async () => {
      const appDir = await initTestProject('1.0.0');
      const config = readFileSync(`${appDir}/config.json`);
      const result = { version: config.uploadConfig.version };

      expect(result).toEqual({ version: '1.0.0' });
    });

    test('Should be "" when setting ""', async () => {
      const appDir = await initTestProject('');
      const config = readFileSync(`${appDir}/config.json`);
      const result = { version: config.uploadConfig.version };

      expect(result).toEqual({ version: '' });
    });
  });
});
