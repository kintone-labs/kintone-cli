import { writeFileSync, readFileSync } from 'jsonfile';
import {
  mkdirSync,
  existsSync,
  writeFileSync as writeFileSyncFS,
  readFileSync as readFileSyncFS
} from 'fs';
import { buildWebpackReactTemplate } from './webpackTemplate';
import * as spawn from 'cross-spawn';

import { buildEslintRcTemplate } from './eslintRcTemplate';
import { generateSample } from './sampleCode';

import { AppOption, EslintRcParams, WebpackParams } from '../../dto/app';
import {
  PLUGIN_CONFIG_HTML_TEMPLATE,
  DECLARE_KINTONE,
  WRITE_FILE_OPTIONS,
  DEPENDENCIES,
  ERRORS
} from '../../constant';

const imageBase64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABVtJREFUeNrcm0tsG1UUhs+MZ/x2HLutKZQ+ojSpiqKItEWIR6SAhJC6aSPURaUuaiSgGyIQEosuYEUEC0RUWHTVdAcFiRIJUbFoE1F1UYgUhBKgSkrSFrWxUWM7tvFr7HDP9YwZz4wd2/E83F+6sWd8PTNfzrnn3Dl3zEAdHTm/eJy8HCNthLR9YC2tkDZD2tTsmb7vanViaoAh0KQFoerBhgnojPIDVgPuM/Iy3UFwIF7rtHjttS1IOqDVTkNn6yKxZFhlQZG+0+FQp+WWZGRjbhoeLb2EY1Ky4KRVrmow5IDeAN+OQ1EmRkwFl80GQ6gPXgzCYx4bXJm/D5/ejAPn6d7qYUc5Mc+Zqld63PDes2WYVE6ACzduQy6RodtbhDzGiUncNJ055Ifj/Z7K9jezd2BVhMs9/HurkCOsmflu9ICnCg7B0HpyIaSQjoPXzsKHw8Fmx+c+1sxg8taQv2rf+JUFzb4IebKfg+d2OeHdwx4o5bMNn4c1b9y5VPseiK6p1E6/C14b2E7f79/uhmx0uWFI0wCff9Kp2nd04AnNvmePDlTeL0aTsFEqNgxpGqCHV5/6xJG90BfyVe0b7gvB0O5AZXuJAKIaheTMAoykizTnyeV1cHDu5DMwd3eNgjy9J1gFh8LPJEmQzlAPsHantQD/ihdUgBIkWg2bUpgjcRIg12aQprno5Vvppr+DOVJL9dzVNMDfojlIZPIN90frfV0DsB6kaYBvPsVCgSRwQRAa6j/+wzyFrCctSFMAhx9naFtPpiASeQDJ5DoUi0XNvji7GftqFq4vRhs6thLS8CCz18dQ6/2byUAylQIM+gKBy2YzkCsx8O1CDHwk0GDSx0i6KKaFZiRBOnbsMRbQTc529hBxTeKW60n1hX/04xLMr6baci4KGVk21kURzmnbgLVYHEqljTK0y0XbhZv32wZnSpA51c9S94wROGm88TwH3f4umF5ag+9//0eX87JGBZVXdzNkzKUhly+nBpZlYFswCMtrGWo9vcQaEVTQetlcjgYVSQiXKZTgk6srkM4XOxMQg8o7gyzwIEA8kajs93f5gOc4ChdN5XX9B+sKiHBBxwaFkwcVj9sNl36N6BJUDANEtzwYYChcoSBUgkoXsd7PdxNwaW7VkOCmC+DhHf8HlWw2Vwkqwe5uuBPLwufX7xmWmlg9ggrOVJRBBeGyJJZ8QeD0DCq6AmJQeeMgAw6mqAoqdrudWg7TgpFqKyBaDi1os9nA5/XSfU6noxJUcOwZrZbnoliNxsIR1lZ6A2RynBRgl0uAHHHNQiFPoTAVcDwPCyRaGhVU2gKIBVisUcq1P2gnf+3gcrkpYCpVnkxjnvuY5Duz1LSLnhrwqeCU4nk7BALboMjadZ+ptBUQy+dYbm+4v9cHGfPYmgdEy2nVM2sCkhvX11/o7RxADCxN30lolP8sG2QGQ/aq7ckbt2HuXqwcZEI+GHv5gKYVOwIQV4PkwiKQfKlLqjhrQXaMi0rC8t25a7dU+7EwqyztbVbqsySgfBVWKWUVrNFyn+kuimsJ2NyMoFqFlTSkWCyhlr76Z2cApvIleP/aQ7DFa9/qvC0bfwg39uUvlnDRlWYg486dmqs48rU9Ca6Vom2btYKAM818g2FtqqUqeULHtHHi/E9WgEPNoItOQZPPqEmQ0hqA18nTwIPlduX6ncmakp5VW4YWHidpZq3cDPf8Y3y0R0oT4VaOoOWuFlK4kgfFJ2UnHiHICWI9Glva9kCshdz1IoELa85kxCdlO9mSE3I4lQVllhyBFh9KN8mSmMvDkltuCigDbelnBQZBrog5fIqA1fxZwX8CDABQJHv904sMOAAAAABJRU5ErkJggg==';

