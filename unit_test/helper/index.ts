import { program } from 'commander';
import path from 'path';
import initCommand from '../../src/commands/Initialize/initializeCommand';
import { DIR_BUILD_PATH } from '../constant';
import authCommand from '../../src/commands/Auth/authCommand';

export const getRandomProjectName = () =>
  `${Math.random().toString(36).substring(2, 12)}`;

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

export async function initProjectWithInstall(
  buildDir: string,
  projectName: string
) {
  process.chdir(path.join(buildDir));
  global.currentDir = process.cwd();

  initCommand(program);
  process.argv = [
    'node',
    'dist',
    'init',
    '--install',
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

export async function createTemplateWithArgv(projectName: string, argv: any) {
  process.chdir(DIR_BUILD_PATH + '/' + projectName);
  global.currentDir = process.cwd();

  initCommand(program);
  process.argv = argv;
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

export async function createTemplateNotQuick(projectName: string) {
  process.chdir(DIR_BUILD_PATH + '/' + projectName);
  global.currentDir = process.cwd();

  initCommand(program);

  process.argv = [
    'node',
    'dist',
    'create-template',
    '--type',
    'Customization',
    '--app-name',
    'test-app',
    '--app-id',
    '100',
    '--type',
    'Customization',
    '--set-auth',
    'false',
    '--domain',
    'https://test.com',
    '--username',
    'user',
    '--password',
    'user',
    '--proxy',
    'false',
    '--use-react',
    'false',
    '--use-typescript',
    'true',
    '--use-webpack',
    'true',
    '--entry',
    'index.tsx',
    '--use-cybozu-lint',
    'true',
    '--app-id',
    '3',
    '--scope',
    'ALL'
  ];

  await program.parseAsync(process.argv);
}
