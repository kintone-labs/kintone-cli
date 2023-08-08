import { describe, expect, test } from '@jest/globals';
import { program } from 'commander';
import { readFileSync, writeFileSync } from 'jsonfile';
import { APP_NAME, DIR_BUILD_PATH } from '../../../../unit_test/constant';
import {
  authCommandImplement,
  createTemplate,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import deployCommand from '../deployCommand';

const options = ['node', 'deploy', '--app-name', APP_NAME];
const webpack_content = 'webpack';

const initTestProject = async () => {
  const projectName = getRandomProjectName();
  const current_dir = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplate(DIR_BUILD_PATH, projectName);
  await authCommandImplement(program, process);

  return current_dir;
};

describe('webpack', () => {
  test('Should be "webpack" when assign content to "webpack" in webpack.config.js', async () => {
    const current_dir = await initTestProject();
    const WEBPACK_DIR = `${current_dir}/webpack.config.js`;
    const mainProgram = deployCommand(program);
    process.argv = options;

    writeFileSync(WEBPACK_DIR, webpack_content);
    await mainProgram.parseAsync(process.argv);
    const config = readFileSync(WEBPACK_DIR);
    expect(config).toBe(webpack_content);
  });
});
