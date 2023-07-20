import { describe, expect, jest, test } from '@jest/globals';
import {
  addParamArrItem,
  buildCommandImplement,
  deployCommandImplement,
  deployValidatorResult,
  mkdirSyncCheck,
  readAndDeployFile
} from '../../src/commands/Deploy/validator';

export const ERRORS = {
  APP_NAME_MISSING: 'App name missing',
  APP_EXISTED: 'App not existed'
};

describe('deploy command: validator', () => {
  test(`Should have deployValidatorResult as ${ERRORS.APP_NAME_MISSING}`, async () => {
    const input = deployValidatorResult('', false);
    expect(input).toBe(ERRORS.APP_NAME_MISSING);
  });

  test(`Should have deployValidatorResult as ${ERRORS.APP_EXISTED}`, async () => {
    const input = deployValidatorResult('%#$FFD', false);
    expect(input).toBe(ERRORS.APP_EXISTED);
  });

  test('Should have deployValidatorResult as false', async () => {
    const input = deployValidatorResult('%#$FFD', true);
    expect(input).toBe(false);
  });

  test('Should have readAndDeployFile as undefined', async () => {
    const input = readAndDeployFile({
      isExistsSync: true,
      config: { type: 'Customization' }
    });
    expect(input).toBe(undefined);
  });

  test('Should have readAndDeployFile as undefined', async () => {
    const input = readAndDeployFile({
      isExistsSync: false,
      config: { type: 'Plugin' }
    });
    expect(input).toBe(undefined);
  });

  test('Should have addParamArrItem as undefined', async () => {
    const OPTIONS = {
      domain: 'https://domain.kintone.com',
      username: 'test-app',
      password: 'password',
      proxy: 'http://localhost:8080'
    };
    const paramArr = [];

    expect(addParamArrItem({ authJSON: OPTIONS, paramArr })).toBe(undefined);
  });

  test('Should have buildCommandImplement as undefined', async () => {
    const OPTIONS = {
      appName: 'test-app',
      isExistsFile: true
    };

    expect(buildCommandImplement(OPTIONS)).toBe(undefined);
  });

  test('Should have mkdirSyncCheck as undefined', async () => {
    const funcMock = jest.fn();

    expect(
      mkdirSyncCheck({
        isMkdir: false,
        mkdirSyncCallback: funcMock
      })
    ).toBe(undefined);
  });

  test('Should have deployCommandImplement as false', async () => {
    const funcMock = jest.fn();

    expect(
      deployCommandImplement({
        error: true,
        readAndDeployFileCallback: funcMock
      })
    ).toBe(false);
  });
});
