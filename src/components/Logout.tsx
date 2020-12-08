import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStore } from '../hooks/useStore';
import { logout } from '../shared/authService';

export default function Logout(): null {
  const history = useHistory();
  const { dispatch } = useStore();

  useEffect(() => {
    logout();
    dispatch({ type: 'UserLoggedOut' });
    history.push('/home');
  });

  return null;
}
