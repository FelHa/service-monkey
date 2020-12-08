import { useState, useEffect } from 'react';
import { Method } from 'axios';
import { getServices } from '../shared/serviceService';

/**
 * Erstellt State vom Typ T und speichert darin einen Aufruf auf die Services-Api.
 * @template T  Typ für State und Aufruf der Services-Api
 * @param  path  Pfadangabe zum Endpoint
 * @param  method  Requestmethode
 * @return  Getter: (state | undefined), Setter: setState
 */

export function useServicesApi<T>(
  path: string,
  method: Method
): { state: T | undefined; setState: (arg: T | undefined) => void } {
  const [state, setState] = useState<T>();

  useEffect(() => {
    const effectFunction = async () => {
      const response = await getServices<T>(path, method);
      setState(response);
    };
    effectFunction();
  }, [path, method]);

  return { state, setState };
}
