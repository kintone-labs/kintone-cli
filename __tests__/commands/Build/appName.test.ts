import { program, CommanderStatic } from 'commander';
import {
  jestCommon,
  createTempDir,
  createTemplate,
  initProject,
  linkDirCustom,
  removeTempDir
} from '../../utils';
import buildCommand from '../../../src/commands/Build/buildCommand';

const PROJECT_NAME = 'test-project';
const ORIGINAL_CWD = linkDirCustom();
const TEMP_DIR = ORIGINAL_CWD + '/buildappNameTemp';
const APP_NAME = 'test-app';
const OPTIONS = ['node', 'build', '--app-name', APP_NAME];
const { afterAll, beforeAll, describe, expect, test } = jestCommon;

describe('appName', () => {
  let mainProgram: CommanderStatic;

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplate(TEMP_DIR, PROJECT_NAME);

    mainProgram = buildCommand(program);
    process.argv = OPTIONS;

    await mainProgram.parseAsync(process.argv);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('Should be "test-app" when assign to "test-app"', async () => {
    expect(mainProgram.opts().appName).toBe('test-app');
  });
});

describe('appName', () => {
  let mainProgram: CommanderStatic;
  const OPTIONS_MISS_NAME = ['node', 'build', '--app-name', ''];

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplate(TEMP_DIR, PROJECT_NAME);

    mainProgram = buildCommand(program);
    process.argv = OPTIONS_MISS_NAME;

    await mainProgram.parseAsync(process.argv);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('Should be "" when assign to ""', async () => {
    expect(mainProgram.opts().appName).toBe('');
  });
});
