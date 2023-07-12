import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { program } from 'commander';
import authCommand from '../../dist/commands/Auth/authCommand';
import initCommand from '../../dist/commands/Initialize/initializeCommand';
import fs from 'fs';
import path from 'path';

const PROJECT_NAME = 'test-project';

const ORIGINAL_CWD = process.cwd();
const TEMP_DIR = ORIGINAL_CWD + '/__tests__/temp';

describe('auth command', () => {
  beforeAll(async () => {
    _createTempDir();

    await _initProject();
    await _createTemplate();
  });

  afterAll(() => {
    _removeTempDir();
  });

  test('should pass appName as "test-app"', async () => {
    const mainProgram = authCommand(program);
    process.chdir(process.cwd());
    process.argv = [
      'node',
      'auth',
      '--app-name',
      'test-app',
      '--domain',
      'https://huuchi.kintone.com',
      '--app-id',
      '100',
      '--username',
      'user',
      '--password',
      'password',
      '--use-proxy',
      '--proxy',
      'http://localhost:8080'
    ];
    await mainProgram.parseAsync(process.argv);
    expect(mainProgram.opts().appName).toBe('test-app');
  });
});

function _createTempDir() {
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR);
  }
}

function _removeTempDir() {
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmdirSync(TEMP_DIR);
  }
}

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
