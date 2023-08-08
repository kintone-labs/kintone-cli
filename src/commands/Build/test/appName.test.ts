import { describe, expect, test } from '@jest/globals';
import { program } from 'commander';
import { DIR_BUILD_PATH, OPTIONS_BUILD } from '../../../../unit_test/constant';
import {
  createTemplate,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import buildCommand from '../buildCommand';

const initTestProject = async () => {
  const projectName = getRandomProjectName();

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplate(DIR_BUILD_PATH, projectName);
  return buildCommand(program);
};

describe('build command', () => {
  describe('App name', () => {
    test('Should be "test-app" when setting "test-app"', async () => {
      const mainProgram = await initTestProject();
      process.argv = OPTIONS_BUILD;
      await mainProgram.parseAsync(process.argv);

      expect(mainProgram.opts().appName).toBe('test-app');
    });

    test('Should be "" when setting ""', async () => {
      const OPTIONS_MISS_NAME = ['node', 'build', '--app-name', ''];
      const mainProgram = await initTestProject();
      process.argv = OPTIONS_MISS_NAME;
      await mainProgram.parseAsync(process.argv);

      expect(mainProgram.opts().appName).toBe('');
    });
  });
});
