import { Dispatch } from 'react';
import { Actions } from './Actions';
import { Store } from './Store';

export default interface ContextProps {
  store: Store;
  dispatch: Dispatch<Actions>;
}
