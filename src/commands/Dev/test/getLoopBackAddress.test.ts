import { describe, expect, test } from '@jest/globals';
import { program } from 'commander';
import { readFileSync, writeFileSync } from 'jsonfile';
import { APP_NAME, DIR_BUILD_PATH } from '../../../../unit_test/constant';
import {
  createTemplate,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import { WRITE_FILE_OPTIONS } from '../../../constant';
import devCommand from '../devCommand';
import { getLoopBackAddress } from '../helper';

const initTestProject = async () => {
  const projectName = getRandomProjectName();

  const OPTIONS = ['node', 'dev', '--app-name', APP_NAME];
  const current_dir = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplate(DIR_BUILD_PATH, projectName);

  const mainProgram = devCommand(program);
  process.argv = OPTIONS;

  await mainProgram.parseAsync(process.argv);

  const config = readFileSync(`${current_dir}/config.json`);
  const dataDemo = (dataInit) => [
    ...dataInit,
    'https://exmaple-abc.com',
    'test-app/source/js/script.js'
  ];
  config.uploadConfig.desktop.js = dataDemo(config.uploadConfig.desktop.js);
  config.uploadConfig.desktop.css = dataDemo(config.uploadConfig.desktop.css);
  config.uploadConfig.mobile.js = dataDemo(config.uploadConfig.mobile.js);

  writeFileSync(`${current_dir}/config.json`, config, WRITE_FILE_OPTIONS);

  return { current_dir };
};

describe('Exist serving', () => {
  test('Should be "" when assign to ""', async () => {
    await initTestProject();
    const resp = '';

    const loopBackAddress = await getLoopBackAddress(resp, true);
    expect(loopBackAddress).toBe('');
  });

  test('Should be "" when assign to ""', async () => {
    await initTestProject();
    const resp = 'Serving at';

    const loopBackAddress = await getLoopBackAddress(resp, true);
    expect(loopBackAddress).toBe('');
  });

  test('Should be "https://domain.kintone.com" when assign to "https://domain.kintone.com"', async () => {
    await initTestProject();
    const resp = 'Serving at,https://domain.kintone.com';

    const loopBackAddress = await getLoopBackAddress(resp, true);
    expect(loopBackAddress).toBe('https://domain.kintone.com');
  });

  test('Should be "https://127.0.0.1:8000" when assign to "https://127.0.0.1:8000"', async () => {
    await initTestProject();
    const resp = 'Serving at,https://127.0.0.1:8000';

    const loopBackAddress = await getLoopBackAddress(resp, true);
    expect(loopBackAddress).toBe('https://127.0.0.1:8000');
  });
});