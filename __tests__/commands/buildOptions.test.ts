import { program } from 'commander';
import {
  afterAll,
  beforeAll,
  describe,
  expect,
  jest,
  test
} from '@jest/globals';
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
import { buildPlugin, paramArrUpdate } from '../../src/commands/Build/builder';

const PROJECT_NAME = 'test-project';
const ORIGINAL_CWD = process.cwd();
const TEMP_DIR = ORIGINAL_CWD + '/__tests__/buildOptionsTemp';
const OPTIONS = ['node', 'build', '--app-name', 'APP_NAME'];
const APP_NAME = 'APP_NAME';
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

  test('should have appName as "APP_NAME"', async () => {
    expect(mainProgram.opts().appName).toBe('APP_NAME');
  });
});

describe('build command: helper', () => {
  test('Should have manifestJSONConfig as undefined', async () => {
    const manifestJSONConfigParams = {
      manifestJSON: {
        config: {
          html: TEMP_DIR
        }
      },
      htmlContent: false
    };
    expect(manifestJSONConfig(manifestJSONConfigParams)).toBe(undefined);
  });

  test('Should have buildAppImplement as true', async () => {
    const validParams = {
      config: {
        type: 'Customization',
        appName: PROJECT_NAME,
        required_params: ['a', 'b'],
        html: TEMP_DIR,
        uploadConfig: UPLOAD_CONFIG
      },
      isBuildWebpack: true
    };
    expect(buildAppImplement(validParams)).toBe(true);
  });

  test('Should have buildAppImplement as false', async () => {
    const invalidParams = {
      config: {
        type: 'Customization',
        appName: PROJECT_NAME,
        required_params: ['a', 'b'],
        html: TEMP_DIR,
        uploadConfig: UPLOAD_CONFIG
      },
      isBuildWebpack: false
    };
    expect(buildAppImplement(invalidParams)).toBe(false);
  });

  test('Should have appFileCheckImplement as true', async () => {
    const paramWithError = {
      isNotError: false,
      appName: PROJECT_NAME
    };
    expect(appFileCheckImplement(paramWithError)).toBe(false);
  });

  test('Should have appFileCheckImplement as true', async () => {
    const paramWithoutError = {
      isNotError: true,
      appName: PROJECT_NAME
    };
    expect(appFileCheckImplement(paramWithoutError)).toBe(true);
  });

  test('Should have buildCommandHandle as undefined', async () => {
    const buildCommandHandleParam = {
      config: { appName: PROJECT_NAME },
      isBuildWebpack: true
    };
    expect(buildCommandHandle(buildCommandHandleParam)).toBe(undefined);
  });

  test('Should have buildCommandImplement as undefined', async () => {
    const buildCommandImplementParam = {
      appName: PROJECT_NAME
    };
    expect(buildCommandImplement(buildCommandImplementParam)).toBe(undefined);
  });

  test('Should have appFileCheck as false', async () => {
    const paramWithoutIsExistsSync = {
      appName: PROJECT_NAME,
      isExistsSync: false
    };
    expect(appFileCheck(paramWithoutIsExistsSync)).toBe(false);
  });

  test('Should have appFileCheck as true', async () => {
    const paramWithIsExistsSync = {
      appName: PROJECT_NAME,
      isExistsSync: true
    };
    expect(appFileCheck(paramWithIsExistsSync)).toBe(true);
  });

  test('Should have updateManifestJSON as undefined', async () => {
    const updateManifestJSONParam = {
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
    expect(updateManifestJSON(updateManifestJSONParam)).toBe(undefined);
  });

  test('Should have updateManifestJSON as undefined', async () => {
    const updateManifestJSONParam = {
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
    expect(updateManifestJSON(updateManifestJSONParam)).toBe(undefined);
  });
});

describe('build command: builder', () => {
  test('Should have paramArrUpdate as inputResult', async () => {
    expect(
      paramArrUpdate({
        paramArr: [],
        isUpdate: true,
        appName: PROJECT_NAME
      })
    ).toBe(undefined);
  });

  test('Should have buildPlugin as undefined', async () => {
    const writeFileSyncFunc = jest.fn();
    const readdirSyncUTF8Func = jest.fn();
    const renameSyncFunc = jest.fn();
    const unlinkSyncFunc = jest.fn();
    const option = {
      uploadConfig: {
        ...UPLOAD_CONFIG,
        config: {
          required_params: ['a', 'b', 'c'],
          html: __dirname
        }
      }
    };
    const keyFileName = 'test-app';

    expect(
      buildPlugin({
        option,
        writeFileSyncFunc,
        readdirSyncUTF8Func,
        keyFileName,
        renameSyncFunc,
        unlinkSyncFunc
      })
    ).toBe(undefined);
  });
});
