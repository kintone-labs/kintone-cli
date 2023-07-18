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
  linkDirCustom,
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
const ORIGINAL_CWD = linkDirCustom();
const TEMP_DIR = ORIGINAL_CWD + 'authErrorTemp';

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

    expect(consoleLogSpy).toBe(ERRORS.APP_NAME_MISSING);
  });
});

describe('auth command: validator', () => {
  test(`The name app missing -> ${ERRORS.APP_NAME_MISSING}`, () => {
    const input = '';
    expect(authValidator(input)).toBe(ERRORS.APP_NAME_MISSING);
  });

  test(`Domain validator: missing https -> ${ERRORS.DOMAIN_STARTS_WITH_HTTPS}`, () => {
    const input = 'domain.kintone.com';
    expect(domainValidator(input)).toBe(ERRORS.DOMAIN_STARTS_WITH_HTTPS);
  });

  test(`Domain validator: valid domain -> ${ERRORS.VALID_DOMAIN}`, () => {
    const input = 'https://%*@(&#$#).k#intone.%com';
    expect(domainValidator(input)).toBe(ERRORS.VALID_DOMAIN);
  });

  test(`Domain validator: true -> ${ERRORS.VALID_DOMAIN}`, () => {
    const input = 'https://domain.kintone.com';
    expect(domainValidator(input)).toBe(true);
  });

  test(`Username validator -> ${ERRORS.USER_NAME_EMPTY}`, () => {
    const input = '';
    expect(usernameValidator(input)).toBe(ERRORS.USER_NAME_EMPTY);
  });

  test(`Username validator -> true`, () => {
    const input = 'tester';
    expect(usernameValidator(input)).toBe(true);
  });

  test(`Password validator -> ${ERRORS.PASSWORD_EMPTY}`, () => {
    const input = '';
    expect(passwordValidator(input)).toBe(ERRORS.PASSWORD_EMPTY);
  });

  test(`Password validator -> true`, () => {
    const input = 'passwordtest';
    expect(passwordValidator(input)).toBe(true);
  });

  test(`AppID validator -> ${ERRORS.APP_ID_EMPTY}`, () => {
    const input = '';
    expect(appIDValidator(input)).toBe(ERRORS.APP_ID_EMPTY);
  });

  test(`AppID validator -> ${ERRORS.APP_ID_NUMBER}`, () => {
    const input = '%#$testttt';
    expect(appIDValidator(input)).toBe(ERRORS.APP_ID_NUMBER);
  });

  test(`AppID validator -> true`, () => {
    const input = '546';
    expect(appIDValidator(input)).toBe(true);
  });

  test(`Proxy validator -> ${ERRORS.PROXY_EMPTY}`, () => {
    const input = '';
    expect(proxyValidator(input)).toBe(ERRORS.PROXY_EMPTY);
  });

  test(`Proxy validator -> true`, () => {
    const input = '546';
    expect(proxyValidator(input)).toBe(true);
  });
});
