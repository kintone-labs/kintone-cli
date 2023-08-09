import { describe, expect, jest, test } from '@jest/globals';
import { program } from 'commander';
import spawn from 'cross-spawn';
import { readFileSync, writeFileSync } from 'jsonfile';

import devCommand, { devCommandHandle } from '../devCommand';
import buildCommand from '../../Build/buildCommand';
import { WRITE_FILE_OPTIONS } from '../../../constant';
import {
  APP_NAME,
  DIR_BUILD_PATH,
  WEBPACK_CONTENT
} from '../../../../unit_test/constant';
import {
  authCommandImplement,
  createTemplateWithType,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';

export const dataInitDevCommand = ({ process, watch }) => {
  const commandConfig = {
    appName: APP_NAME,
    localhost: 'https://domain.kintone.com',
    watch: watch
  };
  const responseMessage = 'Serving at';
  const webpackDevServer = spawn('npm', ['run', 'dev', '--', '--https']);
  process.exit = jest.fn(() => {
    const err = new Error('An error has occurred');
    throw err;
  });

  return {
    webpackDevServer,
    commandConfig,
    responseMessage
  };
};

export const devCommandInit = async (typeProject = 'Customization') => {
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

  return currentDir;
};

export const buildCommandInit = async () => {
  const OPTIONS_BUILD = ['node', 'build', '--app-name', APP_NAME];
  const mainProgram = buildCommand(program);
  process.argv = OPTIONS_BUILD;

  await mainProgram.parseAsync(process.argv);
};

export const dataDemo = (dataInit = []) => [
  ...dataInit,
  'https://exmaple-abc.com',
  'test-app/source/js/script.js'
];

describe('dev command', () => {
  const readLineAsyncParam = jest.fn();
  describe('UploadConfig', () => {
    test('Should be "https://exmaple-abc.com" when setting "https://exmaple-abc.com"', async () => {
      const currentDir = await devCommandInit();

      const config = readFileSync(`${currentDir}/config.json`);
      config.uploadConfig.desktop.js = ['https://exmaple-abc.com'];
      config.uploadConfig.desktop.css = dataDemo(
        config.uploadConfig.desktop.css
      );
      config.uploadConfig.mobile.js = dataDemo(config.uploadConfig.mobile.js);
      writeFileSync(`${currentDir}/config.json`, config, WRITE_FILE_OPTIONS);

      const { webpackDevServer, commandConfig, responseMessage } =
        dataInitDevCommand({
          process,
          watch: true
        });

      try {
        await devCommandHandle({
          ws: webpackDevServer,
          cmd: commandConfig,
          data: responseMessage,
          readLineAsyncParam
        });
        const configCheck = readFileSync(`${currentDir}/config.json`);

        expect(
          configCheck.uploadConfig.desktop.js.find(
            (item) => item === 'https://exmaple-abc.com'
          )
        ).toBe('https://exmaple-abc.com');
      } catch (error) {
        expect(error).toBe('mockExit');
      }
    });
    test('Should be "test-app/source/js/script.js" when setting "test-app/source/js/script.js"', async () => {
      const currentDir = await devCommandInit();

      const config = readFileSync(`${currentDir}/config.json`);
      config.uploadConfig.desktop.js = ['test-app/source/js/script.js'];
      config.uploadConfig.desktop.css = dataDemo(
        config.uploadConfig.desktop.css
      );
      config.uploadConfig.mobile.js = dataDemo(config.uploadConfig.mobile.js);
      writeFileSync(`${currentDir}/config.json`, config, WRITE_FILE_OPTIONS);

      const { webpackDevServer, commandConfig, responseMessage } =
        dataInitDevCommand({
          process,
          watch: false
        });
      try {
        await devCommandHandle({
          ws: webpackDevServer,
          cmd: commandConfig,
          data: responseMessage,
          readLineAsyncParam
        });
        const configCheck = readFileSync(`${currentDir}/config.json`);

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
});
