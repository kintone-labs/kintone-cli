import { program } from 'commander';
import {
  authCommandImplement,
  createTempDir,
  createTemplate,
  initProject,
  linkDirCustom
} from '../../test-helpers';
import devCommand from '../../../src/commands/Dev/devCommand';
import { describe, expect, test } from '@jest/globals';
import { writeFileSync } from 'jsonfile';

const ORIGINAL_CWD = linkDirCustom();
const APP_NAME = 'test-app';
const WEBPACK_CONTENT = 'webpack';

const initTestProject = async () => {
  const PROJECT_NAME = 'test-project' + Math.random();
  const TEMP_DIR = ORIGINAL_CWD;
  const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;
  const WEBPACK_DIR = `${CURRENT_DIR}/webpack.config.js`;
  createTempDir(TEMP_DIR);

  await initProject(TEMP_DIR, PROJECT_NAME);
  await createTemplate(TEMP_DIR, PROJECT_NAME);

  return {
    TEMP_DIR,
    WEBPACK_DIR,
    PROJECT_NAME,
    CURRENT_DIR
  };
};

describe('appName', () => {
  test('Should be "test-app" when assign to "test-app"', async () => {
    const options = ['node', 'dev', '--app-name', APP_NAME];
    const initTest = await initTestProject();
    console.log(initTest.CURRENT_DIR, 9999999999);

    authCommandImplement(program, process);
    process.argv = options;
    const mainProgram = devCommand(program);
    writeFileSync(initTest.WEBPACK_DIR, WEBPACK_CONTENT);
    await mainProgram.parseAsync(process.argv);
    expect(mainProgram.opts().appName).toBe('test-app');
  });

  test('Should be "" when assign to ""', async () => {
    const options = ['node', 'dev', '--app-name', ''];
    const initTest = await initTestProject();

    const mainProgram = devCommand(program);
    process.argv = options;

    writeFileSync(initTest.WEBPACK_DIR, WEBPACK_CONTENT);
    await mainProgram.parseAsync(process.argv);
    expect(mainProgram.opts().appName).toBe('');
  });
});
