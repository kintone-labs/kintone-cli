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

    return false;
  }
};
