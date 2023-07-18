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

import authCommand from '../../src/commands/Auth/authCommand';
import {
  createTempDir,
  createTemplate,
  initProject,
  removeTempDir
} from '../test-helpers';
import { ERRORS } from '../../src/constant';
import {
  appIDValidator,
  authValidator,
  domainValidator,
  passwordValidator,
  proxyValidator,
  usernameValidator
} from '../../src/commands/Auth/validator';

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

    expect(consoleLogSpy).toHaveBeenCalledWith(
      chalk.red(ERRORS.APP_NAME_MISSING)
    );
  });

  test(`The name app missing -> ${ERRORS.APP_NAME_MISSING}`, async () => {
    const input = '';
    expect(authValidator(input)).resolves.toBe(ERRORS.APP_NAME_MISSING);
  });

  test(`Domain validator: missing https -> ${ERRORS.DOMAIN_STARTS_WITH_HTTPS}`, async () => {
    const input = 'domain.kintone.com';
    expect(domainValidator(input)).resolves.toBe(
      ERRORS.DOMAIN_STARTS_WITH_HTTPS
    );
  });

  test(`Domain validator: valid domain -> ${ERRORS.VALID_DOMAIN}`, async () => {
    const input = 'https://%*@(&#$#).k#intone.%com';
    expect(domainValidator(input)).resolves.toBe(ERRORS.VALID_DOMAIN);
  });

  test(`Domain validator: true -> ${ERRORS.VALID_DOMAIN}`, async () => {
    const input = 'https://domain.kintone.com';
    expect(domainValidator(input)).resolves.toBe(true);
  });

  test(`Username validator -> ${ERRORS.USER_NAME_EMPTY}`, async () => {
    const input = '';
    expect(usernameValidator(input)).resolves.toBe(ERRORS.USER_NAME_EMPTY);
  });

  test(`Username validator -> true`, async () => {
    const input = 'tester';
    expect(usernameValidator(input)).resolves.toBe(true);
  });

  test(`Password validator -> ${ERRORS.PASSWORD_EMPTY}`, async () => {
    const input = '';
    expect(passwordValidator(input)).resolves.toBe(ERRORS.PASSWORD_EMPTY);
  });

  test(`Password validator -> true`, async () => {
    const input = 'passwordtest';
    expect(passwordValidator(input)).resolves.toBe(true);
  });

  test(`AppID validator -> ${ERRORS.APP_ID_EMPTY}`, async () => {
    const input = '';
    expect(appIDValidator(input)).resolves.toBe(ERRORS.APP_ID_EMPTY);
  });

  test(`AppID validator -> ${ERRORS.APP_ID_NUMBER}`, async () => {
    const input = '%#$testttt';
    expect(appIDValidator(input)).resolves.toBe(ERRORS.APP_ID_NUMBER);
  });

  test(`AppID validator -> true`, async () => {
    const input = '546';
    expect(appIDValidator(input)).resolves.toBe(true);
  });

  test(`Proxy validator -> ${ERRORS.PROXY_EMPTY}`, async () => {
    const input = '';
    expect(proxyValidator(input)).resolves.toBe(ERRORS.PROXY_EMPTY);
  });

  test(`Proxy validator -> true`, async () => {
    const input = '546';
    expect(proxyValidator(input)).resolves.toBe(true);
  });
});