const spawnSync = spawn.sync;

function writeAuthJSONToFile(option) {
  const authJSON: any = {
    username: option.username,
    password: option.password,
    domain: option.domain
  };
  if (option.proxy) {
    authJSON.proxy = option.proxy;
  }
  writeFileSync(`${option.appName}/auth.json`, authJSON, WRITE_FILE_OPTIONS);
}

const ensurePropertyExists = (obj, property) => {
  if (!obj[property]) {
    obj[property] = {};
  }
};

function configureWebpack(option: AppOption, packageJSON, manifestJSON) {
  const babelJSON = {
    plugins: ['@babel/plugin-transform-class-properties'],
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: {
            version: 3,
            proposals: true
          }
        }
      ]
    ]
  };
  writeFileSync(`${option.appName}/.babelrc`, babelJSON, WRITE_FILE_OPTIONS);

  ensurePropertyExists(packageJSON, 'dependencies');
  ensurePropertyExists(packageJSON, 'devDependencies');
  const devDependencies = packageJSON.devDependencies;

  devDependencies.webpack = DEPENDENCIES.webpack;
  devDependencies['webpack-cli'] = DEPENDENCIES['webpack-cli'];
  devDependencies['babel-loader'] = DEPENDENCIES['babel-loader'];
  devDependencies['style-loader'] = DEPENDENCIES['style-loader'];
  devDependencies['css-loader'] = DEPENDENCIES['css-loader'];
  devDependencies['core-js'] = DEPENDENCIES['core-js'];
  devDependencies['regenerator-runtime'] = DEPENDENCIES['regenerator-runtime'];
  devDependencies['@babel/core'] = DEPENDENCIES['@babel/core'];
  devDependencies['@babel/preset-env'] = DEPENDENCIES['@babel/preset-env'];
  devDependencies['@babel/plugin-transform-class-properties'] =
    DEPENDENCIES['@babel/plugin-transform-class-properties'];

  ensurePropertyExists(packageJSON, 'scripts');
  const scripts = packageJSON.scripts;

  if (option.useTypescript) {
    devDependencies['@babel/preset-typescript'] =
      DEPENDENCIES['@babel/preset-typescript'];
  }
  if (option.useReact) {
    devDependencies['@babel/preset-react'] =
      DEPENDENCIES['@babel/preset-react'];
  }

  scripts[
    `build-${option.appName}`
  ] = `webpack --config ${option.appName}/webpack.config.js --mode production`;

  writeFileSync(`package.json`, packageJSON, WRITE_FILE_OPTIONS);

  const webpackTemplate = buildWebpackReactTemplate(option as WebpackParams);
  writeFileSyncFS(`${option.appName}/webpack.config.js`, webpackTemplate);
  spawnSync(
    'npx',
    [
      'prettier',
      '--write',
      `${option.appName}/webpack.config.js`,
      '--single-quote'
    ],
    { stdio: 'inherit', windowsHide: true }
  );

  manifestJSON.uploadConfig = {
    desktop: {
      js: [`${manifestJSON.appName}/dist/${manifestJSON.appName}.min.js`],
      css: []
    },
    mobile: {
      js: [`${manifestJSON.appName}/dist/${manifestJSON.appName}.min.js`]
    }
  };
}

function configureNotWebpack(option: AppOption, manifestJSON) {
  let extension = 'js';
  if (option.useTypescript) {
    extension = 'ts';
  }
  writeFileSyncFS(
    `${option.appName}/source/js/script.${extension}`,
    generateSample(option)
  );
  spawnSync(
    'npx',
    [
      'prettier',
      '--write',
      `${option.appName}/source/js/script.${extension}`,
      '--single-quote'
    ],
    { stdio: 'inherit', windowsHide: true }
  );
  writeFileSyncFS(`${option.appName}/source/css/style.css`, '');
  manifestJSON.uploadConfig = {
    desktop: {
      js: [`${option.appName}/source/js/script.js`],
      css: [`${option.appName}/source/css/style.css`]
    },
    mobile: {
      js: []
    }
  };
}

