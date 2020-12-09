import React, {
  ChangeEvent,
  ReactElement,
  SyntheticEvent,
  useState,
} from 'react';
import jwtDecode from 'jwt-decode';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useStore } from '../hooks/useStore';
import { login } from '../shared/authService';
import { LoggedInUser } from '../types/User';

export default function Login(): ReactElement {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const history = useHistory();
  const { dispatch } = useStore();

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    const token = await login(email, password);
    if (token) {
      const user: LoggedInUser = jwtDecode(token);
      dispatch({ type: 'UserLoggedIn', user });
      history.push('/services');
    }
  };
  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email-Adresse</Form.Label>
          <Form.Control
            type="email"
            autoFocus={true}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
            required
            value={email}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            required
            value={password}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Einloggen
        </Button>
      </Form>
    </>
  );
}
