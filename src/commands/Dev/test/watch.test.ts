import { describe, expect, jest, test } from '@jest/globals';
import { Command } from 'commander';
import { readFileSync, writeFileSync } from 'jsonfile';
import { devCommandHandle } from '../devCommand';
import { WRITE_FILE_OPTIONS } from '../../../constant';
import {
  dataInitDevCommand,
  dataTest,
  devCommandInit
} from './uploadConfig.test';

describe('Dev command', () => {
  describe('Watch', () => {
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
  });
});
