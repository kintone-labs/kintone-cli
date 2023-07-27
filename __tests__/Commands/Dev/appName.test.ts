// import { Command, program } from 'commander';
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
// const TEMP_DIR = ORIGINAL_CWD + '/devAppNameTemp';
// const APP_NAME = 'test-app';

// describe('appName', () => {
//   let mainProgram: Command;
//   const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;
//   const WEBPACK_DIR = `${CURRENT_DIR}/webpack.config.js`;
//   const WEBPACK_CONTENT = 'webpack';
//   const OPTIONS = ['node', 'dev', '--app-name', APP_NAME];

//   beforeAll(async () => {
//     createTempDir(TEMP_DIR);

//     await initProject(TEMP_DIR, PROJECT_NAME);
//     await createTemplate(TEMP_DIR, PROJECT_NAME);

//     mainProgram = devCommand(program);
//     process.argv = OPTIONS;

//     writeFileSync(WEBPACK_DIR, WEBPACK_CONTENT);
//     await mainProgram.parseAsync(process.argv);
//   });

//   afterAll(() => {
//     removeTempDir(TEMP_DIR);
//   });

//   test('Should be "test-app" when assign to "test-app"', async () => {
//     expect(mainProgram.opts().appName).toBe('test-app');
//   });
// });

// describe('appName', () => {
//   let mainProgram: Command;
//   const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;
//   const WEBPACK_DIR = `${CURRENT_DIR}/webpack.config.js`;
//   const WEBPACK_CONTENT = 'webpack';
//   const OPTIONS = ['node', 'dev', '--app-name', ''];

//   beforeAll(async () => {
//     createTempDir(TEMP_DIR);

//     await initProject(TEMP_DIR, PROJECT_NAME);
//     await createTemplate(TEMP_DIR, PROJECT_NAME);

//     mainProgram = devCommand(program);
//     process.argv = OPTIONS;

//     writeFileSync(WEBPACK_DIR, WEBPACK_CONTENT);
//     await mainProgram.parseAsync(process.argv);
//   });

//   afterAll(() => {
//     removeTempDir(TEMP_DIR);
//   });

//   test('Should be "" when assign to ""', async () => {
//     expect(mainProgram.opts().appName).toBe('');
//   });
// });
