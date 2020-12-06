import Service from './Service';

interface AddToSubscribed {
  type: 'AddToSubscribed';
  service: Service;
}

interface RemoveFromSubscribed {
  type: 'RemoveFromSubscribed';
  service: Service;
}

export type Actions = AddToSubscribed | RemoveFromSubscribed;
