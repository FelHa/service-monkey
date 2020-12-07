import React, { ReactElement } from 'react';
import Service from '../types/Service';

interface Props {
  service: Service;
}

export default function ServiceListItem(props: Props): ReactElement {
  return (
    <div>
      {props.service.title}, {props.service.user.name}, {props.service.date}
    </div>
  );
}
