import chalk from 'chalk';
import { CommanderStatic, program } from 'commander';
import {
  afterAll,
  beforeAll,
  describe,
  expect,
  test,
  jest
} from '@jest/globals';
import {
  createTempDir,
  createTemplate,
  initProject,
  removeTempDir
} from '../test-helpers';
import buildCommand from '../../dist/commands/Build/buildCommand';

const PROJECT_NAME = 'test-project';
const ORIGINAL_CWD = process.cwd();
const TEMP_DIR = ORIGINAL_CWD + '/__tests__/buildErrorTemp';

describe('build command: errors', () => {
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
    mainProgram = buildCommand(program);
    process.argv = ['node', 'build'];
    await mainProgram.parseAsync(process.argv);

    expect(consoleLogSpy).toHaveBeenCalledWith(chalk.red('App name missing'));
  });

  test('should throw error "App not existed" when no app is exist', async () => {
    const consoleLogSpy = jest.spyOn(global.console, 'log');
    mainProgram = buildCommand(program);
    process.argv = ['node', 'build', '--app-name', "app-name-existn't"];
    removeTempDir(TEMP_DIR);
    await mainProgram.parseAsync(process.argv);

    expect(consoleLogSpy).toHaveBeenCalledWith(chalk.red('App not existed'));
  });
});
