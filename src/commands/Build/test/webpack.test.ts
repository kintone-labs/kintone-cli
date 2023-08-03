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
  createBuildDir,
  createTemplate,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import buildCommand from '../buildCommand';

const initTestProject = async () => {
  const projectName = getRandomProjectName();
  const CURRENT_DIR = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;
  const WEBPACK_DIR = `${CURRENT_DIR}/webpack.config.js`;

  createBuildDir(DIR_BUILD_PATH);

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplate(DIR_BUILD_PATH, projectName);

  const mainProgram = buildCommand(program);
  process.argv = OPTIONS_BUILD;

  writeFileSync(WEBPACK_DIR, WEBPACK_CONTENT);
  await mainProgram.parseAsync(process.argv);
  return {
    APP_DIR: `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`,
    WEBPACK_DIR
  };
};

describe('build command', () => {
  describe('webpack', () => {
    test('Should be "webpack" when setting "webpack"', async () => {
      const appDir = await initTestProject();
      const config = readFileSync(appDir.WEBPACK_DIR);
      expect(config).toBe(WEBPACK_CONTENT);
    });
  });
});
