import { program, Command } from 'commander';
import buildCommand from '../../../src/commands/Build/buildCommand';
import {
  createTempDir,
  createTemplate,
  initProject,
  jestCommon,
  linkDirCustom,
  removeTempDir
} from '../../utils';
import { readFileSync, writeFileSync } from 'jsonfile';

const PROJECT_NAME = 'test-project';
const ORIGINAL_CWD = linkDirCustom();
const TEMP_DIR = ORIGINAL_CWD + '/buildWebpackTemp';
const APP_NAME = 'test-app';
const OPTIONS = ['node', 'build', '--app-name', APP_NAME];
const WEBPACK_CONTENT = 'webpack';
const { afterAll, beforeAll, describe, expect, test } = jestCommon;

describe('build command', () => {
  describe('webpack', () => {
    let mainProgram: Command;
    const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;
    const WEBPACK_DIR = `${CURRENT_DIR}/webpack.config.js`;

    beforeAll(async () => {
      createTempDir(TEMP_DIR);

      await initProject(TEMP_DIR, PROJECT_NAME);
      await createTemplate(TEMP_DIR, PROJECT_NAME);

      mainProgram = buildCommand(program);
      process.argv = OPTIONS;

      writeFileSync(WEBPACK_DIR, WEBPACK_CONTENT);
      await mainProgram.parseAsync(process.argv);
    });

    afterAll(() => {
      removeTempDir(TEMP_DIR);
    });

    test('Should be "webpack" when assign content to "webpack" in webpack.config.js', async () => {
      const config = readFileSync(WEBPACK_DIR);
      expect(config).toBe(WEBPACK_CONTENT);
    });
  });
});
