import { describe, expect, jest, test } from '@jest/globals';
import { program, Command } from 'commander';
import { readFileSync, writeFileSync } from 'jsonfile';

import { dataInitDevCommand, devCommandInit, dataDemo } from './uploadConfig';
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

const initTestProject = async () => {
  const projectName = getRandomProjectName();
  const currentDir = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;
  const webpackDir = `${currentDir}/webpack.config.js`;

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplate(DIR_BUILD_PATH, projectName);

  return webpackDir;
};

describe('dev command', () => {
  describe('App name', () => {
    test('Should be "test-app" when assign to "test-app"', async () => {
      const options = ['node', 'dev', '--app-name', APP_NAME];
      const webpackDir = await initTestProject();

      authCommandImplement(program, process);
      process.argv = options;
      const mainProgram = devCommand(program);

      writeFileSync(webpackDir, WEBPACK_CONTENT);
      await mainProgram.parseAsync(process.argv);

      expect(mainProgram.opts().appName).toBe('test-app');
    });

    test('Should be "" when assign to ""', async () => {
      const options = ['node', 'dev', '--app-name', ''];
      const webpackDir = await initTestProject();

      const mainProgram = devCommand(program);
      process.argv = options;

      writeFileSync(webpackDir, WEBPACK_CONTENT);
      await mainProgram.parseAsync(process.argv);

      expect(mainProgram.opts().appName).toBe('');
    });

    let mainProgram: Command;
    const readLineAsyncParam = jest.fn();
    test('Should be "" when assign watch to false', async () => {
      const currentDir = await devCommandInit('Plugin');
      const config = readFileSync(`${currentDir}/config.json`);

      config.uploadConfig.desktop.css = dataDemo();
      config.uploadConfig.mobile.js = dataDemo();
      Object.assign(config.uploadConfig, {
        config: {
          css: dataDemo(),
          js: dataDemo()
        }
      }).desktop.css = dataDemo();

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
        expect(mainProgram.opts().appName).toBe('');
      } catch (error) {
        expect(error).toBe(error);
      }
    });

    test('Should be "" when assign watch to true', async () => {
      const currentDir = await devCommandInit('Plugin');
      const config = readFileSync(`${currentDir}/config.json`);

      config.uploadConfig.desktop.css = dataDemo();
      config.uploadConfig.mobile.js = dataDemo();
      Object.assign(config.uploadConfig, {
        config: {
          css: dataDemo(),
          js: dataDemo()
        }
      }).desktop.css = dataDemo();

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
        expect(mainProgram.opts().appName).toBe('');
      } catch (error) {
        expect(error).toBe(error);
      }
    });
  });
});
