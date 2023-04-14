export default {
  authValidator: (params: any): boolean | string => {
    if (!params.appName) {
      return 'App name missing';
    }
    return false;
  }
};
