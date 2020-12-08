import React, { ReactElement } from 'react';

interface Props {
  readonly labels: string[];
}

export default function TableHead(props: Props): ReactElement {
  return (
    <thead>
      <tr>
        {props.labels.map((label, index) => (
          <th key={index}>{label}</th>
        ))}
      </tr>
    </thead>
  );
}
