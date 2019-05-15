import * as url from 'url'
export default {
    appValidator: (params: object): boolean | string => {
        if (params['type'] && params['type'] !== 'Customization' && params['type'] !== 'Plugin') {
            return 'Invalid App Type'
        }
        /* if (params['domain']) {
            try {
                let result = url.parse(params['domain']);
                console.log(url.parse('https://google.com.vn'))
                if (!result.host) {
                    return 'Invalid Domain'
                }
            } catch (error) {
                return 'Invalid Domain'
            }
        } */
        return false
    }
}