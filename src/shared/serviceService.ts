import { Method } from 'axios';
import { toast } from 'react-toastify';
import { accessServicesApi } from './accessServicesApi';

export async function getServices<T>(
  path: string,
  method: Method
): Promise<T | undefined> {
  try {
    return await accessServicesApi<T>(path, method);
  } catch (ex) {
    switch (ex.status) {
      case 401:
        toast.error('Nutzer nicht authentifiziert.');
        break;
      case 403:
        toast.error('Nutzer nicht autorisiert.');
        break;
      default:
        toast.error('Services konnten leider nicht geladen werden.');
        break;
    }
  }
}
