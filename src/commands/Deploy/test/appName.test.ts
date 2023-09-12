import { describe, expect, test } from '@jest/globals';
import { program } from 'commander';
import { DIR_BUILD_PATH } from '../../../../unit_test/constant';
import {
  authCommandImplement,
  createTemplate,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import deployCommand from '../deployCommand';
import validator from '../validator';

const initTestProject = async () => {
  const projectName = getRandomProjectName();

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplate(DIR_BUILD_PATH, projectName);
  await authCommandImplement(program, process);
};

describe('Deploy command', () => {
  describe('App name', () => {
    test('Should be "test-app" when setting the value "test-app"', async () => {
      await initTestProject();
      const mainProgram = deployCommand(program);
      process.argv = ['node', 'deploy', '--app-name', 'test-app'];
      await mainProgram.parseAsync(process.argv);

      expect(mainProgram.opts().appName).toEqual('test-app');
    });

    test('Should be "" when setting the value ""', async () => {
      await initTestProject();
      const mainProgram = deployCommand(program);
      process.argv = ['node', 'deploy', '--app-name', ''];
      await mainProgram.parseAsync(process.argv);

      expect(mainProgram.opts().appName).toEqual('');
    });

    test('Should be "App name missing" when setting ""', async () => {
      const params = { appName: '' };
      const isValidAppName = validator.deployValidator(params);

      expect(isValidAppName).toBe('App name missing');
    });

    test('Should display the message "App not existed" when setting app name does not exist', async () => {
      const params = { appName: 'not-existed-app' };
      const isValidAppName = validator.deployValidator(params);

      expect(isValidAppName).toEqual('App not existed');
    });
  });
});
