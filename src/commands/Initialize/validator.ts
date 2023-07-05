const scopes = ['ALL', 'ADMIN', 'NONE'];

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
    if (params.scope && scopes.indexOf(params.scope) === -1)
      return 'Invalid Scope';

    return false;
  }
};
