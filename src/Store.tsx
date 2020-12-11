import React, { createContext, useReducer, ReactElement } from 'react';
import { Store } from './types/Store';
import { Actions } from './types/Actions';
import ContextProps from './types/ContextProps';
import jwtDecode from 'jwt-decode';
import { getJwt } from './shared/authService';
import { LoggedInUser } from './types/User';

/* Global store */

const token = getJwt();
const user = token ? (jwtDecode(token) as LoggedInUser) : undefined;

export const initialStore: Store = {
  user: user,
};

export function reducer(store = initialStore, action: Actions): Store {
  switch (action.type) {
    case 'UserLoggedIn': {
      return { ...store, user: action.user };
    }

    case 'UserLoggedOut': {
      return { ...store, user: undefined };
    }
  }
}

/* Store provider */

export const StoreContext = createContext({} as ContextProps);

export function StoreProvider(props: { children: ReactElement }): ReactElement {
  const [store, dispatch] = useReducer(reducer, initialStore);

  const value = { store, dispatch };
  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
}
