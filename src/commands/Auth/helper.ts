export const updateAuthJSON = ({ authJSON, cmd, answer }: updateAuthJSON) => {
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
}: configJSONAddProps) => {
  if (!configJSON.appID) configJSON.appID = cmd?.appID || answer.appID;
  return configJSON;
};
