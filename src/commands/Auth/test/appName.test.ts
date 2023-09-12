import { beforeAll, describe, expect, test } from '@jest/globals';
import { program } from 'commander';
import { APP_NAME, DIR_BUILD_PATH } from '../../../../unit_test/constant';
import {
  createTemplate,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import authCommand from '../authCommand';
import { authValidator } from '../validator';

const initializeTestProject = async (options) => {
  const projectName = getRandomProjectName();
  const mainProgram = authCommand(program);

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplate(DIR_BUILD_PATH, projectName);
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
    await initializeTestProject(options);
  });

  describe('App name', () => {
    test('Should not have an error when setting app name to a valid value', async () => {
      const params = { appName: APP_NAME };
      const isError = authValidator(params);

      expect(isError).toBe(false);
    });

    test('Should be "App name missing" when setting app name to a empty value', async () => {
      const params = {};
      const isError = authValidator(params);

      expect(isError).toEqual('App name missing.');
    });
  });
});
