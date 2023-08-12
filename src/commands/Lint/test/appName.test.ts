import { describe, expect, test } from '@jest/globals';
import { program } from 'commander';
import { APP_NAME, DIR_BUILD_PATH } from '../../../../unit_test/constant';
import {
  createTemplateNotQuick,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import lintCommand from '../lintCommand';
import { rmSync } from 'fs';
import validator from '../validator';
import { readFileSync } from 'jsonfile';

const initTestProject = async () => {
  const projectName = getRandomProjectName();
  const currentDir = `${DIR_BUILD_PATH}/${projectName}`;

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplateNotQuick(projectName);

  return {
    mainProgram: lintCommand(program),
    currentDir
  };
};

describe('Lint command', () => {
  describe('App name', () => {
    test('Should be "test-app" when setting "test-app"', async () => {
      const initTest = await initTestProject();

      process.argv = ['node', 'lint', '--fix', '--app-name', APP_NAME];
      await initTest.mainProgram.parseAsync(process.argv);

      const templateFile = readFileSync(`${initTest.currentDir}/package.json`);
      const isLint = `lint-${APP_NAME}-fix` in templateFile.scripts;

      expect(isLint).toEqual(true);
    });

    test('Should be "test-app" when setting "test-app" without --fix', async () => {
      const initTest = await initTestProject();
      process.argv = ['node', 'lint', '--app-name', 'test-app'];

      await initTest.mainProgram.parseAsync(process.argv);

      expect(initTest.mainProgram.opts().appName).toEqual('test-app');
    });

    test('Should be "App name missing" when setting app name is empty', async () => {
      const initTest = await initTestProject();
      process.argv = ['node', 'lint', '--app-name', ''];
      const params = {};

      await initTest.mainProgram.parseAsync(process.argv);
      const isValidAppName = validator.lintValidator(params);

      expect(isValidAppName).toEqual('App name missing');
    });

    test('Should be "App not existed" when setting app name that not exist app', async () => {
      const initTest = await initTestProject();
      process.argv = ['node', 'lint', '--fix', '--app-name', 'test-app'];
      rmSync(initTest.currentDir, { recursive: true, force: true });
      const params = {
        appName: APP_NAME
      };

      await initTest.mainProgram.parseAsync(process.argv);

      process.argv = ['node', 'lint', '--app-name', 'test-app'];
      const isValidAppName = validator.lintValidator(params);

      expect(isValidAppName).toEqual('App not existed');
    });
  });
});
