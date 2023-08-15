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

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplateWithType(projectName, typeProject, true);

  await authCommandImplement(program, process);
  process.argv = OPTIONS;
  const mainProgram = devCommand(program);
  await mainProgram.parseAsync(process.argv);

  return currentDir;
};

export const dataTest = (dataInit = []) => [
  ...dataInit,
  'https://exmaple-abc.com',
  'test-app/source/js/script.js'
];

describe('Dev command', () => {
  const readLineAsyncParam = jest.fn();
  describe('Upload config', () => {
    test('Should be "https://exmaple-abc.com" when setting the value to "https://exmaple-abc.com"', async () => {
      const currentDir = await devCommandInit();

      const config = readFileSync(`${currentDir}/config.json`);
      const uploadConfig = config.uploadConfig;
      uploadConfig.desktop.js = ['https://exmaple-abc.com'];
      uploadConfig.desktop.css = dataTest(uploadConfig.desktop.css);
      uploadConfig.mobile.js = dataTest(uploadConfig.mobile.js);
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
        const configUpdated = readFileSync(`${currentDir}/config.json`);
        const domainUpload = configUpdated.uploadConfig.desktop.js.find(
          (item: string) => item === 'https://exmaple-abc.com'
        );

        expect(domainUpload).toEqual('https://exmaple-abc.com');
      } catch (error) {
        expect(error).toEqual(error);
      }
    });
  });
});
