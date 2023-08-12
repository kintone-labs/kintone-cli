import { describe, expect, test } from '@jest/globals';
import { program } from 'commander';
import { readFileSync, writeFileSync } from 'jsonfile';
import {
  APP_NAME,
  DIR_BUILD_PATH,
  WEBPACK_CONTENT,
  OPTIONS_DEPLOY
} from '../../../../unit_test/constant';
import {
  authCommandImplement,
  createTemplate,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import deployCommand from '../deployCommand';

const initializeTestProject = async () => {
  const projectName = getRandomProjectName();
  const currentDir = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplate(DIR_BUILD_PATH, projectName);
  await authCommandImplement(program, process);

  return currentDir;
};

describe('webpack', () => {
  test('Should be assigned as "webpack" when the content is "webpack"', async () => {
    const currentDir = await initializeTestProject();
    const webpackDir = `${currentDir}/webpack.config.js`;
    const mainProgram = deployCommand(program);
    process.argv = OPTIONS_DEPLOY;

    writeFileSync(webpackDir, WEBPACK_CONTENT);
    await mainProgram.parseAsync(process.argv);
    const config = readFileSync(webpackDir);

    expect(config).toBe(WEBPACK_CONTENT);
  });
});
