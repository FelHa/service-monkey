import React, { ReactElement } from 'react';

interface Props {
  properties: {
    key: number | symbol | string;
    label: string;
  }[];
}

export default function TableHead({ properties }: Props): ReactElement {
  return (
    <thead>
      <tr>
        {properties.map((property) => (
          <th key={String(property.key)}>{property.label}</th>
        ))}
      </tr>
    </thead>
  );
}
