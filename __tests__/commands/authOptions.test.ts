import path from 'path';

import { program, CommanderStatic } from 'commander';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';

import authCommand from '../../dist/commands/Auth/authCommand';
import initCommand from '../../dist/commands/Initialize/initializeCommand';
import { createTempDir, removeTempDir } from '../helpers';

const PROJECT_NAME = 'test-project';
const ORIGINAL_CWD = process.cwd();
const TEMP_DIR = ORIGINAL_CWD + '/__tests__/temp';
const AUTH_OPTIONS = [
  'node',
  'auth',
  '--app-name',
  'test-app',
  '--domain',
  'https://domain.kintone.com',
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

describe('auth command: options', () => {
  let mainProgram: CommanderStatic;

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await _initProject();
    await _createTemplate();

    mainProgram = authCommand(program);
    process.argv = AUTH_OPTIONS;
    await mainProgram.parseAsync(process.argv);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('should have appName as "test-app"', async () => {
    expect(mainProgram.opts().appName).toBe('test-app');
  });

  test('should have domain as "https://domain.kintone.com"', async () => {
    expect(mainProgram.opts().domain).toBe('https://domain.kintone.com');
  });

  test('should have username as "user"', async () => {
    expect(mainProgram.opts().username).toBe('user');
  });

  test('should have password as "password"', async () => {
    expect(mainProgram.opts().password).toBe('password');
  });

  test('should have appId as "100"', async () => {
    expect(mainProgram.opts().appId).toBe('100');
  });

  test('should have userProxy as "true"', async () => {
    expect(mainProgram.opts().useProxy).toBe(true);
  });

  test('should have proxy as "http://localhost:8080"', async () => {
    expect(mainProgram.opts().proxy).toBe('http://localhost:8080');
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
