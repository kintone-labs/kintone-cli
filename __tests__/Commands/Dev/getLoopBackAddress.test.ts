import { program, Command } from 'commander';
import {
  createTempDir,
  createTemplate,
  createTemplateSpecificType,
  initProject,
  linkDirCustom,
  removeTempDir
} from '../../test-helpers';
import devCommand from '../../../src/commands/Dev/devCommand';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { readFileSync, writeFileSync } from 'jsonfile';
import { getLoopBackAddress } from '../../../src/commands/Dev/helper';
import spawn from 'cross-spawn';
import { WRITE_FILE_OPTIONS } from '../../../dist/constant';
import { isURL } from '../../../dist/utils/string';

const ORIGINAL_CWD = linkDirCustom();
const TEMP_DIR = ORIGINAL_CWD;
const APP_NAME = 'test-app';

const initTestProject = async () => {
  const PROJECT_NAME = 'test-project' + Math.random();

  const OPTIONS_MISS_NAME = ['node', 'auth', '--app-name', APP_NAME];
  const current_dir = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;
  createTempDir(TEMP_DIR);

  await initProject(TEMP_DIR, PROJECT_NAME);
  await createTemplate(TEMP_DIR, PROJECT_NAME);

  const mainProgram = devCommand(program);
  process.argv = OPTIONS_MISS_NAME;

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
