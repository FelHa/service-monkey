import React, { ChangeEvent, ReactElement, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { register } from '../shared/userService';

export default function Auth(): ReactElement {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const history = useHistory();
  return (
    <>
      <h2>Register</h2>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();

          if (!email || !password || !name) return;

          const success = await register(name, email, password);
          if (success) history.push('/services');
        }}
      >
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Benutzername</Form.Label>
          <Form.Control
            type="text"
            autoFocus={true}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
            value={name}
            required
          />
        </Form.Group>

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
          Registrieren
        </Button>
      </Form>
    </>
  );
}
