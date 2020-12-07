import jwtDecode from 'jwt-decode';
import {
  accessServicesApi,
  setAuthenticationHeader,
  unSetAuthenticationHeader,
} from './accessServicesApi';

const tokenKey = 'token';

export const login = async (
  email: string,
  password: string
): Promise<boolean> => {
  const token = await accessServicesApi<string>('api/auth', 'post', {
    email: email,
    password: password,
  });
  if (token) {
    localStorage.setItem(tokenKey, token);
    setAuthenticationHeader(token);
    return true;
  } else return false;
};

export const loginWithJwt = (jwt: string): void => {
  localStorage.setItem(tokenKey, jwt);
};

export const logout = (): void => {
  localStorage.removeItem(tokenKey);
  unSetAuthenticationHeader();
};

export const getCurrentUser = (): string | undefined => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    if (jwt) return jwtDecode(jwt);
    else return undefined;
  } catch (ex) {
    return undefined;
  }
};

export const getJwt = (): void => {
  localStorage.getItem(tokenKey);
};

// accessServicesApi.setJwt(getJwt());
