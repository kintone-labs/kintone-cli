import { CommanderStatic, program } from 'commander';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import {
  createTempDir,
  createTemplate,
  initProject,
  linkDirCustom,
  removeTempDir
} from '../test-helpers';
import deployCommand from '../../src/commands/Deploy/deployCommand';
import {
  addParamArrItem,
  buildCommandImplement,
  deployValidatorResult,
  mkdirSyncCheck,
  readAndDeployFileResult
} from '../../src/commands/Deploy/validator';
import { ERRORS } from '../../dist/constant';

const PROJECT_NAME = 'test-project';
const ORIGINAL_CWD = linkDirCustom();
const TEMP_DIR = ORIGINAL_CWD + 'deployErrorTemp';

describe('deploy command: errors', () => {
  let mainProgram: CommanderStatic;

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplate(TEMP_DIR, PROJECT_NAME);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('should throw error "App not existed" when no app is exist', async () => {
    mainProgram = deployCommand(program);
    process.argv = ['node', 'deploy', '--app-name', "app-name-existn't"];
    await mainProgram.parseAsync(process.argv);

    expect(mainProgram.opts().appName).toBe(false);
  });
});

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

  test("readAndDeployFileResult func -> config.type === 'Customization'", async () => {
    const input = readAndDeployFileResult({
      isExistsSync: true,
      config: { type: 'Customization' }
    });
    expect(input).toBe(true);
  });

  test("readAndDeployFileResult func -> config.type === 'Customization'", async () => {
    const input = readAndDeployFileResult({
      isExistsSync: false,
      config: { type: 'Plugin' }
    });
    expect(input).toBe(true);
  });

  test('addParamArrItem func -> true', async () => {
    const OPTIONS = {
      domain: 'https://domain.kintone.com',
      username: 'test-app',
      password: 'password',
      proxy: 'http://localhost:8080'
    };
    const paramArr = [];

    expect(addParamArrItem({ authJSON: OPTIONS, paramArr })).toBe(true);
  });

  test('mkdirSyncCheck func -> true', async () => {
    const OPTIONS = {
      appName: 'test-app',
      isMkdir: false
    };

    expect(mkdirSyncCheck(OPTIONS)).toBe(true);
  });

  test('addParamArrItem func -> true', async () => {
    const OPTIONS = {
      appName: 'test-app',
      isExistsFile: true
    };

    expect(buildCommandImplement(OPTIONS)).toBe(true);
  });
});
