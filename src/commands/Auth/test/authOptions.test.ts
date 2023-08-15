import { Command, program } from 'commander';
import { beforeAll, describe, expect, test } from '@jest/globals';
import authCommand from '../authCommand';
import {
  createTemplate,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import { APP_NAME, DIR_BUILD_PATH } from '../../../../unit_test/constant';

const AUTH_OPTIONS = [
  'node',
  'auth',
  '--app-name',
  APP_NAME,
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

const initializeTestProject = async (options) => {
  const projectName = getRandomProjectName();
  const mainProgram = authCommand(program);

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplate(DIR_BUILD_PATH, projectName);
  process.argv = options;
  await mainProgram.parseAsync(process.argv);

  return mainProgram;
};

describe('auth command: options', () => {
  let mainProgram: Command;

  beforeAll(async () => {
    mainProgram = await initializeTestProject(AUTH_OPTIONS);
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
