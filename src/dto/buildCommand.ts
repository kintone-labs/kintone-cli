type buildAppImplementProps = {
  isBuildWebpack: boolean;
  config: any;
  writeFileSyncFunc: any;
  readdirSyncUTF8Func: any;
};

type buildCommandHandleProps = {
  config: any;
  isBuildWebpack: boolean;
  writeFileSyncFunc: any;
  readdirSyncUTF8Func: any;
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
  readdirSyncUTF8Func: any;
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
  keyFileName: any;
  renameSyncFunc: any;
};

type buildPluginProps = {
  option: any;
  writeFileSyncFunc: any;
  readdirSyncUTF8Func: any;
  keyFileName: any;
  renameSyncFunc: any;
  unlinkSyncFunc: any;
};
