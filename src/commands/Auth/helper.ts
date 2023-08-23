import { configJSONAddPropsType, updateAuthJSONType } from '../../dto/app';

export const updateAuthJSON = ({
  authJSON,
  cmd,
  answer
}: updateAuthJSONType) => {
  authJSON.domain = cmd?.domain || answer.domain;
  authJSON.username = cmd?.username || answer.username;
  authJSON.password = cmd?.password || answer.password;

  if (cmd?.proxy || answer.proxy) authJSON.proxy = cmd?.proxy || answer.proxy;
  return authJSON;
};

export const configJSONAddProps = ({
  configJSON,
  cmd,
  answer
}: configJSONAddPropsType) => {
  if (!configJSON.appID) configJSON.appID = cmd?.appID || answer.appID;
  return configJSON;
};
