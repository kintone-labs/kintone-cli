import { describe, expect, test } from '@jest/globals';
import { program } from 'commander';
import { readFileSync, writeFileSync } from 'jsonfile';
import {
  APP_NAME,
  DIR_BUILD_PATH,
  OPTIONS_BUILD,
  PROJECT_TYPE
} from '../../../../unit_test/constant';
import {
  createBuildDir,
  createTemplateWithType,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import { DECLARE_KINTONE, WRITE_FILE_OPTIONS } from '../../../constant';
import buildCommand from '../buildCommand';

const initTestProject = async (description: string) => {
  const projectName = getRandomProjectName();
  const CURRENT_DIR = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;

  createBuildDir(DIR_BUILD_PATH);

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplateWithType(projectName, PROJECT_TYPE.PLUGIN);

  const mainProgram = buildCommand(program);
  process.argv = OPTIONS_BUILD;

  writeFileSync(`${CURRENT_DIR}/auth.json`, DECLARE_KINTONE);
  const config = readFileSync(`${CURRENT_DIR}/config.json`);
  Object.assign(config.uploadConfig, {
    description
  });
  writeFileSync(`${CURRENT_DIR}/config.json`, config, WRITE_FILE_OPTIONS);

  await mainProgram.parseAsync(process.argv);
  return {
    APP_DIR: `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`,
    CURRENT_DIR
  };
};

describe('build command', () => {
  describe('Plugin description', () => {
    test('Should be "metadata about this project" when setting "metadata about this project"', async () => {
      const appDir = await initTestProject('metadata about this project');
      const config = readFileSync(`${appDir.CURRENT_DIR}/config.json`);
      const result = {
        description: config.uploadConfig.description
      };
      expect(result).toEqual({
        description: 'metadata about this project'
      });
    });

    test('Should be "" when setting ""', async () => {
      const appDir = await initTestProject('');

      const config = readFileSync(`${appDir.CURRENT_DIR}/config.json`);
      const result = {
        description: config.uploadConfig.description
      };
      expect(result).toEqual({
        description: ''
      });
    });
  });
});
