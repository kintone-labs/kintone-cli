type authJSONAddProps = {
  authJSON: any;
  cmd?: any;
  answer?: any;
};

type configJSONAddProps = Omit<authJSONAddProps, 'authJSON'> & {
  configJSON: any;
};
