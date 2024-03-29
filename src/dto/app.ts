type AppOption = {
  setAuth: boolean;
  useTypescript: boolean;
  useWebpack: boolean;
  entry: string;
  useReact: boolean;
  appName: string;
  domain: string;
  username: string;
  password: string;
  type: AppType;
  appID: number;
  proxy: string | undefined;
  useCybozuLint: boolean;
  scope: string;
};

type WebpackParams = {
  entry: string;
  useTypescript: boolean;
  useReact: boolean;
  appName: string;
  type: string;
};

type EslintRcParams = {
  useTypescript: boolean;
  useWebpack: boolean;
  useReact: boolean;
};

type AppType = 'Customization' | 'Plugin';
type CustomizationScope = 'ALL' | 'ADMIN' | 'NONE';

type updateAuthJSONType = {
  authJSON: any;
  cmd?: any;
  answer?: any;
};

type configJSONAddPropsType = {
  configJSON: any;
  cmd?: any;
  answer?: any;
};

export {
  AppOption,
  WebpackParams,
  EslintRcParams,
  AppType,
  CustomizationScope,
  updateAuthJSONType,
  configJSONAddPropsType
};
