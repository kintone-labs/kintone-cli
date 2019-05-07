type EslintRcParams = {
    useTypescript: boolean
    useReact: boolean
}
const buildEslintRcTemplate = ({useTypescript, useReact}:EslintRcParams):string => {
    const eslintRules = ["@cybozu/eslint-config/lib/kintone.js", "@cybozu/eslint-config/globals/kintone.js"];
    if(useTypescript && useReact) {
        eslintRules.push('@cybozu/eslint-config/presets/react-typescript')
    } else if(useTypescript) {
        eslintRules.push('@cybozu/eslint-config/presets/typescript')
    } else if(useReact) {
        eslintRules.push('@cybozu/eslint-config/presets/react')
    } else {
        eslintRules.push("@cybozu/eslint-config/lib/es5.js");
    }
    let eslintRulesToString = '["' + eslintRules.join('", "') + '"]';
    return `module.exports = {
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