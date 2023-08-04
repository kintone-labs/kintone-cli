import { describe, expect, test } from '@jest/globals';
import { program } from 'commander';
import { writeFileSync } from 'jsonfile';
import {
  APP_NAME,
  DIR_BUILD_PATH,
  WEBPACK_CONTENT
} from '../../../../unit_test/constant';
import {
  authCommandImplement,
  createTemplate,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import devCommand from '../devCommand';

const initTestProject = async () => {
  const projectName = getRandomProjectName();
  const currentDir = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;
  const webpackDir = `${currentDir}/webpack.config.js`;

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplate(DIR_BUILD_PATH, projectName);

  return { currentDir, webpackDir };
};

describe('dev command', () => {
  describe('appName', () => {
    test('Should be "test-app" when assign to "test-app"', async () => {
      const options = ['node', 'dev', '--app-name', APP_NAME];
      const initTest = await initTestProject();

      authCommandImplement(program, process);
      process.argv = options;
      const mainProgram = devCommand(program);

      writeFileSync(initTest.webpackDir, WEBPACK_CONTENT);
      await mainProgram.parseAsync(process.argv);

      expect(mainProgram.opts().appName).toBe('test-app');
    });

    test('Should be "" when assign to ""', async () => {
      const options = ['node', 'dev', '--app-name', ''];
      const initTest = await initTestProject();

      const mainProgram = devCommand(program);
      process.argv = options;

      writeFileSync(initTest.webpackDir, WEBPACK_CONTENT);
      await mainProgram.parseAsync(process.argv);

      expect(mainProgram.opts().appName).toBe('');
    });
  });
});
