export default {
    authValidator: (params: object): boolean | string => {
        if (!params['appName']) {
            return 'App name missing'
        }
        return false
    }
}