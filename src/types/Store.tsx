import Service from './Service';

/* Global store */

export interface Store {
    services: Service[];
    subscribed: Service[];
}
