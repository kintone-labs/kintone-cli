import { beforeAll, describe, expect, test } from '@jest/globals';
import { Command, program } from 'commander';
import { DIR_BUILD_PATH, OPTIONS_BUILD } from '../../../../unit_test/constant';
import {
  createBuildDir,
  createTemplate,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import buildCommand from '../buildCommand';

describe('build command', () => {
  describe('appName: valid', () => {
    let mainProgram: Command;
    const projectName = getRandomProjectName();
    beforeAll(async () => {
      createBuildDir(DIR_BUILD_PATH);

      await initProject(DIR_BUILD_PATH, projectName);
      await createTemplate(DIR_BUILD_PATH, projectName);

      mainProgram = buildCommand(program);
      process.argv = OPTIONS_BUILD;

      await mainProgram.parseAsync(process.argv);
    });

    test('Should be "test-app" when setting "test-app"', () => {
      expect(mainProgram.opts().appName).toBe('test-app');
    });
  });

  describe('appName: empty', () => {
    let mainProgram: Command;
    const OPTIONS_MISS_NAME = ['node', 'build', '--app-name', ''];
    const projectName = getRandomProjectName();

    beforeAll(async () => {
      createBuildDir(DIR_BUILD_PATH);

      await initProject(DIR_BUILD_PATH, projectName);
      await createTemplate(DIR_BUILD_PATH, projectName);

      mainProgram = buildCommand(program);
      process.argv = OPTIONS_MISS_NAME;

      await mainProgram.parseAsync(process.argv);
    });

    test('Should be "" when setting ""', () => {
      expect(mainProgram.opts().appName).toBe('');
    });
  });
});
