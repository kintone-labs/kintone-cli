import { program, CommanderStatic } from 'commander';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import buildCommand from '../../../src/commands/Build/buildCommand';
import {
  createTempDir,
  createTemplateSpecificType,
  initProject,
  linkDirCustom,
  removeTempDir
} from '../../test-helpers';
import { DECLARE_KINTONE, WRITE_FILE_OPTIONS } from '../../../src/constant';
import { readFileSync, writeFileSync } from 'jsonfile';

const PROJECT_NAME = 'test-project';
const ORIGINAL_CWD = linkDirCustom();
const TEMP_DIR = ORIGINAL_CWD + '/buildOptionsTemp';
const APP_NAME = 'test-app';
const OPTIONS = ['node', 'build', '--app-name', APP_NAME];

describe('Info options: name', () => {
  let mainProgram: CommanderStatic;
  const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;
  const DATA_DEMO = {
    name: 'test'
  };

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplateSpecificType(TEMP_DIR, PROJECT_NAME, 'Plugin');

    mainProgram = buildCommand(program);
    process.argv = OPTIONS;

    writeFileSync(`${CURRENT_DIR}/auth.json`, DECLARE_KINTONE);
    const config = readFileSync(`${CURRENT_DIR}/config.json`);
    Object.assign(config.uploadConfig, DATA_DEMO);
    writeFileSync(`${CURRENT_DIR}/config.json`, config, WRITE_FILE_OPTIONS);

    await mainProgram.parseAsync(process.argv);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('Should be "test" when assign to "test"', async () => {
    const config = readFileSync(`${CURRENT_DIR}/config.json`);
    const result = {
      name: config.uploadConfig.name,
      description: config.uploadConfig.description,
      version: config.uploadConfig.version
    };
    expect(result).toEqual(DATA_DEMO);
  });
});

describe('Info options: name empty', () => {
  let mainProgram: CommanderStatic;
  const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;
  const DATA_DEMO = {
    name: ''
  };

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplateSpecificType(TEMP_DIR, PROJECT_NAME, 'Plugin');

    mainProgram = buildCommand(program);
    process.argv = OPTIONS;

    writeFileSync(`${CURRENT_DIR}/auth.json`, DECLARE_KINTONE);
    const config = readFileSync(`${CURRENT_DIR}/config.json`);
    Object.assign(config.uploadConfig, DATA_DEMO);
    writeFileSync(`${CURRENT_DIR}/config.json`, config, WRITE_FILE_OPTIONS);

    await mainProgram.parseAsync(process.argv);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('Should be "" when assign to ""', async () => {
    const config = readFileSync(`${CURRENT_DIR}/config.json`);
    const result = {
      name: config.uploadConfig.name
    };
    expect(result).toEqual(DATA_DEMO);
  });
});

describe('Info options: description', () => {
  let mainProgram: CommanderStatic;
  const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;
  const DATA_DEMO = {
    description: 'This is unit test'
  };

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplateSpecificType(TEMP_DIR, PROJECT_NAME, 'Plugin');

    mainProgram = buildCommand(program);
    process.argv = OPTIONS;

    writeFileSync(`${CURRENT_DIR}/auth.json`, DECLARE_KINTONE);
    const config = readFileSync(`${CURRENT_DIR}/config.json`);
    Object.assign(config.uploadConfig, DATA_DEMO);
    writeFileSync(`${CURRENT_DIR}/config.json`, config, WRITE_FILE_OPTIONS);

    await mainProgram.parseAsync(process.argv);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('Should be "This is unit test" when assign to "This is unit test"', async () => {
    const config = readFileSync(`${CURRENT_DIR}/config.json`);
    const result = {
      description: config.uploadConfig.description
    };
    expect(result).toEqual(DATA_DEMO);
  });
});

describe('Info options: description empty', () => {
  let mainProgram: CommanderStatic;
  const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;
  const DATA_DEMO = {
    description: ''
  };

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplateSpecificType(TEMP_DIR, PROJECT_NAME, 'Plugin');

    mainProgram = buildCommand(program);
    process.argv = OPTIONS;

    writeFileSync(`${CURRENT_DIR}/auth.json`, DECLARE_KINTONE);
    const config = readFileSync(`${CURRENT_DIR}/config.json`);
    Object.assign(config.uploadConfig, DATA_DEMO);
    writeFileSync(`${CURRENT_DIR}/config.json`, config, WRITE_FILE_OPTIONS);

    await mainProgram.parseAsync(process.argv);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('Should be "" when assign to ""', async () => {
    const config = readFileSync(`${CURRENT_DIR}/config.json`);
    const result = {
      description: config.uploadConfig.description
    };
    expect(result).toEqual(DATA_DEMO);
  });
});

describe('Info options: version', () => {
  let mainProgram: CommanderStatic;
  const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;
  const DATA_DEMO = {
    version: '1.0.0'
  };

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplateSpecificType(TEMP_DIR, PROJECT_NAME, 'Plugin');

    mainProgram = buildCommand(program);
    process.argv = OPTIONS;

    writeFileSync(`${CURRENT_DIR}/auth.json`, DECLARE_KINTONE);
    const config = readFileSync(`${CURRENT_DIR}/config.json`);
    Object.assign(config.uploadConfig, DATA_DEMO);
    writeFileSync(`${CURRENT_DIR}/config.json`, config, WRITE_FILE_OPTIONS);

    await mainProgram.parseAsync(process.argv);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('Should be "1.0.0" when assign to "1.0.0"', async () => {
    const config = readFileSync(`${CURRENT_DIR}/config.json`);
    const result = {
      version: config.uploadConfig.version
    };
    expect(result).toEqual(DATA_DEMO);
  });
});

describe('Info options: version empty', () => {
  let mainProgram: CommanderStatic;
  const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;
  const DATA_DEMO = {
    version: ''
  };

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplateSpecificType(TEMP_DIR, PROJECT_NAME, 'Plugin');

    mainProgram = buildCommand(program);
    process.argv = OPTIONS;

    writeFileSync(`${CURRENT_DIR}/auth.json`, DECLARE_KINTONE);
    const config = readFileSync(`${CURRENT_DIR}/config.json`);
    Object.assign(config.uploadConfig, DATA_DEMO);
    writeFileSync(`${CURRENT_DIR}/config.json`, config, WRITE_FILE_OPTIONS);

    await mainProgram.parseAsync(process.argv);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('Should be "" when assign to ""', async () => {
    const config = readFileSync(`${CURRENT_DIR}/config.json`);
    const result = {
      version: config.uploadConfig.version
    };
    expect(result).toEqual(DATA_DEMO);
  });
});
