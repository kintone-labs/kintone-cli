import { describe, expect, jest, test } from '@jest/globals';
import { Command, program } from 'commander';
import spawn from 'cross-spawn';
import { readFileSync, writeFileSync } from 'jsonfile';
import { APP_NAME } from '../../../../__tests__/test-helpers/constant';
import { WRITE_FILE_OPTIONS } from '../../../../dist/constant';
import {
  DIR_BUILD_PATH,
  WEBPACK_CONTENT
} from '../../../../unit_test/constant';
import {
  authCommandImplement,
  createTemplateWithType,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import buildCommand from '../../Build/buildCommand';
import devCommand from '../devCommand';
import { devCommandHandle } from '../helper';

const dataInitDevCommand = ({ process, watch }) => {
  const cmd = {
    appName: APP_NAME,
    localhost: 'https://domain.kintone.com',
    watch: watch
  };
  const resp = 'Serving at';
  const ws = spawn('npm', ['run', 'dev', '--', '--https']);
  process.exit = jest.fn(() => {
    const err = new Error('An error has occurred');
    throw err;
  });

  return {
    ws,
    cmd,
    resp
  };
};

const devCommandInit = async (typeProject = 'Customization') => {
  const OPTIONS = ['node', 'dev', '--app-name', APP_NAME];
  const projectName = getRandomProjectName();
  const currentDir = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;
  const WEBPACK_DIR = `${currentDir}/webpack.config.js`;

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplateWithType(projectName, typeProject);
  await buildCommandInit();

  await authCommandImplement(program, process);
  process.argv = OPTIONS;
  const mainProgram = devCommand(program);
  writeFileSync(WEBPACK_DIR, WEBPACK_CONTENT);
  await mainProgram.parseAsync(process.argv);

  return {
    currentDir
  };
};
export const buildCommandInit = async () => {
  const OPTIONS_BUILD = ['node', 'build', '--app-name', APP_NAME];
  const mainProgram = buildCommand(program);
  process.argv = OPTIONS_BUILD;

  await mainProgram.parseAsync(process.argv);
};

describe('DevCommand', () => {
  const readLineAsync = jest.fn();

  test('Should be "https://exmaple-abc.com" when setting "https://exmaple-abc.com"', async () => {
    const initTest = await devCommandInit();
    const dataDemo = (dataInit) => [
      ...dataInit,
      'https://exmaple-abc.com',
      'test-app/source/js/script.js'
    ];
    const config = readFileSync(`${initTest.currentDir}/config.json`);
    config.uploadConfig.desktop.js = ['https://exmaple-abc.com'];
    config.uploadConfig.desktop.css = dataDemo(config.uploadConfig.desktop.css);
    config.uploadConfig.mobile.js = dataDemo(config.uploadConfig.mobile.js);
    writeFileSync(
      `${initTest.currentDir}/config.json`,
      config,
      WRITE_FILE_OPTIONS
    );

    const { ws, cmd, resp } = dataInitDevCommand({
      process,
      watch: true
    });
    try {
      await devCommandHandle({ ws, cmd, data: resp, readLineAsync });
      const configCheck = readFileSync(`${initTest.currentDir}/config.json`);

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

  test('Should be "test-app/source/js/script.js" when setting "test-app/source/js/script.js"', async () => {
    const initTest = await devCommandInit();
    const dataDemo = (dataInit) => [
      ...dataInit,
      'https://exmaple-abc.com',
      'test-app/source/js/script.js'
    ];
    const config = readFileSync(`${initTest.currentDir}/config.json`);
    config.uploadConfig.desktop.js = ['test-app/source/js/script.js'];
    config.uploadConfig.desktop.css = dataDemo(config.uploadConfig.desktop.css);
    config.uploadConfig.mobile.js = dataDemo(config.uploadConfig.mobile.js);
    writeFileSync(
      `${initTest.currentDir}/config.json`,
      config,
      WRITE_FILE_OPTIONS
    );

    const { ws, cmd, resp } = dataInitDevCommand({
      process,
      watch: false
    });
    try {
      await devCommandHandle({ ws, cmd, data: resp, readLineAsync });
      const configCheck = readFileSync(`${initTest.currentDir}/config.json`);

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

  test('Should be "" when assign to "2"', async () => {
    const initTest = await devCommandInit('Plugin');
    const config = readFileSync(`${initTest.currentDir}/config.json`);

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
      `${initTest.currentDir}/config.json`,
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

  test('Should be "" when assign to "2"', async () => {
    const initTest = await devCommandInit('Plugin');
    const config = readFileSync(`${initTest.currentDir}/config.json`);

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
      `${initTest.currentDir}/config.json`,
      config,
      WRITE_FILE_OPTIONS
    );
    const { ws, cmd, resp } = dataInitDevCommand({
      process,
      watch: true
    });

    try {
      await devCommandHandle({ ws, cmd, data: resp, readLineAsync });
      expect(mainProgram.opts().appName).toBe('');
    } catch (error) {
      expect(error).toBe(error);
    }
  });
});
