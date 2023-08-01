import { beforeAll, describe, expect, test } from '@jest/globals';
import { Command, program } from 'commander';
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

describe('build command', () => {
  describe('Plugin version: valid', () => {
    let mainProgram: Command;
    const projectName = getRandomProjectName();
    const CURRENT_DIR = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;

    beforeAll(async () => {
      createBuildDir(DIR_BUILD_PATH);

      await initProject(DIR_BUILD_PATH, projectName);
      await createTemplateWithType(projectName, PROJECT_TYPE.PLUGIN);

      mainProgram = buildCommand(program);
      process.argv = OPTIONS_BUILD;

      writeFileSync(`${CURRENT_DIR}/auth.json`, DECLARE_KINTONE);
      const config = readFileSync(`${CURRENT_DIR}/config.json`);
      Object.assign(config.uploadConfig, {
        version: '1.0.0'
      });
      writeFileSync(`${CURRENT_DIR}/config.json`, config, WRITE_FILE_OPTIONS);

      await mainProgram.parseAsync(process.argv);
    });

    test('Should be "1.0.0" when setting "1.0.0"', () => {
      const config = readFileSync(`${CURRENT_DIR}/config.json`);
      const result = {
        version: config.uploadConfig.version
      };
      expect(result).toEqual({
        version: '1.0.0'
      });
    });
  });

  describe('Plugin version: empty', () => {
    let mainProgram: Command;
    const projectName = getRandomProjectName();
    const CURRENT_DIR = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;

    beforeAll(async () => {
      createBuildDir(DIR_BUILD_PATH);

      await initProject(DIR_BUILD_PATH, projectName);
      await createTemplateWithType(projectName, PROJECT_TYPE.PLUGIN);

      mainProgram = buildCommand(program);
      process.argv = OPTIONS_BUILD;

      writeFileSync(`${CURRENT_DIR}/auth.json`, DECLARE_KINTONE);
      const config = readFileSync(`${CURRENT_DIR}/config.json`);
      Object.assign(config.uploadConfig, {
        version: ''
      });
      writeFileSync(`${CURRENT_DIR}/config.json`, config, WRITE_FILE_OPTIONS);

      await mainProgram.parseAsync(process.argv);
    });

    test('Should be "" when setting ""', () => {
      const config = readFileSync(`${CURRENT_DIR}/config.json`);
      const result = {
        version: config.uploadConfig.version
      };
      expect(result).toEqual({
        version: ''
      });
    });
  });
});
