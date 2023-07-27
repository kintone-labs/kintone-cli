// import { program, Command } from 'commander';
// import {
//   createTempDir,
//   createTemplate,
//   createTemplateSpecificType,
//   initProject,
//   linkDirCustom,
//   removeTempDir
// } from '../../test-helpers';
// import devCommand from '../../../src/commands/Dev/devCommand';
// import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
// import { readFileSync, writeFileSync } from 'jsonfile';
// import { devCommandHandle } from '../../../src/commands/Dev/helper';
// import spawn from 'cross-spawn';
// import { WRITE_FILE_OPTIONS } from '../../../dist/constant';
// import { isURL } from '../../../dist/utils/string';

// const PROJECT_NAME = 'test-project';
// const ORIGINAL_CWD = linkDirCustom();
// const TEMP_DIR = ORIGINAL_CWD + '/devCommandHandleTemp';
// const APP_NAME = 'test-app';
// const OPTIONS = ['node', 'dev', '--app-name', APP_NAME];

// describe('appName', () => {
//   let mainProgram: Command;
//   const OPTIONS_MISS_NAME = ['node', 'auth', '--app-name', ''];
//   const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;

//   beforeAll(async () => {
//     createTempDir(TEMP_DIR);

//     await initProject(TEMP_DIR, PROJECT_NAME);
//     await createTemplate(TEMP_DIR, PROJECT_NAME);

//     mainProgram = devCommand(program);
//     process.argv = OPTIONS_MISS_NAME;

//     await mainProgram.parseAsync(process.argv);
//   });

//   afterAll(() => {
//     removeTempDir(TEMP_DIR);
//   });

//   test('Should be "" when assign to ""', async () => {
//     const config = readFileSync(`${CURRENT_DIR}/config.json`);
//     console.log(
//       config,
//       '463242tewqr',
//       isURL('https://domain.kintone.com'),
//       9765867
//     );
//     const dataDemo = (dataInit) => [
//       ...dataInit,
//       'https://exmaple-abc.com',
//       'test-app/source/js/script.js'
//     ];
//     config.uploadConfig.desktop.js = dataDemo(config.uploadConfig.desktop.js);
//     config.uploadConfig.desktop.css = dataDemo(config.uploadConfig.desktop.css);
//     config.uploadConfig.mobile.js = dataDemo(config.uploadConfig.mobile.js);

//     writeFileSync(`${CURRENT_DIR}/config.json`, config, WRITE_FILE_OPTIONS);

//     const cmd = {
//       appName: APP_NAME,
//       localhost: 'https://domain.kintone.com',
//       watch: true
//     };
//     const resp = 'Serving at';
//     const ws = spawn('npm', ['run', 'dev', '--', '--https']);

//     devCommandHandle(ws, cmd, resp);
//     expect(mainProgram.opts().appName).toBe('');
//   });
// });

describe('appName', () => {
  let mainProgram: Command;
  const OPTIONS_MISS_NAME = ['node', 'auth', '--app-name', ''];
  const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplateSpecificType(TEMP_DIR, PROJECT_NAME, 'Plugin');

    mainProgram = devCommand(program);
    process.argv = OPTIONS_MISS_NAME;

    await mainProgram.parseAsync(process.argv);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('Should be "" when assign to ""', async () => {
    const config = readFileSync(`${CURRENT_DIR}/config.json`);
    console.log(config, '463242tewqr');
    const dataDemo = (dataInit) => [
      ...dataInit,
      'https://exmaple-abc.com',
      'test-app/source/js/script.js'
    ];
    config.uploadConfig.config.css = dataDemo(config.uploadConfig.config.css);
    config.uploadConfig.config.js = dataDemo(config.uploadConfig.config.js);

    writeFileSync(`${CURRENT_DIR}/config.json`, config, WRITE_FILE_OPTIONS);

    const cmd = {
      appName: APP_NAME,
      localhost: 'https://domain.kintone.com',
      watch: true
    };
    const resp = 'Serving at';
    const ws = spawn('npm', ['run', 'dev', '--', '--https']);

    devCommandHandle(ws, cmd, resp);
    expect(mainProgram.opts().appName).toBe('');
  });
});
