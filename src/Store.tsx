import React, { createContext, useReducer, ReactElement } from 'react';
import { Store } from './types/Store';
import { Actions } from './types/Actions';
import ContextProps from './types/ContextProps';

/* Global store */

export const initialStore: Store = {
  services: [],
  subscribed: [],
};

export function reducer(store = initialStore, action: Actions): Store {
  switch (action.type) {
    case 'AddToSubscribed': {
      return { ...store, subscribed: [...store.subscribed, action.service] };
    }
    case 'RemoveFromSubscribed': {
      const subscribed = [...store.subscribed];

      const index = subscribed
        .map((service) => service._id)
        .indexOf(action.service._id);
      if (index >= 0) {
        subscribed.splice(index, 1);
      }
      return {
        ...store,
        subscribed,
      };
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
