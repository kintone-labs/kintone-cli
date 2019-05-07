import {spawnSync} from 'child_process'

const buildUsingWebpack = (option: object) => {
    spawnSync('npm',['run', `build-${option['appName']}`],{stdio: 'inherit'})
}

const buildVanillaJS = (option: object) => {

}

const builder = {
    buildUsingWebpack: buildUsingWebpack,
    buildVanillaJS: buildVanillaJS
}

export default builder
export {
    buildUsingWebpack,
    buildVanillaJS
}