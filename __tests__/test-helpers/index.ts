import fs from 'fs';
import path from 'path';

import { CommanderStatic, program } from 'commander';

import initCommand from '../../dist/commands/Initialize/initializeCommand';
import authCommand from '../../src/commands/Auth/authCommand';

export function createTempDir(TEMP_DIR: string) {
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR);
  }
}

export function removeTempDir(TEMP_DIR: string) {
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmdirSync(TEMP_DIR, { recursive: true });
  }
}

export async function initProject(TEMP_DIR: string, PROJECT_NAME: string) {
  process.chdir(path.join(TEMP_DIR));
  global.currentDir = process.cwd();

  initCommand(program);
  process.argv = [
    'node',
    'dist',
    'init',
    '--quick',
    '--project-name',
    PROJECT_NAME
  ];
  await program.parseAsync(process.argv);
}

export async function createTemplateSpecificType(
  TEMP_DIR: string,
  PROJECT_NAME: string,
  type: string
) {
  process.chdir(TEMP_DIR + '/' + PROJECT_NAME);
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

export async function createTemplate(TEMP_DIR: string, PROJECT_NAME: string) {
  process.chdir(TEMP_DIR + '/' + PROJECT_NAME);
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

export const flatArr = (arr: any) => Object.values(arr).flat(1);

export const linkDirCustom = () => {
  const linkDir = __dirname;
  return linkDir.replace('commands', '');
};

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
