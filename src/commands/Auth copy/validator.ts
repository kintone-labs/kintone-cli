import { ERRORS } from '../../constant';
import { isDomain } from '../../utils/string';

export const authValidator = (params: any): boolean | string => {
  if (!params.appName) {
    return ERRORS.APP_NAME_MISSING;
  }
  return false;
};

export const domainValidator = (domain: string) => {
  if (!domain.startsWith('https://')) return ERRORS.DOMAIN_STARTS_WITH_HTTPS;
  if (!isDomain(domain)) {
    return ERRORS.VALID_DOMAIN;
  }
  return true;
};

export const usernameValidator = (username: string) => {
  if (!username) {
    return ERRORS.USER_NAME_EMPTY;
  }
  return true;
};

export const passwordValidator = (password: string) => {
  if (!password) {
    return ERRORS.PASSWORD_EMPTY;
  }
  return true;
};

export const appIDValidator = (appID: string) => {
  if (!appID) {
    return ERRORS.APP_ID_EMPTY;
  }
  const numberMatch = appID.match(/(^-?\d+|^\d+\.\d*|^\d*\.\d+)(e\d+)?$/);
  // If a number is found, return that appID.
  if (!numberMatch) {
    return ERRORS.APP_ID_NUMBER;
  }
  return true;
};

export const useProxyValidator = (cmd: any) => !cmd.useProxy && !cmd.proxy;

export const proxyValidator = (proxy: string) => {
  if (!proxy) {
    return ERRORS.PROXY_EMPTY;
  }
  return true;
};

export const proxyWhenValidator = (cmd: any, curAnswers: any) =>
  (cmd.useProxy || curAnswers.useProxy) && !cmd.proxy;
