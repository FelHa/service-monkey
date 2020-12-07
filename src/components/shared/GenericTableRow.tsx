import React, { ReactElement } from 'react';

interface Props<ObjectType> {
  object: ObjectType;
  properties: {
    key: keyof ObjectType;
    label: string;
  }[];
}

export default function GenericTableRow<ObjectType extends { _id: string }>({
  object,
  properties,
}: Props<ObjectType>): ReactElement {
  return (
    <tr>
      {properties.map((property) => (
        <td key={String(property.key)}>{object[property.key]}</td>
      ))}
    </tr>
  );
}
