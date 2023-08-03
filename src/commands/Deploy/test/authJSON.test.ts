import { describe, expect, test } from '@jest/globals';
import { program } from 'commander';
import { readFileSync } from 'jsonfile';
import { APP_NAME, DIR_BUILD_PATH } from '../../../../unit_test/constant';
import {
  authCommandImplement,
  createBuildDir,
  createTemplate,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import deployCommand from '../deployCommand';

const initTestProject = async () => {
  const projectName = getRandomProjectName();
  const current_dir = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;
  createBuildDir(DIR_BUILD_PATH);

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplate(DIR_BUILD_PATH, projectName);
  await authCommandImplement(program, process);

  return current_dir;
};

describe('domain', () => {
  test('Should be "https://domain.kintone.com" when assign type to "https://domain.kintone.com"', async () => {
    const options = ['node', 'deploy', '--app-name', APP_NAME];
    const current_dir = await initTestProject();

    const mainProgram = deployCommand(program);
    process.argv = options;

    await mainProgram.parseAsync(process.argv);
    const config = readFileSync(`${current_dir}/auth.json`);
    expect(config.domain).toBe('https://domain.kintone.com');
  });
});
