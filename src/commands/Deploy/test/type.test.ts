import { describe, expect, test } from '@jest/globals';
import { program } from 'commander';
import { existsSync } from 'fs';
import { readFileSync } from 'jsonfile';
import {
  APP_NAME,
  DIR_BUILD_PATH,
  PROJECT_TYPE
} from '../../../../unit_test/constant';
import {
  authCommandImplement,
  createTemplateWithType,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import deployCommand from '../deployCommand';

const OPTIONS = ['node', 'deploy', '--app-name', APP_NAME];

const initTestProject = async (projectType: string) => {
  const projectName = getRandomProjectName();
  const current_dir = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplateWithType(projectName, projectType);

  ((projectType !== '' &&
    Object.values(PROJECT_TYPE).find((item) => item === projectType)) ||
    projectType === '') &&
    (await authCommandImplement(program, process));

  return current_dir;
};

describe('Deploy command', () => {
  test('Should be "Plugin" when assign type to "Plugin"', async () => {
    const current_dir = await initTestProject('Plugin');
    const mainProgram = deployCommand(program);
    process.argv = OPTIONS;

    await mainProgram.parseAsync(process.argv);

    const config = readFileSync(`${current_dir}/config.json`);
    expect(config.type).toBe('Plugin');
  });

  test('Should be "Customization" when assign type to "Customization"', async () => {
    const current_dir = await initTestProject('Customization');
    const mainProgram = deployCommand(program);
    process.argv = OPTIONS;

    await mainProgram.parseAsync(process.argv);

    const config = readFileSync(`${current_dir}/config.json`);
    expect(config.type).toBe('Customization');
  });

  test('Should be false when assign type to "another_&^#_2"', async () => {
    const current_dir = await initTestProject('another_&^#_2');
    console.log(current_dir, 'current_dircurrent_dir');
    const mainProgram = deployCommand(program);
    process.argv = OPTIONS;

    await mainProgram.parseAsync(process.argv);

    const isExistFile = existsSync(`${current_dir}/config.json`);
    expect(isExistFile).toBe(false);
  });

  test('Should be "Customization" when assign type to ""', async () => {
    const current_dir = await initTestProject('');
    const mainProgram = deployCommand(program);
    process.argv = OPTIONS;

    await mainProgram.parseAsync(process.argv);

    const config = readFileSync(`${current_dir}/config.json`);
    expect(config.type).toBe('Customization');
  });
});
