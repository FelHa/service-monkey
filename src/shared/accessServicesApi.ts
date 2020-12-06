import axios, { AxiosResponse, Method } from 'axios';

/**
 * Asynchrone Helperfunktion, um auf Services-Api zuzugreifen.
 * @template T  Datentyp Response
 * @param path  Pfadangabe zum Endpoint
 * @param method  Requestmethode
 * @param [callback]  Optionale Callbackfunktion, die nach dem Request ausgeführt wird
 * @return  Promise vom Typ T
 */

export const accessServicesApi = async <T>(
  path: string,
  method: Method,
  data = {},
  callback?: (data: T) => void
): Promise<T | undefined> => {
  try {
    const response: AxiosResponse<T> = await axios({
      method: method,
      // headers: { Authorization: 'Bearer 1234567890' },
      url: `https://services-rest-api.herokuapp.com/${path}`,
      data,
    });
    if (callback) callback(response.data);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
