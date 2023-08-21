import { describe, expect, test } from '@jest/globals';
import { program } from 'commander';
import { writeFileSync } from 'jsonfile';

import devCommand from '../devCommand';
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

const initializeTestProject = async () => {
  const projectName = getRandomProjectName();
  const currentDir = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;
  const webpackDir = `${currentDir}/webpack.config.js`;

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplate(DIR_BUILD_PATH, projectName);

  return webpackDir;
};

describe('Dev command', () => {
  describe('App name', () => {
    test('Should be "test-app" when setting the value "test-app"', async () => {
      const options = ['node', 'dev', '--app-name', APP_NAME];
      const webpackDir = await initializeTestProject();
      authCommandImplement(program, process);
      process.argv = options;
      const mainProgram = devCommand(program);
      writeFileSync(webpackDir, WEBPACK_CONTENT);
      await mainProgram.parseAsync(process.argv);

      expect(mainProgram.opts().appName).toEqual('test-app');
    });

    test('Should be "" when setting the value ""', async () => {
      const options = ['node', 'dev', '--app-name', ''];
      const webpackDir = await initializeTestProject();
      const mainProgram = devCommand(program);
      process.argv = options;
      writeFileSync(webpackDir, WEBPACK_CONTENT);
      await mainProgram.parseAsync(process.argv);

      expect(mainProgram.opts().appName).toEqual('');
    });
  });
});
