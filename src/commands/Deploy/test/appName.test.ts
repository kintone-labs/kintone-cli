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

const initTestProject = async () => {
  const projectName = getRandomProjectName();

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplate(DIR_BUILD_PATH, projectName);
  await authCommandImplement(program, process);
};

describe('Deploy command', () => {
  describe('App name', () => {
    test('Should be "test-app" when setting the value "test-app" to "--app-name" option', async () => {
      await initTestProject();
      const mainProgram = deployCommand(program);
      process.argv = ['node', 'deploy', '--app-name', 'test-app'];
      await mainProgram.parseAsync(process.argv);

      expect(mainProgram.opts().appName).toEqual('test-app');
    });

    test('Should be "" when setting the value "" to "--app-name" option', async () => {
      await initTestProject();
      const mainProgram = deployCommand(program);
      process.argv = ['node', 'deploy', '--app-name', ''];
      await mainProgram.parseAsync(process.argv);

      expect(mainProgram.opts().appName).toEqual('');
    });
  });
});
