import { program, CommanderStatic } from 'commander';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import deployCommand from '../../../src/commands/Deploy/deployCommand';
import authCommand from '../../../src/commands/Auth/authCommand';
import {
  authCommandImplement,
  createTempDir,
  createTemplateSpecificType,
  initProject,
  linkDirCustom,
  removeTempDir
} from '../../test-helpers';
import { readFileSync } from 'jsonfile';
import { existsSync } from 'fs';

const PROJECT_NAME = 'test-project';
const ORIGINAL_CWD = linkDirCustom();
const TEMP_DIR = ORIGINAL_CWD + '/buildTypeTemp';
const APP_NAME = 'test-app';
const OPTIONS = ['node', 'deploy', '--app-name', APP_NAME];

describe('type: "Plugin"', () => {
  let mainProgram: CommanderStatic;
  const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplateSpecificType(TEMP_DIR, PROJECT_NAME, 'Plugin');
    await authCommandImplement(program, process);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('Should be "Plugin" when assign type to "Plugin"', async () => {
    mainProgram = deployCommand(program);
    process.argv = OPTIONS;

    await mainProgram.parseAsync(process.argv);

    const config = readFileSync(`${CURRENT_DIR}/config.json`);
    expect(config.type).toBe('Plugin');
  });
});

describe('type: "Customization"', () => {
  let mainProgram: CommanderStatic;
  const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplateSpecificType(TEMP_DIR, PROJECT_NAME, 'Customization');
    await authCommandImplement(program, process);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('Should be "Customization" when assign type to "Customization"', async () => {
    mainProgram = deployCommand(program);
    process.argv = OPTIONS;

    await mainProgram.parseAsync(process.argv);

    const config = readFileSync(`${CURRENT_DIR}/config.json`);
    expect(config.type).toBe('Customization');
  });
});

describe('type: "another_&^#_2"', () => {
  let mainProgram: CommanderStatic;
  const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplateSpecificType(TEMP_DIR, PROJECT_NAME, 'another_&^#_2');
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('Should be false when assign type to "another_&^#_2"', async () => {
    mainProgram = deployCommand(program);
    process.argv = OPTIONS;
    removeTempDir(CURRENT_DIR);

    await mainProgram.parseAsync(process.argv);

    const isExistFile = existsSync(`${CURRENT_DIR}/config.json`);
    expect(isExistFile).toBe(false);
  });
});

describe('type: ""', () => {
  let mainProgram: CommanderStatic;
  const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplateSpecificType(TEMP_DIR, PROJECT_NAME, '');
    await authCommandImplement(program, process);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('Should be "Customization" when assign type to ""', async () => {
    mainProgram = deployCommand(program);
    process.argv = OPTIONS;

    await mainProgram.parseAsync(process.argv);

    const config = readFileSync(`${CURRENT_DIR}/config.json`);
    expect(config.type).toBe('Customization');
  });
});
