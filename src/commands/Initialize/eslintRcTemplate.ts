import {EslintRcParams} from '../../dto/app'

const buildEslintRcTemplate = ({useTypescript, useWebpack, useReact}:EslintRcParams):string => {
    const env = useTypescript || useWebpack || useReact ? 'es2017' : 'es6';
    const eslintRules = ["@cybozu/eslint-config/lib/kintone.js", "@cybozu/eslint-config/globals/kintone.js"];
    if(useTypescript && useReact) {
        eslintRules.push('@cybozu/eslint-config/presets/react-typescript')
    } else if(useTypescript) {
        eslintRules.push('@cybozu/eslint-config/presets/typescript')
    } else if(useReact) {
        eslintRules.push('@cybozu/eslint-config/presets/react')
    }

    let eslintRulesToString = '["' + eslintRules.join('", "') + '"]';
    return `module.exports = {
        env: {
            ${env}: true
        },
            extends: ${eslintRulesToString},
        }`
}
export default {
    buildEslintRcTemplate
}
export {
    buildEslintRcTemplate,
    EslintRcParams
}