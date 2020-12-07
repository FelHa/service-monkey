import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import Service from '../types/Service';

interface Props {
  service: Service;
}

export default function ServiceListItem(props: Props): ReactElement {
  return (
    <div>
      <Link to={`/services/${props.service._id}`}>
        {props.service.title}, {props.service.user.name}, {props.service.date}
      </Link>
    </div>
  );
}
