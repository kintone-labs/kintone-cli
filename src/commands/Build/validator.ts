import { existsSync } from 'fs';

export default {
  buildValidator: (params: any): boolean | string => {
    if (!params.appName) {
      return 'App name missing';
    }
    if (!existsSync(params.appName)) {
      return 'App not existed';
    }
    return false;
  }
};