const createTsConfigJSON = (option: AppOption) => {
  const tsConfigJSON = {
    compilerOptions: {
      typeRoots: ['../node_modules/@types'],
      noImplicitAny: false
    },
    include: ['source/**/*.ts', 'source/**/*.tsx']
  } as any;

  if (option.useReact) {
    tsConfigJSON.compilerOptions.jsx = 'react';
  }

  return tsConfigJSON;
};

function configureTypescript(option: AppOption, packageJSON) {
  ensurePropertyExists(packageJSON, 'devDependencies');
  const devDependencies = packageJSON.devDependencies;

  devDependencies.typescript = DEPENDENCIES.typescript;
  if (option.useReact) {
    devDependencies['@types/react'] = DEPENDENCIES['@types/react'];
    devDependencies['@types/react-dom'] = DEPENDENCIES['@types/react-dom'];
  }

  const tsConfigJSON = createTsConfigJSON(option);

  writeFileSync(`package.json`, packageJSON, WRITE_FILE_OPTIONS);
  const globalDeclarationFile = option.useReact
    ? 'global.d.tsx'
    : 'global.d.ts';

  writeFileSyncFS(
    `${option.appName}/source/${globalDeclarationFile}`,
    DECLARE_KINTONE
  );
  const typeRootsPath = `./source/${globalDeclarationFile}`;
  tsConfigJSON.compilerOptions.typeRoots.push(typeRootsPath);

  writeFileSync(
    `${option.appName}/tsconfig.json`,
    tsConfigJSON,
    WRITE_FILE_OPTIONS
  );

  if (!option.useWebpack)
    packageJSON.scripts[
      `build-${option.appName}`
    ] = `./node_modules/.bin/tsc --build ./${option.appName}/tsconfig.json`;
}

function getLintedExtension(option: AppOption) {
  let lintedExtension = '';
  if (option.useReact && option.useTypescript) {
    lintedExtension = '.tsx';
  } else if (option.useReact) {
    lintedExtension = '.jsx';
  } else if (option.useTypescript) {
    lintedExtension = '.ts';
  } else {
    lintedExtension = '.js';
  }
  return lintedExtension;
}

function configureCybozuLint(option: AppOption, packageJSON) {
  const lintedExtension = getLintedExtension(option);

  // add scripts to packageJSON for linting
  ensurePropertyExists(packageJSON, 'scripts');
  ensurePropertyExists(packageJSON.scripts, 'lint-all');
  ensurePropertyExists(packageJSON.scripts, 'lint-all-fix');

  const scripts = packageJSON.scripts;
  const appName = option.appName;
  scripts['lint-all'] = 'eslint . --ext .js,.jsx,.ts,.tsx';
  scripts['lint-all-fix'] = 'eslint . --ext .js,.jsx,.ts,.tsx --fix';
  scripts[`lint-${appName}`] = `eslint ${appName}/ --ext ${lintedExtension}`;
  scripts[
    `lint-${appName}-fix`
  ] = `eslint ${appName}/ --ext ${lintedExtension} --fix`;

  ensureDevDependenciesCybozuLint(packageJSON);
  createEslintRcFile(option, appName);
}

function ensureDevDependenciesCybozuLint(packageJSON) {
  ensurePropertyExists(packageJSON, 'devDependencies');
  const devDependencies = packageJSON.devDependencies;
  devDependencies.eslint = DEPENDENCIES.eslint;
  devDependencies['@cybozu/eslint-config'] =
    DEPENDENCIES['@cybozu/eslint-config'];
  writeFileSync(`package.json`, packageJSON, { spaces: 2, EOL: '\r\n' });
}

function createEslintRcFile(option: AppOption, appName) {
  const eslintRcTemplate = buildEslintRcTemplate(option as EslintRcParams);
  writeFileSyncFS(`${appName}/.eslintrc.js`, eslintRcTemplate);
  spawnSync(
    'npx',
    ['prettier', '--write', `${appName}/.eslintrc.js`, '--single-quote'],
    {
      stdio: 'inherit'
    }
  );
}

function configureReact(packageJSON) {
  ensurePropertyExists(packageJSON, 'dependencies');
  packageJSON.dependencies.react = DEPENDENCIES.react;
  packageJSON.dependencies['react-dom'] = DEPENDENCIES['react-dom'];
  writeFileSync(`package.json`, packageJSON, WRITE_FILE_OPTIONS);
}

function ensureDevDependenciesPlugin(packageJSON) {
  ensurePropertyExists(packageJSON, 'devDependencies');
  const devDependencies = packageJSON.devDependencies;
  devDependencies['@kintone/plugin-packer'] =
    DEPENDENCIES['@kintone/plugin-packer'];
  devDependencies['@kintone/plugin-uploader'] =
    DEPENDENCIES['@kintone/plugin-uploader'];
  writeFileSync(`package.json`, packageJSON, WRITE_FILE_OPTIONS);
}

