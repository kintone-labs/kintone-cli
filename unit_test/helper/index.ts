import { program } from 'commander';
import fs from 'fs';
import path from 'path';
import initCommand from '../../dist/commands/Initialize/initializeCommand';
import authCommand from '../../src/commands/Auth/authCommand';
import { DIR_BUILD_PATH } from '../constant';

export const getRandomProjectName = () =>
  `${Math.random().toString(36).substring(2, 12)}`;

export const createBuildDir = (buildDir: string) =>
  !fs.existsSync(buildDir) && fs.mkdirSync(buildDir);

export const removeTempDir = (buildDir: string) =>
  fs.existsSync(buildDir) && fs.rmdirSync(buildDir, { recursive: true });

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

export const authCommandImplement = async (authProgramInput, authProcess) => {
  const authProgram = authCommand(authProgramInput);
  const AUTH_OPTIONS = [
    'node',
    'auth',
    '--app-name',
    'test-app',
    '--domain',
    'https://domain.kintone.com',
    '--app-id',
    '100',
    '--username',
    'user',
    '--password',
    'password',
    '--use-proxy',
    '--proxy',
    'http://localhost:8080'
  ];

  authProcess.argv = AUTH_OPTIONS;

  await authProgram.parseAsync(authProcess.argv);
};
