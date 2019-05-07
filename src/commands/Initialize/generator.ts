import {writeFileSync, readFileSync} from 'jsonfile'
import {mkdirSync, existsSync, writeFileSync as writeFileSyncFS} from 'fs'
import {buildWebpackReactTemplate} from './webpackTemplate'
import {WebpackParams} from '../../dto/app'
import {spawnSync} from 'child_process'
import {AppOption} from '../../dto/app'

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

    if (existsSync(option['appName'])) {
        return 'App folder existed'
    }

    mkdirSync(option['appName']);

    if (option['setAuth']) {
        let authJSON = {
            username: option['username'],
            password: option['password'],
            domain: option['domain']
        }

        writeFileSync(`${option['appName']}/auth.json`,authJSON,{spaces: 4, EOL: "\r\n"})
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
        spawnSync('npx',['prettier', '--write', `${option['appName']}/webpack.config.js`], {stdio: 'inherit', windowsHide: true})

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
        manifestJSON['uploadConfig'] = {
            desktop: {
                js: [],
                css:[]
            },
            mobile: {
                js: []
            }
        }
    }

    if (option['useTypescript']) {
        if (!packageJSON.devDependencies) {
            packageJSON.devDependencies = {}
        }
        packageJSON.devDependencies.typescript = "^2.3.3"
        packageJSON.devDependencies.tsc = "^1.20150623.0"
        writeFileSync(`package.json`,packageJSON,{spaces: 4, EOL: "\r\n"})
    }

    if (option['useReact']) {
        if (!packageJSON.dependencies) {
            packageJSON.dependencies = {}
        }
        packageJSON.dependencies.react = "^16.8.6"
        packageJSON.dependencies['react-dom'] = "^16.7.0"
        writeFileSync(`package.json`,packageJSON,{spaces: 4, EOL: "\r\n"})
    }

    mkdirSync(`${option['appName']}/source`)
    mkdirSync(`${option['appName']}/source/js`)
    mkdirSync(`${option['appName']}/source/css`)
    mkdirSync(`${option['appName']}/dist`)
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