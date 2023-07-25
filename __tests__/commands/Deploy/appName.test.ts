import { program } from 'commander';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import deployCommand from '../../../src/commands/Deploy/deployCommand';
import {
  authCommandImplement,
  createTempDir,
  createTemplate,
  initProject,
  linkDirCustom,
  removeTempDir
} from '../../test-helpers';

const PROJECT_NAME = 'test-project';
const ORIGINAL_CWD = linkDirCustom();
const TEMP_DIR = ORIGINAL_CWD + '/deployAppNameTemp';

describe('appName', () => {
  let mainProgram: any;
  const OPTIONS = ['node', 'deploy', '--app-name', 'test-app'];

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplate(TEMP_DIR, PROJECT_NAME);
    await authCommandImplement(program, process);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('Should be "test-app" when assign to "test-app"', async () => {
    mainProgram = deployCommand(program);
    process.argv = OPTIONS;

    await mainProgram.parseAsync(process.argv);

    expect(mainProgram.opts().appName).toBe('test-app');
  });
});

describe('appName', () => {
  let mainProgram: any;
  const OPTIONS = ['node', 'deploy', '--app-name', ''];

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplate(TEMP_DIR, PROJECT_NAME);
    await authCommandImplement(program, process);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('Should be "" when assign to ""', async () => {
    mainProgram = deployCommand(program);
    process.argv = OPTIONS;

    await mainProgram.parseAsync(process.argv);

    expect(mainProgram.opts().appName).toBe('');
  });
});
