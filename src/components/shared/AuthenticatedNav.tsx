import { ReactElement } from 'react';
import { useStore } from '../../hooks/useStore';

interface Props {
  readonly children: ReactElement;
}

export default function AuthenticatedNav(props: Props): ReactElement | null {
  const { store } = useStore();
  if (store.user) return props.children;
  return null;
}
