import { toast } from 'react-toastify';
import { genericApiAcess } from './genericApiAcess';

const tokenKey = 'token';

export async function register(
  name: string,
  email: string,
  password: string
): Promise<boolean> {
  try {
    const token = await genericApiAcess<string>('api/users', 'post', {
      name,
      email,
      password,
    });
    if (token) {
      localStorage.setItem(tokenKey, token);
    }
    return true;
  } catch (ex) {
    if (ex.status === 400) toast.error('E-Mail-Adresse bereits vergeben.');
    return false;
  }
}
