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
  test('readAndDeployFile validator: ', async () => {
    const appName = 'test';
    expect(readAndDeployFile(appName)).toBe(true);
  });

  test('readAndDeployFile validator: ', async () => {
    const appName = '';
    expect(readAndDeployFile(appName)).toHaveBeenCalledWith(1);
  });
});
