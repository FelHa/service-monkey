import React, { ReactElement } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useStore } from '../../hooks/useStore';

interface Props {
  readonly path: string;
  readonly redirect?: string;
  readonly component: ReactElement;
}

export default function ProtectedRoute(props: Props): ReactElement {
  const { store } = useStore();
  if (store.user) return <Route path={props.path}>{props.component}</Route>;
  return <Redirect to={props.redirect || '/home'} />;
}
