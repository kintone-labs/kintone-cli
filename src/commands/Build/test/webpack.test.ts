import { beforeAll, describe, expect, test } from '@jest/globals';
import { Command, program } from 'commander';
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

describe('build command', () => {
  describe('webpack', () => {
    let mainProgram: Command;
    const projectName = getRandomProjectName();
    const CURRENT_DIR = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;
    const WEBPACK_DIR = `${CURRENT_DIR}/webpack.config.js`;

    beforeAll(async () => {
      createBuildDir(DIR_BUILD_PATH);

      await initProject(DIR_BUILD_PATH, projectName);
      await createTemplate(DIR_BUILD_PATH, projectName);

      mainProgram = buildCommand(program);
      process.argv = OPTIONS_BUILD;

      writeFileSync(WEBPACK_DIR, WEBPACK_CONTENT);
      await mainProgram.parseAsync(process.argv);
    });

    test('Should be "webpack" when setting "webpack"', () => {
      const config = readFileSync(WEBPACK_DIR);
      expect(config).toBe(WEBPACK_CONTENT);
    });
  });
});
