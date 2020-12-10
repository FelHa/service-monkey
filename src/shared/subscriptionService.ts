import { toast } from 'react-toastify';
import Subscription from '../types/Subscription';
import { genericApiAcess } from './genericApiAcess';
import logger from './logger';

export const subscribe = async (data: {
  user: string | undefined;
  service: string;
}): Promise<Subscription | undefined> => {
  try {
    return await genericApiAcess<Subscription>(
      'api/subscriptions',
      'post',
      data,
      true
    );
  } catch (ex) {
    logger(ex);
    switch (ex?.status || '') {
      case 401:
        toast.error('Nutzer nicht authentifiziert.');
        break;
      case 403:
        toast.error('Nutzer nicht autorisiert.');
        break;
      case 404:
        toast.error('Die Dienstleistung wurde schon gebucht.');
        break;
      default:
        toast.error('Fehler beim Zugriff auf die Datenbank.');
        break;
    }
  }
};
