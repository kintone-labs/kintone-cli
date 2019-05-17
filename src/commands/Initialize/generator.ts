import {writeFileSync, readFileSync} from 'jsonfile'
import {mkdirSync, existsSync, writeFileSync as writeFileSyncFS} from 'fs'
import {buildWebpackReactTemplate} from './webpackTemplate'
import {spawnSync} from 'child_process'
import {AppOption, EslintRcParams, WebpackParams} from '../../dto/app'
import {buildEslintRcTemplate} from './eslintRcTemplate'

const generateAppFolder = (option: AppOption): string | boolean => {
    if (!existsSync('package.json')) {
        return 'Project not initialized'
    }
    let packageJSON = readFileSync('package.json')
    let manifestJSON = {}

    if (option['appID']) {
        manifestJSON['appID'] = option['appID']
    }

    if (option['pluginName']) {
        manifestJSON['pluginName'] = option['pluginName']
    }

    manifestJSON['appName'] = option['appName']
    manifestJSON['type'] = option['type']
    manifestJSON['scope'] = option['scope']

    if (existsSync(option['appName'])) {
        return 'App folder existed'
    }

    mkdirSync(option['appName']);
    mkdirSync(`${option['appName']}/source`)
    mkdirSync(`${option['appName']}/source/js`)
    mkdirSync(`${option['appName']}/source/css`)
    
    if (option['setAuth']) {
        let authJSON = {
            username: option['username'],
            password: option['password'],
            domain: option['domain']
        }
        if(option['proxy']) {
            authJSON['proxy'] = option['proxy']
        }
        writeFileSync(`${option['appName']}/auth.json`,authJSON,{spaces: 4, EOL: "\r\n"})
    }

    if (option['useWebpack'] || option['type'] === 'Plugin') {
        mkdirSync(`${option['appName']}/dist`)
    }

    if (option['useWebpack']) {
        let babelJSON = {
            plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-syntax-dynamic-import"
            ]
        }

        writeFileSync(`${option['appName']}/.babelrc`,babelJSON,{spaces: 4, EOL: "\r\n"})

        if (!packageJSON.dependencies) {
            packageJSON.dependencies = {}
        }
        packageJSON.dependencies['@kintone/customize-uploader'] = "^1.5.3"

        if (!packageJSON.devDependencies) {
            packageJSON.devDependencies = {}
        }
        packageJSON.devDependencies.webpack = "^4.30.0"
        packageJSON.devDependencies['webpack-cli'] = "^3.2.3"
        packageJSON.devDependencies['babel-loader'] = "^8.0.5"
        packageJSON.devDependencies['style-loader'] = "^0.23.1"
        packageJSON.devDependencies['css-loader'] = "^2.1.0"
        packageJSON.devDependencies["@babel/core"] = "^7.3.3"
        packageJSON.devDependencies["@babel/preset-env"] = "^7.3.1"
        packageJSON.devDependencies["@babel/plugin-proposal-class-properties"] = "^7.3.3"
        packageJSON.devDependencies["@babel/plugin-syntax-dynamic-import"] = "^7.2.0"

        if (!packageJSON.scripts) {
            packageJSON.scripts = {}
        }

        if (option['useTypescript']) {
            packageJSON.devDependencies["@babel/preset-typescript"] = "^7.3.3"
        }
        if (option['useReact']) {
            packageJSON.devDependencies["@babel/preset-react"] = "^7.0.0"
            
        }
        packageJSON.scripts[`build-${option['appName']}`] = `webpack --config ${option['appName']}/webpack.config.js`

        writeFileSync(`package.json`,packageJSON,{spaces: 4, EOL: "\r\n"})

        let webpackTemplate = buildWebpackReactTemplate(option as WebpackParams)
        writeFileSyncFS(`${option['appName']}/webpack.config.js`, webpackTemplate)
        spawnSync('npx',['prettier', '--write', `${option['appName']}/webpack.config.js`, '--single-quote'], {stdio: 'inherit', windowsHide: true})

        manifestJSON['uploadConfig'] = {
            desktop: {
                js: [
                    `${manifestJSON['appName']}/dist/${manifestJSON['appName']}.min.js`
                ],
                css:[]
            },
            mobile: {
                js: [
                    `${manifestJSON['appName']}/dist/${manifestJSON['appName']}.min.js`
                ]
            }
        }
    }
    else {
        writeFileSyncFS(`${option['appName']}/source/js/script.js`, '')
        writeFileSyncFS(`${option['appName']}/source/css/style.css`, '')
        manifestJSON['uploadConfig'] = {
            desktop: {
                js: [
                    `${option['appName']}/source/js/script.js`
                ],
                css:[
                    `${option['appName']}/source/css/style.css`
                ]
            },
            mobile: {
                js: []
            },
            config: {
                html: `${option['appName']}/config.html`
            }
        }
    }

    if (option['useTypescript']) {
        if (!packageJSON.devDependencies) {
            packageJSON.devDependencies = {}
        }
        packageJSON.devDependencies.typescript = "^2.3.3"
        packageJSON.devDependencies.tsc = "^1.20150623.0"

        if (option['useReact']) {
            packageJSON.devDependencies['@types/react'] = "^16.8.16"
            packageJSON.devDependencies["@types/react-dom"] = "^16.8.4"
        }

        const tsConfigJSON = {
            "compilerOptions": {
                "typeRoots": ["./source","../node_modules/@types"]
            },
            "include": [
                "source/**/*.ts"
            ]
        }

        writeFileSync(`package.json`,packageJSON, {spaces: 4, EOL: "\r\n"})
        writeFileSyncFS(`${option['appName']}/source/global.d.ts`, 'declare let kintone: any')
        writeFileSync(`${option['appName']}/tsconfig.json`, tsConfigJSON, {spaces: 4, EOL: "\r\n"})
    }

    if (option['type'] === 'Plugin') {
        if (!packageJSON.devDependencies) {
            packageJSON.devDependencies = {}
        }
        packageJSON.devDependencies['@kintone/plugin-packer'] = "^1.0.8"
        packageJSON.devDependencies['@kintone/plugin-uploader'] = "^2.4.8"
        writeFileSync(`package.json`,packageJSON,{spaces: 4, EOL: "\r\n"})
        writeFileSyncFS(`${option['appName']}/config.html`, '')
    }

    if (option['useReact']) {
        if (!packageJSON.dependencies) {
            packageJSON.dependencies = {}
        }
        packageJSON.dependencies.react = "^16.8.6"
        packageJSON.dependencies['react-dom'] = "^16.7.0"
        writeFileSync(`package.json`,packageJSON,{spaces: 4, EOL: "\r\n"})
    }

    if(option['useCybozuLint']) {
        let lintedExtension = ''
        if(option['useReact'] && option['useTypescript']) {
            lintedExtension = '.tsx'
        } else if(option['useReact']) {
            lintedExtension = '.jsx'
        } else if(option['useTypescript']) {
            lintedExtension = '.ts'
        } else {
            lintedExtension = '.js'
        }

        // add scripts to packageJSON for linting
        if(!packageJSON.scripts) {
            packageJSON.scripts = {}
        }
        if(!packageJSON.scripts['lint-all']) {
            packageJSON.scripts['lint-all'] = ''
        }
        if(!packageJSON.scripts['lint-all-fix']) {
            packageJSON.scripts['lint-all-fix'] = ''
        }
        packageJSON.scripts['lint-all'] = 'eslint . --ext .js,.jsx,.ts,.tsx'
        packageJSON.scripts['lint-all-fix'] = 'eslint . --ext .js,.jsx,.ts,.tsx --fix'
        packageJSON.scripts[`lint-${option['appName']}`] = `eslint ${option['appName']}/ --ext ${lintedExtension}`
        packageJSON.scripts[`lint-${option['appName']}-fix`] = `eslint ${option['appName']}/ --ext ${lintedExtension} --fix`

        // add eslint and @cybozu/eslint-config to dependencies
        if (!packageJSON.dependencies) {
            packageJSON.dependencies = {}
        }
        packageJSON.dependencies['eslint'] = '^5.16.0'
        packageJSON.dependencies['@cybozu/eslint-config'] = '^4.0.1'
        writeFileSync(`package.json`,packageJSON,{spaces:2, EOL: "\r\n"})

        // create .eslintrc.js file according to customization structure
        let eslintRcTemplete = buildEslintRcTemplate(option as EslintRcParams)
        writeFileSyncFS(`${option['appName']}/.eslintrc.js`, eslintRcTemplete)
        spawnSync('npx',['prettier', '--write', `${option['appName']}/.eslintrc.js`], {stdio: 'inherit'})
    }

    writeFileSync(`${option['appName']}/config.json`,manifestJSON,{spaces: 4, EOL: "\r\n"})
    if (option['entry']) {
        writeFileSyncFS(`${option['appName']}/source/${option['entry']}`, '')
    }

    return false
}
export default {
    generateAppFolder
}
export {
    generateAppFolder
}