import { toast } from 'react-toastify';
import { accessServicesApi } from './accessServicesApi';

const tokenKey = 'token';

export async function register(
  name: string,
  email: string,
  password: string
): Promise<boolean> {
  try {
    const token = await accessServicesApi<string>('api/users', 'post', {
      name,
      email,
      password,
    });
    localStorage.setItem(tokenKey, token);
    return true;
  } catch (ex) {
    if (ex.status === 400) toast.error('E-Mail-Adresse bereits vergeben.');
    return false;
  }
}
