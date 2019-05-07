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
    appID: number,
    pluginName: string
}

export {
    AppOption
}