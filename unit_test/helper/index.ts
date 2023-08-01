import { program } from 'commander';
import fs from 'fs';
import path from 'path';
import initCommand from '../../dist/commands/Initialize/initializeCommand';
import { DIR_BUILD_PATH } from '../constant';

export const getRandomProjectName = () =>
  `${Math.random().toString(36).substring(2, 12)}`;

export const createBuildDir = (buildDir: string) =>
  !fs.existsSync(buildDir) && fs.mkdirSync(buildDir);

export async function initProject(buildDir: string, projectName: string) {
  process.chdir(path.join(buildDir));
  global.currentDir = process.cwd();

  initCommand(program);
  process.argv = [
    'node',
    'dist',
    'init',
    '--quick',
    '--project-name',
    projectName
  ];
  await program.parseAsync(process.argv);
}

export async function createTemplateWithType(
  projectName: string,
  type: string
) {
  process.chdir(DIR_BUILD_PATH + '/' + projectName);
  global.currentDir = process.cwd();

  initCommand(program);
  process.argv = [
    'node',
    'dist',
    'create-template',
    '--quick',
    '--type',
    type,
    '--app-name',
    'test-app',
    '--app-id',
    '100'
  ];
  await program.parseAsync(process.argv);
}

export async function createTemplate(buildDir: string, projectName: string) {
  process.chdir(buildDir + '/' + projectName);
  global.currentDir = process.cwd();

  initCommand(program);
  process.argv = [
    'node',
    'dist',
    'create-template',
    '--quick',
    '--app-name',
    'test-app',
    '--app-id',
    '100'
  ];
  await program.parseAsync(process.argv);
}