function configurePlugin(option: AppOption, packageJSON, manifestJSON) {
  ensureDevDependenciesPlugin(packageJSON);
  manifestJSON.uploadConfig.icon = `${option.appName}/icon.png`;
  const extension = getExtension(option);
  writeFileSyncFS(`${option.appName}/pluginConfig.html`, '');
  writeFileSyncFS(
    `${option.appName}/icon.png`,
    Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ''), 'base64')
  );
  writeFileSyncFS(`${option.appName}/source/js/config.${extension}`, '');
  writeFileSyncFS(`${option.appName}/source/css/config.css`, '');
  writeFileSyncFS(
    `${option.appName}/pluginConfig.html`,
    PLUGIN_CONFIG_HTML_TEMPLATE
  );

  configureUploadConfig(option, manifestJSON);
}

function getExtension(option: AppOption) {
  let extension = option.useTypescript ? 'ts' : 'js';
  if (option.useReact) {
    extension += 'x';
  }
  return extension;
}

function configureUploadConfig(option: AppOption, manifestJSON) {
  const uploadConfig = manifestJSON.uploadConfig;
  uploadConfig.config = {
    html: `${option.appName}/pluginConfig.html`,
    js: [`${manifestJSON.appName}/source/js/config.js`],
    css: [`${manifestJSON.appName}/source/css/config.css`],
    required_params: []
  };

  const isReactOrTypescriptWithWebpack =
    option.useReact || (option.useTypescript && option.useWebpack);

  if (isReactOrTypescriptWithWebpack) {
    uploadConfig.config.js = [`${manifestJSON.appName}/dist/config.min.js`];
  }
}

function configureGitIgnore(option: AppOption) {
  let gitIgnoreContent = readFileSyncFS('.gitignore').toString();
  gitIgnoreContent += `\n${option.appName}/auth.json`;
  writeFileSyncFS('.gitignore', gitIgnoreContent);
}

function configureEntry(option: AppOption) {
  writeFileSyncFS(
    `${option.appName}/source/${option.entry}`,
    generateSample(option)
  );
  spawnSync(
    'npx',
    [
      'prettier',
      '--write',
      `${option.appName}/source/${option.entry}`,
      '--single-quote'
    ],
    { stdio: 'inherit', windowsHide: true }
  );
}

const generateAppFolder = (option: AppOption): string | boolean => {
  if (!existsSync('package.json')) {
    return ERRORS.PACKAGE_JSON_NOT_FOUND;
  }
  const packageJSON = readFileSync('package.json');
  const manifestJSON: any = {};

  if (option.appID) {
    manifestJSON.appID = option.appID;
  }

  manifestJSON.appName = option.appName;
  manifestJSON.type = option.type;
  manifestJSON.scope = option.scope;

  if (existsSync(option.appName)) {
    return ERRORS.APP_FOLDER_EXISTED;
  }

  mkdirSync(option.appName);
  mkdirSync(`${option.appName}/source`);
  mkdirSync(`${option.appName}/source/js`);
  mkdirSync(`${option.appName}/source/css`);

  if (option.setAuth) {
    writeAuthJSONToFile(option);
  }

  if (option.useWebpack || option.type === 'Plugin') {
    mkdirSync(`${option.appName}/dist`);
  }

  if (option.useWebpack) {
    configureWebpack(option, packageJSON, manifestJSON);
  } else {
    configureNotWebpack(option, manifestJSON);
  }

  if (option.useTypescript) {
    configureTypescript(option, packageJSON);
  }

  if (option.type === 'Plugin') {
    configurePlugin(option, packageJSON, manifestJSON);
  } else {
    packageJSON.devDependencies['@kintone/customize-uploader'] =
      DEPENDENCIES['@kintone/customize-uploader'];
    writeFileSync(`package.json`, packageJSON, WRITE_FILE_OPTIONS);
  }

  if (option.useReact) {
    configureReact(packageJSON);
  }

  if (option.useCybozuLint) {
    configureCybozuLint(option, packageJSON);
  }

  writeFileSync(
    `${option.appName}/config.json`,
    manifestJSON,
    WRITE_FILE_OPTIONS
  );

  if (option.entry) {
    configureEntry(option);
  }

  if (existsSync('.gitignore')) {
    configureGitIgnore(option);
  }

  return false;
};

export default {
  generateAppFolder
};
export { generateAppFolder, getLintedExtension, configureCybozuLint };
