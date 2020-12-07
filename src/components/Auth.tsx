import React, { ChangeEvent, ReactElement, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { login } from '../shared/authService';

export default function Auth(): ReactElement {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const history = useHistory();
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();

        if (!email || !password) return;
        await login(email, password);

        history.push('/services');
      }}
    >
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email-Adresse</Form.Label>
        <Form.Control
          type="email"
          autoFocus={true}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
          required
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
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Einloggen
      </Button>
    </Form>
  );
}
