import { program } from 'commander';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import {
  createTempDir,
  createTemplate,
  initProject,
  removeTempDir
} from '../test-helpers';
import buildCommand from '../../src/commands/Build/buildCommand';
import {
  appFileCheckImplement,
  buildAppImplement,
  buildCommandHandle,
  buildCommandImplement,
  manifestJSONConfig,
  updateManifestJSON
} from '../../src/commands/Build/helper';
import { appFileCheck } from '../../src/commands/Build/validator';
import {
  paramArrUpdate,
  renameSyncImplement
} from '../../src/commands/Build/builder';

const PROJECT_NAME = 'test-project';
const ORIGINAL_CWD = process.cwd();
const TEMP_DIR = ORIGINAL_CWD + '/__tests__/buildOptionsTemp';
const OPTIONS = ['node', 'build', '--app-name', 'test-app_436*#$  32903{D}DSF'];
const UPLOAD_CONFIG = {
  name: 'test',
  description: 'this is test',
  version: '1.0.0',
  desktop: 'desktop',
  mobile: 'mobile',
  config: 'config',
  icon: 'icon-test'
};

describe('build command: errors', () => {
  let mainProgram: any;
  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplate(TEMP_DIR, PROJECT_NAME);

    mainProgram = buildCommand(program);
    process.argv = OPTIONS;
    await mainProgram.parseAsync(process.argv);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('should have appName as "test-app_436*#$  32903{D}DSF"', async () => {
    expect(mainProgram.opts().appName).toBe('test-app_436*#$  32903{D}DSF');
  });
});

describe('build command: helper', () => {
  test('buildAppImplement func: type "Customization" -> true', async () => {
    const input = {
      config: {
        type: 'Customization',
        appName: PROJECT_NAME,
        required_params: ['a', 'b'],
        html: 'abc',
        uploadConfig: UPLOAD_CONFIG
      },
      isBuildWebpack: true
    };
    expect(buildAppImplement(input)).toBe(true);
  });

  test('buildAppImplement func: isBuildWebpack [false] -> false', async () => {
    const input = {
      config: {
        type: 'Customization',
        appName: PROJECT_NAME,
        required_params: ['a', 'b'],
        html: 'abc',
        uploadConfig: UPLOAD_CONFIG
      },
      isBuildWebpack: false
    };
    expect(buildAppImplement(input)).toBe(false);
  });

  test('buildAppImplement func: isBuildWebpack [false] -> true', async () => {
    const input = {
      config: {
        type: 'Plugin',
        appName: PROJECT_NAME,
        required_params: ['a', 'b'],
        html: 'abc',
        uploadConfig: UPLOAD_CONFIG
      },
      isBuildWebpack: true
    };
    expect(buildAppImplement(input)).toBe(true);
  });

  test('manifestJSONConfig func: type "Plugin" -> undefined', async () => {
    const input = {
      manifestJSON: {
        config: {
          html: 'abc'
        }
      },
      htmlContent: false
    };
    expect(manifestJSONConfig(input)).toBe(undefined);
  });

  test('appFileCheckImplement func: type "Plugin" -> true', async () => {
    const input = {
      isNotError: false,
      appName: PROJECT_NAME
    };
    expect(appFileCheckImplement(input)).toBe(false);
  });

  test('appFileCheckImplement func: type "Plugin" -> true', async () => {
    const input = {
      isNotError: true,
      appName: PROJECT_NAME
    };
    expect(appFileCheckImplement(input)).toBe(true);
  });

  test('buildCommandHandle func -> undefined', async () => {
    const input = {
      config: { appName: PROJECT_NAME },
      isBuildWebpack: true
    };
    expect(buildCommandHandle(input)).toBe(undefined);
  });

  test('buildCommandImplement func -> undefined', async () => {
    const input = {
      appName: PROJECT_NAME
    };
    expect(buildCommandImplement(input)).toBe(undefined);
  });

  test('appFileCheck func -> false', async () => {
    const input = {
      appName: PROJECT_NAME,
      isExistsSync: false
    };
    expect(appFileCheck(input)).toBe(false);
  });

  test('appFileCheck func -> true', async () => {
    const input = {
      appName: PROJECT_NAME,
      isExistsSync: true
    };
    expect(appFileCheck(input)).toBe(true);
  });

  test('updateManifestJSON func -> undefined' + __dirname, async () => {
    const input = {
      manifestJSON: {},
      option: {
        uploadConfig: {
          ...UPLOAD_CONFIG,
          config: {
            required_params: [],
            html: __dirname
          },
          icon: 'icon-test'
        }
      }
    };
    expect(updateManifestJSON(input)).toBe(undefined);
  });

  test('updateManifestJSON func: another case -> undefined', async () => {
    const input = {
      manifestJSON: {},
      option: {
        uploadConfig: {
          ...UPLOAD_CONFIG,
          config: {
            required_params: ['a', 'b', 'c'],
            html: __dirname
          }
        }
      }
    };
    expect(updateManifestJSON(input)).toBe(undefined);
  });
});

describe('build command: builder', () => {
  test('paramArrUpdate func -> inputResult', async () => {
    const input = [];
    const inputResult = ['--ppk', `${PROJECT_NAME}/dist/private.ppk`];

    expect(
      paramArrUpdate({
        paramArr: input,
        isUpdate: true,
        appName: PROJECT_NAME
      })
    ).toBe(inputResult);
  });

  test('renameSyncImplement func: another case -> undefined', async () => {
    const inputResult = ['--ppk', `${PROJECT_NAME}/dist/private.ppk`];

    expect(
      renameSyncImplement({
        isRenameSync: true,
        appName: PROJECT_NAME
      })
    ).toBe(inputResult);
  });
});
