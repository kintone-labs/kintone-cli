import { describe, expect, jest, test } from '@jest/globals';
import { program, Command } from 'commander';
import { readFileSync, writeFileSync } from 'jsonfile';

import devCommand, { devCommandHandle } from '../devCommand';
import {
  APP_NAME,
  DIR_BUILD_PATH,
  WEBPACK_CONTENT
} from '../../../../unit_test/constant';
import { WRITE_FILE_OPTIONS } from '../../../constant';

import {
  authCommandImplement,
  createTemplate,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import {
  dataInitDevCommand,
  dataTest,
  devCommandInit
} from './uploadConfig.test';

const initializeTestProject = async () => {
  const projectName = getRandomProjectName();
  const currentDir = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;
  const webpackDir = `${currentDir}/webpack.config.js`;

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplate(DIR_BUILD_PATH, projectName);

  return webpackDir;
};

describe('Dev command', () => {
  describe('App name', () => {
    test('Should be "test-app" when setting the value "test-app"', async () => {
      const options = ['node', 'dev', '--app-name', APP_NAME];
      const webpackDir = await initializeTestProject();
      authCommandImplement(program, process);
      process.argv = options;
      const mainProgram = devCommand(program);
      writeFileSync(webpackDir, WEBPACK_CONTENT);
      await mainProgram.parseAsync(process.argv);

      expect(mainProgram.opts().appName).toEqual('test-app');
    });

    test('Should be "" when setting the value ""', async () => {
      const options = ['node', 'dev', '--app-name', ''];
      const webpackDir = await initializeTestProject();
      const mainProgram = devCommand(program);
      process.argv = options;
      writeFileSync(webpackDir, WEBPACK_CONTENT);
      await mainProgram.parseAsync(process.argv);

      expect(mainProgram.opts().appName).toEqual('');
    });

    let mainProgram: Command;
    const readLineAsyncParam = jest.fn();

    test('Should be "" when setting the value watch to false', async () => {
      const currentDir = await devCommandInit('Plugin');
      const config = readFileSync(`${currentDir}/config.json`);
      config.uploadConfig.desktop.css = dataTest();
      config.uploadConfig.mobile.js = dataTest();
      Object.assign(config.uploadConfig, {
        config: { css: dataTest(), js: dataTest() }
      });

      writeFileSync(`${currentDir}/config.json`, config, WRITE_FILE_OPTIONS);
      const { webpackDevServer, commandConfig, responseMessage } =
        dataInitDevCommand({ process, watch: false });

      try {
        await devCommandHandle({
          ws: webpackDevServer,
          cmd: commandConfig,
          data: responseMessage,
          readLineAsyncParam
        });
        expect(mainProgram.opts().appName).toEqual('');
      } catch (error) {
        expect(error).toEqual(error);
      }
    });

    test('Should be "" setting the value watch to true', async () => {
      const currentDir = await devCommandInit('Plugin');
      const config = readFileSync(`${currentDir}/config.json`);
      config.uploadConfig.desktop.css = dataTest();
      config.uploadConfig.mobile.js = dataTest();
      Object.assign(config.uploadConfig, {
        config: { css: dataTest(), js: dataTest() }
      });

      writeFileSync(`${currentDir}/config.json`, config, WRITE_FILE_OPTIONS);
      const { webpackDevServer, commandConfig, responseMessage } =
        dataInitDevCommand({ process, watch: true });

      try {
        await devCommandHandle({
          ws: webpackDevServer,
          cmd: commandConfig,
          data: responseMessage,
          readLineAsyncParam
        });
        expect(mainProgram.opts().appName).toEqual('');
      } catch (error) {
        expect(error).toEqual(error);
      }
    });
  });
});
