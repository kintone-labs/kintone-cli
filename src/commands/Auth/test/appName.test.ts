import { beforeAll, describe, expect, test } from '@jest/globals';
import { program } from 'commander';
import { APP_NAME, DIR_BUILD_PATH } from '../../../../unit_test/constant';
import {
  createTemplate,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import authCommand from '../authCommand';
import validator from '../validator';

const initTestProject = async (options) => {
  const projectName = getRandomProjectName();

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplate(DIR_BUILD_PATH, projectName);

  const mainProgram = authCommand(program);
  process.argv = options;

  await mainProgram.parseAsync(process.argv);
  return mainProgram;
};

describe('Auth command', () => {
  const options = [
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

  beforeAll(async () => {
    await initTestProject(options);
  });

  describe('App name', () => {
    test('Should be "app-name" when setting "app-name"', async () => {
      const params = { appName: APP_NAME };
      const isError = validator.authValidator(params);

      expect(isError).toBe(false);
    });

    test('Should be "App name missing" when setting app name is empty', async () => {
      const params = {};
      const isError = validator.authValidator(params);

      expect(isError).toEqual('App name missing');
    });
  });
});
