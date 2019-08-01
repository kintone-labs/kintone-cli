# Kintone CLI
A tool to quickly start developing with kintone
## Installation
``
npm install -g git://github.dev.cybozu.co.jp/SC/kintone-cli.git
``
## Quickstart
To quickly start with a minimum project, follow the instruction [here](./quickstart.md)
## Usage
When working with kintone, developers usually follow this flow:
1. Initialize Project
2. Create Template
3. Start dev locallly
4. Build source code
5. Deploy to kintone

### 1. Initialize Project
``
kintone-cli init [--install] [--quick] [--project-name <projectName>]
``
Kintone CLI will require following input information. If any piece of info is skipped default value will be auto assigned:
- Project name
- Project version
- Project description
- Project author
- Project license
- Optional dependencies:
    -   @kintone/kintone-js-sdk (y/n)
    -   @kintone/kintone-ui-component (y/n)

After all the above info is inputted, cli will initialize the following folder structure:
- Project-Name
    - package.json

If --install flag is specified, Kintone CLI will run npm install after initializing folder structure

If --quick flag is specified, Kintone CLI will init a project with default parameters.

Ask if user wants to create-template after finishing init project.
### 2. Create customization / plugin template
```
kintone-cli create-template
    [--quick]
    [--preset React|ReactTS]
    [--set-auth]
    [--domain <domain>]
    [--username <username>]
    [--password <password>]
    [--type Customization|Plugin]
    [--use-typescript]
    [--use-react]
    [--appID <App ID (for Customization) >]
```

Create a JS customization|plugin folder structure in project folder.

If the flag --quick existed, CLI will use all default variable for other flags. You can override some by setting its flag like:
``
kintone-cli create-template --quick --type Plugin
``

If value is set for flag --preset, CLI will use preset variable to create folder. If both flag --preset and --quick is set, the config will be merge from both --quick config and --preset config. 

Current supported preset:
- React
- ReactTS

CLI will require following input information. If any piece of info is skipped default value will be auto assigned:
- Type: customization or plugin
- Name
- If --set-auth flag was specified, input Authentication settings:
    - Domain
    - Username
    - Password
    - Proxy
- Using typescript (y/n)
- Using React (y/n)
- If using React, ask if using Webpack (y/n)
- If using Webpack, config webpack:
    - Entry
- Use ESLint (y/n)

After the above information is inputted, the following folder structure will be created:
- <Customization|Plugin Name>
    - source 
        - js
        - css
    - dist
    - config.json
    - auth.json
    - webpack.config.js (if using webpack)

### 3. Start dev
``
kintone-cli dev [--app-name <App Name>] [--watch]
``

Deploy customization files|plugin in <App Name> to test domains for debugging.
Using local web server to serve js/css files directly from project source files.

If --watch flag is specified and customization|plugin uses webpack, each time a source file is changed it is automatically built.

### 4. Build source code
``
kintone-cli build [--app-name <App Name>]
``

If a customization|plugin folder contains a webpack.config.js, cli will build by using their webpack.config.js file first.

If a folder is also a plugin folder, CLI will generate manifest.json based on config.json, then package source files into a plugin .zip file according to manifest.json

### 5. Deploy to kintone
``
kintone-cli deploy [--app-name <App Name>]
``

Customizations|plugins will be deployed using their config.json and auth.json file.

## Other functions
### 1. Lint code
Check/fix code (using ＠cybozu/eslint-config)
``
kintone-cli lint [--app-name <App Name>] [--fix]
``

Result: 
- {File name} ( {File Path} ):
    - {Error 1}:
        - Line {Line Number 1}
        - Line {Line Number 2}
    - {Error 2}:
        - Line {Line Number 1}
        - Line {Line Number 2}

If --fix flag is specified, cli will also attempt to fix all auto-fixable problems in source code
### 2. Import / export data (WIP)
### 3. Auth

```
kintone-cli auth
    [--app-name <appName>]
    [--domain <domain>]
    [--username <username>]
    [--password <password>]
    [--app-id <appID>]
    [--use-proxy]
    [--proxy <proxyURL>]
```

Save authentication credentials into ``auth.json`` file.

Flag --app-name, --domain, --username, --password is required. 

Flag --proxy is required when the flag --use-proxy is set.

## License
MIT License

## Copyright
Copyright(c) Cybozu, Inc.
