import { program, CommanderStatic } from 'commander';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import deployCommand from '../../../src/commands/Deploy/deployCommand';
import authCommand from '../../../src/commands/Auth/authCommand';
import {
  authCommandImplement,
  createTempDir,
  createTemplate,
  initProject,
  linkDirCustom,
  removeTempDir
} from '../../test-helpers';
import { readFileSync, writeFileSync } from 'jsonfile';

const PROJECT_NAME = 'test-project';
const ORIGINAL_CWD = linkDirCustom();
const TEMP_DIR = ORIGINAL_CWD + '/deployWebpackTemp';
const APP_NAME = 'test-app';
const OPTIONS = ['node', 'deploy', '--app-name', APP_NAME];
const WEBPACK_CONTENT = 'webpack';

describe('webpack', () => {
  let mainProgram: CommanderStatic;

  const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;
  const WEBPACK_DIR = `${CURRENT_DIR}/webpack.config.js`;

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplate(TEMP_DIR, PROJECT_NAME);

    await authCommandImplement(program, process);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('Should be "webpack" when assign content to "webpack" in webpack.config.js', async () => {
    mainProgram = deployCommand(program);
    process.argv = OPTIONS;

    writeFileSync(WEBPACK_DIR, WEBPACK_CONTENT);
    await mainProgram.parseAsync(process.argv);
    const config = readFileSync(WEBPACK_DIR);
    expect(config).toBe(WEBPACK_CONTENT);
  });
});
