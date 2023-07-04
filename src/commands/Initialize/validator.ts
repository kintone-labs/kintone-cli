import * as url from 'url';
export default {
  appValidator: (params: any): boolean | string => {
    if (
      params.type &&
      params.type !== 'Customization' &&
      params.type !== 'Plugin'
    ) {
      return 'Invalid App Type';
    }
    if (
      params.preset &&
      params.preset !== 'React' &&
      params.preset !== 'ReactTS'
    ) {
      return 'Invalid Preset';
    }
    if (
      params.scope &&
      params.scope !== 'ALL' &&
      params.scope !== 'ADMIN' &&
      params.scope !== 'NONE'
    ) {
      return 'Invalid Scope';
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
    return false;
  }
};
