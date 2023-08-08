import { describe, expect, test } from '@jest/globals';
import { program } from 'commander';
import { readFileSync, writeFileSync } from 'jsonfile';
import {
  APP_NAME,
  DIR_BUILD_PATH,
  OPTIONS_BUILD,
  WEBPACK_CONTENT
} from '../../../../unit_test/constant';
import {
  createTemplate,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import buildCommand from '../buildCommand';

const initTestProject = async () => {
  const projectName = getRandomProjectName();
  const currentDir = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;
  const webpackDir = `${currentDir}/webpack.config.js`;

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplate(DIR_BUILD_PATH, projectName);
  writeFileSync(webpackDir, WEBPACK_CONTENT);

  const mainProgram = buildCommand(program);
  process.argv = OPTIONS_BUILD;
  await mainProgram.parseAsync(process.argv);

  return webpackDir;
};

describe('build command', () => {
  describe('webpack', () => {
    test('Should be "webpack" when setting "webpack"', async () => {
      const appDir = await initTestProject();
      const config = readFileSync(appDir);

      expect(config).toBe(WEBPACK_CONTENT);
    });
  });
});
