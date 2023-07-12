import path from 'path';

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
import initCommand from '../../dist/commands/Initialize/initializeCommand';
import { createTempDir, removeTempDir } from '../helpers';

const PROJECT_NAME = 'test-project';
const ORIGINAL_CWD = process.cwd();
const TEMP_DIR = ORIGINAL_CWD + '/__tests__/authErrorTemp';

describe('auth command: errors', () => {
  let mainProgram: CommanderStatic;

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await _initProject();
    await _createTemplate();
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

async function _initProject() {
  process.chdir(path.join(TEMP_DIR));
  global.currentDir = process.cwd();

  initCommand(program);
  process.argv = [
    'node',
    'dist',
    'init',
    '--quick',
    '--project-name',
    PROJECT_NAME
  ];
  await program.parseAsync(process.argv);
}

async function _createTemplate() {
  process.chdir(TEMP_DIR + '/' + PROJECT_NAME);
  global.currentDir = process.cwd();

  initCommand(program);
  process.argv = [
    'node',
    'dist',
    'create-template',
    '--quick',
    '--app-name',
    'test-app',
    '--app-id',
    '100'
  ];
  await program.parseAsync(process.argv);
}
