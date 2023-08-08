import { describe, expect, test } from '@jest/globals';
import { program } from 'commander';
import { DIR_BUILD_PATH } from '../../../../unit_test/constant';
import {
  authCommandImplement,
  createTemplate,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import deployCommand from '../deployCommand';

const initTestProject = async () => {
  const projectName = getRandomProjectName();

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplate(DIR_BUILD_PATH, projectName);
  await authCommandImplement(program, process);
};

describe('appName', () => {
  test('Should be "test-app" when assign to "test-app"', async () => {
    await initTestProject();

    const OPTIONS = ['node', 'deploy', '--app-name', 'test-app'];
    const mainProgram = deployCommand(program);
    process.argv = OPTIONS;

    await mainProgram.parseAsync(process.argv);

    expect(mainProgram.opts().appName).toBe('test-app');
  });

  test('Should be "" when assign to ""', async () => {
    await initTestProject();
    const OPTIONS = ['node', 'deploy', '--app-name', ''];

    const mainProgram = deployCommand(program);
    process.argv = OPTIONS;

    await mainProgram.parseAsync(process.argv);

    expect(mainProgram.opts().appName).toBe('');
  });
});
