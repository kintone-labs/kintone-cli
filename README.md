# kintone CLI(β)
A tool to quickly start developing with kintone
```
ⓘ This tool has been migrated from git://github.com/kintone/kintone-cli
```

> [!WARNING]
> The maintenance of kintone CLI will end on 31 December 2024. For more details, please refer to [this announcement](https://github.com/kintone-labs/kintone-cli/issues/206).

## Installation
```
npm install -g https://github.com/kintone-labs/kintone-cli.git
or
yarn global add https://github.com/kintone-labs/kintone-cli.git
```
Sometimes depending on the npm version, the error message "command not found" will be displayed.
In that case, please try with the `yarn` command instead.

## Quickstart
To quickly start with a minimum project, follow the instruction [here](./quickstart.md)

## Usage
When working with kintone, developers usually follow this flow:
1. Initialize Project
2. Create Template
3. Start dev locally
4. Build source code
5. Deploy to kintone

### 1. Initialize Project
```
kintone-cli init [--install] [--quick] [--project-name <projectName>]
```
Kintone CLI will require following input information. If any piece of info is skipped default value will be auto assigned:
- Project name
- Project version
- Project description
- Project author
- Project license
- Optional dependencies:
    -   @kintone/rest-api-client (y/n)
    -   @kintone/kintone-ui-component (y/n)

After all the above info is inputted, cli will initialize the following folder structure:
```
<Project Name>
    ├── package.json
    └── .gitignore
```

If --install flag is specified, Kintone CLI will run npm install after initializing folder structure.

If --quick flag is specified, Kintone CLI will init a project with the following default parameter:
```
--project-name: 'kintone-customization-project'
```
In addition, this boolean option will be set to ``true``:
```
--install
```

Ask if user wants to create-template after finishing init project.

### 2. Create customization / plugin template
Go to the project forder.
```
cd {project name}
```
Create a JS customization or a plugin project structure under the project folder.
```
kintone-cli create-template
    [--quick]
    [--preset React|ReactTS]
    [--set-auth]
    [--domain <domain>]
    [--username <username>]
    [--password <password>]
    [--type Customization|Plugin]
    [--scope ALL|ADMIN|NONE]
    [--use-typescript]
    [--use-webpack]
    [--use-react]
    [--use-cybozu-lint]
    [--app-name <appName>]
    [--app-id <App ID (for Customization) >]
```

The --scope flag is for setting the scope of customization; therefore, setting the value of --scope when creating a plugin template will have no effect on the app.

If the flag --quick is present, CLI will set default values for the following options:
```
--type: 'Customization'
--app-name: `kintone-${Date.now()}`
--scope: 'ALL'
```

In addition, the below boolean options will be set to ``false``:
```
--set-auth
--use-typescript
--use-webpack
--use-cybozu-lint
--use-react
```

You can override some options even when the --quick flag is present:
```
--type
--app-name
--scope
```
Below is an example of overriding some of the --quick default values:
```
kintone-cli create-template --quick --app-name Sample-App --scope ADMIN
```

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
- If selecting 'Customization', configure kintone App ID

After the above information is inputted, the following folder structure will be created:
```
<Customization|Plugin Name>
    ├── source
    │   ├── js
    │   │   ├── script.js
    │   │   └── config.js   // this file is created only when developing Plugin
    │   └── css
    │       ├── style.css
    │       └── config.css  // this file is created only when developing Plugin
    ├── dist                // this folder is created only when using webpack
    ├── pluginConfig.html   // this file is created only when developing Plugin
    ├── icon.png            // this file is created only when developing Plugin
    ├── config.json
    ├── auth.json
    ├── tsconfig.json       // if using TypeScript
    ├── .eslintrc.js        // if using ESLint
    └── webpack.config.js   // if using webpack
```

Sample `config.json` file:
```json
{
    "appID": YOUR_APP_ID,
    "appName": "YOUR_APP_NAME",
    "type": "Plugin",
    "uploadConfig": {
        "desktop": {
            "js": [
                "{YOUR_APP_NAME}/{PATH_TO_YOUR_JS_FILE}"
            ],
            "css": [
                "{YOUR_APP_NAME}/{PATH_TO_YOUR_CSS_FILE}"
            ]
        },
        "mobile": {
            "js": [
                "{YOUR_APP_NAME}/{PATH_TO_YOUR_JS_FILE_FOR_MOBILE}"
            ],
            "css": [
                "{YOUR_APP_NAME}/{PATH_TO_YOUR_CSS_FILE_FOR_MOBILE}"
            ]
        },
        // In case of Plugin
        "config": {
            "html": "{YOUR_APP_NAME}/{PATH_TO_YOUR_CONFIG_HTML}",
            "js": "{YOUR_APP_NAME}/{PATH_TO_YOUR_CONFIG_JS}"
        },
        "icon": "{YOUR_APP_NAME}/{PATH_TO_YOUR_ICON}",
        "version": "{PLUGIN_VERSION}"// Plugin version number (integer) e.g. "version": 1
    }
}
```

#### Config.json fields

| Field   | Required | Type    | Description                    |
|---------|---------|---------|--------------------------------|
| appName | Yes     | String  | Customization / Plugin name    |
| appID   | Customization only        | Integer | App ID to deploy Customization |
| type    | Yes        | String  | App's type: <ul><li>Customization</li><li>Plugin</li></ul> |
| scope | Customization only     | String  | Customization scope<ul><li>ALL: Affect all users</li><li>ADMIN: Affect only App administrators</li><li>NONE: Disable</li></ul>    |
| uploadConfig | Yes     | Object  | Config for `build`, `deploy` command    |
| uploadConfig.desktop | Yes     | Object  | Config for kintone desktop    |
| uploadConfig.desktop.js | Yes     | Array&lt;String&gt;  | JS files / URLs to upload to kintone desktop.    |
| uploadConfig.desktop.css | Yes     | Array&lt;String&gt;  | CSS files / URLs to upload to kintone desktop.    |
| uploadConfig.mobile |      | Object  | Config for kintone mobile    |
| uploadConfig.mobile.js |      | Array&lt;String&gt;  | JS files / URLs to upload to kintone mobile.    |
| uploadConfig.mobile.css |      | Array&lt;String&gt;  | CSS files / URLs to upload to kintone mobile.    |
| uploadConfig.config | Plugin only     | Object  | Config for kintone plugin's config page |
| uploadConfig.config.html |      | String  | HTML for kintone plugin's config page |
| uploadConfig.config.js |      | Array&lt;String&gt;  | 	JS files / URLs for kintone plugin's config page |
| uploadConfig.config.css |      | Array&lt;String&gt;  | CSS files / URLs for kintone plugin's config page |
| uploadConfig.config.required_params |      | Array&lt;String&gt;  | An array of parameters that are required to be filled in in the Plug-in Settings page. Must be between 1 to 64 ASCII characters. |
| uploadConfig.icon | Plugin only     | String  | Plugin's icon |
| uploadConfig.version | Plugin only     | String or Integer  | Plugin's version |

### 3. Start dev
``
kintone-cli dev [--app-name <App Name>] [--watch] [--localhost]
``

Deploy customization files|plugin in <App Name> to test domains for debugging.
Using local web server to serve js/css files directly from project source files.

If --watch flag is specified and customization|plugin uses webpack, each time a source file is changed it is automatically built.
Please note that html file and img file for icon are not changed automatically. Only js/css files are changed.

The --localhost parameter:
+ The last IP on the list will be chosen if there is no `https://127.0.0.1:8000`.
+ Don't specify `--localhost` parameter if you want to display the IP list for choosing.

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

## Contributing

We welcome contributions to kintone-cli.
If you have a question, feature request, or bug report, please register [GitHub issue](https://github.com/kintone-labs/kintone-cli/issues/new/choose). Pull requests are also welcome when you find trivial bugs, typos or feature requests.

## License
MIT License

## Copyright
Copyright(c) Cybozu, Inc.
