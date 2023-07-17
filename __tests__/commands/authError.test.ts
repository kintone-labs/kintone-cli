import chalk from 'chalk';
import { program, CommanderStatic } from 'commander';
import {
  afterAll,
  beforeAll,
  describe,
  expect,
  test,
  jest
} from '@jest/globals';

import authCommand from '../../dist/commands/Auth/authCommand';
import {
  createTempDir,
  createTemplate,
  initProject,
  removeTempDir
} from '../test-helpers';

const PROJECT_NAME = 'test-project';
const ORIGINAL_CWD = process.cwd();
const TEMP_DIR = ORIGINAL_CWD + '/__tests__/authErrorTemp';

describe('auth command: errors', () => {
  let mainProgram: CommanderStatic;

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplate(TEMP_DIR, PROJECT_NAME);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('should throw error "App name missing" when no app name is specified', async () => {
    const consoleLogSpy = jest.spyOn(global.console, 'log');
    mainProgram = authCommand(program);
    process.argv = ['node', 'auth'];
    await mainProgram.parseAsync(process.argv);

    expect(consoleLogSpy).toHaveBeenCalledWith(chalk.red('App name missing'));
  });
});
