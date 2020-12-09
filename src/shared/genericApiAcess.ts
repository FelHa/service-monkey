import axios, { AxiosResponse, Method } from 'axios';
import { toast } from 'react-toastify';
import logger from './logger';

axios.defaults.headers.common['X-Auth-Token'] = localStorage.getItem('token');

axios.interceptors.response.use(
  undefined,
  ({ response: error }: { response: AxiosResponse }) => {
    const expectedError = error && error.status >= 400 && error.status < 500;

    if (!expectedError) {
      logger(error);
      toast.error('Ein unerwarteter Fehler ist aufgetreten.');
    }

    return Promise.reject(error);
  }
);

export const setAuthenticationHeader = (jwt: string): void => {
  axios.defaults.headers.common['X-Auth-Token'] = jwt;
};

export const unSetAuthenticationHeader = (): void => {
  axios.defaults.headers.common['X-Auth-Token'] = '';
};

/**
 * Asynchrone Helperfunktion, um auf Services-Api zuzugreifen.
 * @template T  Datentyp Response
 * @param path  Pfadangabe zum Endpoint
 * @param method  Requestmethode
 * @param data  Requestdaten
 * @param [callback]  Optionale Callbackfunktion, die nach dem Request ausgeführt wird
 * @return  Promise vom Typ T
 */

export const genericApiAcess = async <T>(
  path: string,
  method: Method,
  data = {},
  delegateError?: boolean,
  callback?: (response: T) => void
): Promise<T | undefined> => {
  try {
    const response: AxiosResponse<T> = await axios({
      method: method,
      url: `http://localhost:4000/${path}`,
      data,
    });
    if (callback) callback(response.data);
    return response.data;
  } catch (ex) {
    if (delegateError) {
      throw ex;
    }
    switch (ex.status || '') {
      case 401:
        toast.error('Nutzer nicht authentifiziert.');
        break;
      case 403:
        toast.error('Nutzer nicht autorisiert.');
        break;
      default:
        toast.error('Fehler beim Zugriff auf die Datenbank.');
        break;
    }
    logger(ex);
  }
};
