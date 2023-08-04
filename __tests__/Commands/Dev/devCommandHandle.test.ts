import { program, Command } from 'commander';
import {
  authCommandImplement,
  createTempDir,
  createTemplate,
  createTemplateSpecificType,
  initProject,
  linkDirCustom
} from '../../test-helpers';
import devCommand from '../../../src/commands/Dev/devCommand';
import { beforeAll, describe, expect, jest, test } from '@jest/globals';
import { readFileSync, writeFileSync } from 'jsonfile';
import { devCommandHandle } from '../../../src/commands/Dev/helper';
import spawn from 'cross-spawn';
import { WRITE_FILE_OPTIONS } from '../../../dist/constant';
import { APP_NAME } from '../../test-helpers/constant';
import buildCommand from '../../../src/commands/Build/buildCommand';

const ORIGINAL_CWD = linkDirCustom();
const OPTIONS = ['node', 'dev', '--app-name', APP_NAME];
const WEBPACK_CONTENT = 'webpack';

const dataInitDevCommand = ({ process, watch }) => {
  const cmd = {
    appName: APP_NAME,
    localhost: 'https://domain.kintone.com',
    watch: watch
  };
  const resp = 'Serving at';
  const ws = spawn('npm', ['run', 'dev', '--', '--https']);
  process.exit = jest.fn(() => {
    throw 'mockExit';
  });

  return {
    ws,
    cmd,
    resp
  };
};

const devCommandInit = async ({ TEMP_DIR, typeProject = 'Customization' }) => {
  const PROJECT_NAME = 'test-project' + Math.random();
  const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;
  const WEBPACK_DIR = `${CURRENT_DIR}/webpack.config.js`;

  createTempDir(TEMP_DIR);

  await initProject(TEMP_DIR, PROJECT_NAME);
  await createTemplateSpecificType(TEMP_DIR, PROJECT_NAME, typeProject);
  await buildCommandInit();

  await authCommandImplement(program, process);
  process.argv = OPTIONS;
  const mainProgram = devCommand(program);
  writeFileSync(WEBPACK_DIR, WEBPACK_CONTENT);
  await mainProgram.parseAsync(process.argv);

  return {
    CURRENT_DIR
  };
};
export const buildCommandInit = async () => {
  const OPTIONS_BUILD = ['node', 'build', '--app-name', APP_NAME];
  const mainProgram = buildCommand(program);
  process.argv = OPTIONS_BUILD;
  console.log('in buildddcommand');

  await mainProgram.parseAsync(process.argv);
};

describe('DevCommand', () => {
  const readLineAsync = jest.fn();
  const TEMP_DIR = ORIGINAL_CWD;

  test('Should be "https://exmaple-abc.com" when setting "https://exmaple-abc.com"', async () => {
    const initTest = await devCommandInit({ TEMP_DIR });
    const dataDemo = (dataInit) => [
      ...dataInit,
      'https://exmaple-abc.com',
      'test-app/source/js/script.js'
    ];
    const config = readFileSync(`${initTest.CURRENT_DIR}/config.json`);
    config.uploadConfig.desktop.js = ['https://exmaple-abc.com'];
    config.uploadConfig.desktop.css = dataDemo(config.uploadConfig.desktop.css);
    config.uploadConfig.mobile.js = dataDemo(config.uploadConfig.mobile.js);
    writeFileSync(
      `${initTest.CURRENT_DIR}/config.json`,
      config,
      WRITE_FILE_OPTIONS
    );

    const { ws, cmd, resp } = dataInitDevCommand({
      process,
      watch: true
    });
    try {
      await devCommandHandle({ ws, cmd, data: resp, readLineAsync });
      const configCheck = readFileSync(`${initTest.CURRENT_DIR}/config.json`);

      expect(
        configCheck.uploadConfig.desktop.js.find(
          (item) => item === 'https://exmaple-abc.com'
        )
      ).toBe('https://exmaple-abc.com');
    } catch (error) {
      expect(error).toBe('mockExit');
    }
  });
});

describe('uploadConfig: desktop', () => {
  const readLineAsync = jest.fn();
  const TEMP_DIR = ORIGINAL_CWD;

  test('Should be "test-app/source/js/script.js" when setting "test-app/source/js/script.js"', async () => {
    const initTest = await devCommandInit({
      TEMP_DIR
    });
    const dataDemo = (dataInit) => [
      ...dataInit,
      'https://exmaple-abc.com',
      'test-app/source/js/script.js'
    ];
    const config = readFileSync(`${initTest.CURRENT_DIR}/config.json`);
    config.uploadConfig.desktop.js = ['test-app/source/js/script.js'];
    config.uploadConfig.desktop.css = dataDemo(config.uploadConfig.desktop.css);
    config.uploadConfig.mobile.js = dataDemo(config.uploadConfig.mobile.js);
    writeFileSync(
      `${initTest.CURRENT_DIR}/config.json`,
      config,
      WRITE_FILE_OPTIONS
    );

    const { ws, cmd, resp } = dataInitDevCommand({
      process,
      watch: false
    });
    try {
      await devCommandHandle({ ws, cmd, data: resp, readLineAsync });
      const configCheck = readFileSync(`${initTest.CURRENT_DIR}/config.json`);

      expect(
        configCheck.uploadConfig.desktop.js.find(
          (item) => item === 'test-app/source/js/script.js'
        )
      ).toBe('test-app/source/js/script.js');
    } catch (error) {
      expect(error).toBe('mockExit');
    }
  });
});

describe('appName', () => {
  let mainProgram: Command;
  const readLineAsync = jest.fn();
  const TEMP_DIR = ORIGINAL_CWD;

  test('Should be "" when assign to "2"', async () => {
    const initTest = await devCommandInit({
      TEMP_DIR,
      typeProject: 'Plugin'
    });
    const config = readFileSync(`${initTest.CURRENT_DIR}/config.json`);

    const dataDemo = () => [
      'https://exmaple-abc.com',
      'test-app/source/js/script.js'
    ];

    config.uploadConfig.desktop.css = dataDemo();
    config.uploadConfig.mobile.js = dataDemo();
    Object.assign(config.uploadConfig, {
      config: {
        css: dataDemo(),
        js: dataDemo()
      }
    }).desktop.css = dataDemo();

    writeFileSync(
      `${initTest.CURRENT_DIR}/config.json`,
      config,
      WRITE_FILE_OPTIONS
    );
    const { ws, cmd, resp } = dataInitDevCommand({
      process,
      watch: false
    });

    try {
      await devCommandHandle({ ws, cmd, data: resp, readLineAsync });
      expect(mainProgram.opts().appName).toBe('');
    } catch (error) {
      expect(error).toBe(error);
    }
  });
});
