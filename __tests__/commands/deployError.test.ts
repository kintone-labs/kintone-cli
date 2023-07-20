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
  test(`Should have deployValidatorResult as 'App name missing'`, async () => {
    const missingAppname = deployValidatorResult('', false);
    expect(missingAppname).toBe('App name missing');
  });

  test(`Should have deployValidatorResult as 'App not existed'`, async () => {
    const notExistApp = deployValidatorResult('%#$FFD', false);
    expect(notExistApp).toBe('App not existed');
  });

  test('Should have deployValidatorResult as false', async () => {
    const deployFalse = deployValidatorResult('%#$FFD', true);
    expect(deployFalse).toBe(false);
  });

  test('Should have readAndDeployFile as undefined', async () => {
    const readAndDeployFileSuccessWithCustomization = readAndDeployFile({
      isExistsSync: true,
      config: { type: 'Customization' }
    });
    expect(readAndDeployFileSuccessWithCustomization).toBe(undefined);
  });

  test('Should have readAndDeployFile as undefined', async () => {
    const readAndDeployFileSuccessWithPlugin = readAndDeployFile({
      isExistsSync: false,
      config: { type: 'Plugin' }
    });
    expect(readAndDeployFileSuccessWithPlugin).toBe(undefined);
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
    const mkdirSyncCallbackMock = jest.fn();

    expect(
      mkdirSyncCheck({
        isMkdir: false,
        mkdirSyncCallback: mkdirSyncCallbackMock
      })
    ).toBe(undefined);
  });

  test('Should have deployCommandImplement as false', async () => {
    const readAndDeployFileCallbackMock = jest.fn();

    expect(
      deployCommandImplement({
        error: true,
        readAndDeployFileCallback: readAndDeployFileCallbackMock
      })
    ).toBe(false);
  });
});
