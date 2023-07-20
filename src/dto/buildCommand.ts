type buildAppImplementProps = {
  isBuildWebpack: boolean;
  config: any;
};

type buildCommandHandleProps = {
  config: any;
  isBuildWebpack: boolean;
};

type appFileCheckImplementProps = {
  isNotError: boolean;
  appName: string;
};

type appFileCheckProps = {
  appName: string;
  isExistsSync: boolean;
};

type updateManifestJSONProps = {
  manifestJSON: any;
  option: any;
};

type manifestJSONConfigProps = {
  manifestJSON: any;
  htmlContent: any;
};

type paramArrUpdateProps = {
  paramArr: any;
  isUpdate: boolean;
  appName: string;
};

type renameSyncImplementProps = {
  appName: string;
  isRenameSync: boolean;
};
