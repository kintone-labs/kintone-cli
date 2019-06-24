import * as spawn from "cross-spawn"
import {writeFileSync, readFileSync} from 'jsonfile'
import { unlinkSync, existsSync, mkdirSync } from 'fs';

const spawnSync = spawn.sync

const deployCustomization = (option: object) => {
    let customizeManifestJSON = {
        app: option['appID'],
        scope: option['scope'],
        desktop: option['uploadConfig']['desktop'],
        mobile: option['uploadConfig']['mobile']
    }
    let paramArr = [`${option['appName']}/dist/customize-manifest.json`]

    let authJSON = readFileSync(`${option['appName']}/auth.json`)
    if (authJSON.domain) {
        paramArr.push('--domain')
        paramArr.push(authJSON.domain)
    }
    if (authJSON.username) {
        paramArr.push('--username')
        paramArr.push(authJSON.username)
        paramArr.push('--basic-auth-username')
        paramArr.push(authJSON.username)
    }
    if (authJSON.password) {
        paramArr.push('--password')
        paramArr.push(authJSON.password)
        paramArr.push('--basic-auth-password')
        paramArr.push(authJSON.password)
    }
    if(authJSON.proxy) {
        paramArr.push('--proxy')
        paramArr.push(authJSON.proxy)
    }

    if (!existsSync(`${option['appName']}/dist`)) {
        mkdirSync(`${option['appName']}/dist`)
    }

    if (existsSync(`${option['appName']}/webpack.config.js`)) {
        spawnSync('npm', ['run',`build-${option['appName']}`, '--', '--mode', 'production'], {stdio:['ignore', 'ignore', process.stderr]})
    }

    writeFileSync(`${option['appName']}/dist/customize-manifest.json`,customizeManifestJSON, { spaces: 2, EOL: '\r\n' })
    spawnSync(
        './node_modules/.bin/kintone-customize-uploader',
        paramArr,
        {
            stdio: 'inherit'
        }
    )
    unlinkSync(`${option['appName']}/dist/customize-manifest.json`)
}

const deployPlugin = (option: object) => {
    let authJSON = readFileSync(`${option['appName']}/auth.json`)
    spawnSync(
        './node_modules/.bin/kintone-plugin-uploader',
        [
            '--domain', authJSON['domain'],
            '--username', authJSON['username'],
            '--password', authJSON['password'],
            `${option['appName']}/dist/plugin.zip`
        ],
        {
            stdio: 'inherit'
        }
    )
}

export {
    deployCustomization,
    deployPlugin
}