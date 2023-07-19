import { program, CommanderStatic } from 'commander';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';

import {
  createTempDir,
  createTemplate,
  initProject,
  linkDirCustom,
  removeTempDir
} from '../test-helpers';
import deployCommand from '../../src/commands/Deploy/deployCommand';
import { readAndDeployFile } from '../../src/commands/Deploy/validator';

const PROJECT_NAME = 'test-project';
const ORIGINAL_CWD = linkDirCustom();
const TEMP_DIR = ORIGINAL_CWD + 'deployOptionsTemp';
const OPTIONS = [
  'node',
  'deploy',
  '--app-name',
  'test-app_436*#$  32903{D}DSF'
];

describe('deploy command: errors', () => {
  let mainProgram: CommanderStatic;
  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplate(TEMP_DIR, PROJECT_NAME);

    mainProgram = deployCommand(program);
    process.argv = OPTIONS;
    await mainProgram.parseAsync(process.argv);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('should have appName as "test-app_436*#$  32903{D}DSF"', async () => {
    expect(mainProgram.opts().appName).toBe('test-app_436*#$  32903{D}DSF');
  });
});
