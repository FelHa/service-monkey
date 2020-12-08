import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import {
  accessServicesApi,
  setAuthenticationHeader,
  unSetAuthenticationHeader,
} from './accessServicesApi';

const tokenKey = 'token';

export const login = async (
  email: string,
  password: string
): Promise<string | undefined> => {
  try {
    const token = await accessServicesApi<string>('api/auth', 'post', {
      email: email,
      password: password,
    });
    localStorage.setItem(tokenKey, token);
    setAuthenticationHeader(token);
    return token;
  } catch (ex) {
    if (ex.status === 400)
      toast.error('Falsche E-Mail-Adresse oder falsches Passwort');
  }
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

export const getJwt = (): string | null => {
  return localStorage.getItem(tokenKey);
};
