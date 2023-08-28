import { describe, expect, test } from '@jest/globals';
import { program } from 'commander';
import {
  APP_NAME,
  DIR_BUILD_PATH,
  OPTIONS_BUILD
} from '../../../../unit_test/constant';
import {
  createTemplate,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import buildCommand from '../buildCommand';
import validator from '../validator';

const initTestProject = async () => {
  const projectName = getRandomProjectName();

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplate(DIR_BUILD_PATH, projectName);
  return buildCommand(program);
};

describe('Build command', () => {
  describe('App name', () => {
    test('Should be "test-app" when setting "test-app"', async () => {
      const mainProgram = await initTestProject();
      process.argv = OPTIONS_BUILD;
      await mainProgram.parseAsync(process.argv);

      expect(mainProgram.opts().appName).toBe('test-app');
    });

    test('Should be "App name missing" when setting ""', async () => {
      const params = { appName: '' };
      const isValidAppName = validator.buildValidator(params);

      expect(isValidAppName).toBe('App name missing');
    });

    test('Should display the message "App not existed" when setting app name does not exist', async () => {
      const params = { appName: 'not-existed-app' };
      const isValidAppName = validator.buildValidator(params);

      expect(isValidAppName).toEqual('App not existed');
    });
  });
});
