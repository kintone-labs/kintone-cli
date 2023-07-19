import { describe, expect, jest, test } from '@jest/globals';
import {
  addParamArrItem,
  buildCommandImplement,
  deployCommandImplement,
  deployValidatorResult,
  mkdirSyncCheck,
  mkdirSyncImplement,
  readAndDeployFile
} from '../../src/commands/Deploy/validator';
import { ERRORS } from '../../src/constant';

describe('deploy command: validator', () => {
  test(`deployValidator func -> ${ERRORS.APP_NAME_MISSING}`, async () => {
    const input = deployValidatorResult('', false);
    expect(input).toBe(ERRORS.APP_NAME_MISSING);
  });

  test(`deployValidator func -> ${ERRORS.APP_EXISTED}`, async () => {
    const input = deployValidatorResult('%#$FFD', false);
    expect(input).toBe(ERRORS.APP_EXISTED);
  });

  test('deployValidator func -> false', async () => {
    const input = deployValidatorResult('%#$FFD', true);
    expect(input).toBe(false);
  });

  test("readAndDeployFile func: config.type === 'Customization' -> undefined", async () => {
    const input = readAndDeployFile({
      isExistsSync: true,
      config: { type: 'Customization' }
    });
    expect(input).toBe(undefined);
  });

  test('readAndDeployFile func -> undefined', async () => {
    const input = readAndDeployFile({
      isExistsSync: false,
      config: { type: 'Plugin' }
    });
    expect(input).toBe(undefined);
  });

  test('addParamArrItem func -> undefined', async () => {
    const OPTIONS = {
      domain: 'https://domain.kintone.com',
      username: 'test-app',
      password: 'password',
      proxy: 'http://localhost:8080'
    };
    const paramArr = [];

    expect(addParamArrItem({ authJSON: OPTIONS, paramArr })).toBe(undefined);
  });

  test('addParamArrItem func -> undefined', async () => {
    const OPTIONS = {
      appName: 'test-app',
      isExistsFile: true
    };

    expect(buildCommandImplement(OPTIONS)).toBe(undefined);
  });

  test('mkdirSyncCheck func -> undefined', async () => {
    const funcMock = jest.fn();

    expect(
      mkdirSyncCheck({
        isMkdir: false,
        mkdirSyncCallback: funcMock
      })
    ).toBe(undefined);
  });

  test('deployCommandImplement func -> false', async () => {
    const funcMock = jest.fn();

    expect(
      deployCommandImplement({
        error: true,
        readAndDeployFileCallback: funcMock
      })
    ).toBe(false);
  });
});
