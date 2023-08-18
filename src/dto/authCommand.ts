type updateAuthJSON = {
  authJSON: any;
  cmd?: any;
  answer?: any;
};

type configJSONAddProps = Omit<updateAuthJSON, 'authJSON'> & {
  configJSON: any;
};
