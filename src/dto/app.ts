type AppOption = {
    setAuth: boolean,
    useTypescript: boolean,
    useWebpack: boolean,
    entry: string,
    useReact: boolean,
    appName: string,
    domain: string,
    username: string,
    password: string,
    type: 'Plugin' | 'Customization',
    appID: number
}

type WebpackParams = {
    entry: string
    useTypescript: boolean
    useReact: boolean
    appName: string
    type: string
}

type EslintRcParams = {
    useTypescript: boolean
    useWebpack: boolean,
    useReact: boolean
}

export {
    AppOption,
    WebpackParams,
    EslintRcParams
}