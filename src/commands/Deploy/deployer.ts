import {writeFileSync, readFileSync} from 'jsonfile'
import { unlinkSync } from 'fs';
import {spawnSync} from 'child_process'

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

}

export {
    deployCustomization,
    deployPlugin
}