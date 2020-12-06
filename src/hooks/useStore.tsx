import { useContext } from 'react';
import { StoreContext } from '../Store';
import ContextProps from '../types/ContextProps';

export const useStore = (): ContextProps => useContext(StoreContext);
