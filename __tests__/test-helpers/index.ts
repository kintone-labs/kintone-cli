import fs from 'fs';
import path from 'path';

import { program } from 'commander';

import initCommand from '../../dist/commands/Initialize/initializeCommand';

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
