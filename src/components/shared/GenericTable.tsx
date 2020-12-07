import React, { PropsWithChildren, ReactElement } from 'react';
import { Table } from 'react-bootstrap';
import GenericTableRow from './GenericTableRow';
import TableHead from './TableHead';

interface Props<ObjectType> {
  objects: ObjectType[];
  properties: {
    key: keyof ObjectType;
    label: string;
  }[];
}

export default function GenericTable<ObjectType extends { _id: string }>({
  objects,
  properties,
}: PropsWithChildren<Props<ObjectType>>): ReactElement {
  return (
    <Table bordered hover>
      <TableHead properties={properties} />
      <tbody>
        {objects.map((object) => (
          <GenericTableRow
            key={object._id}
            object={object}
            properties={properties}
          />
        ))}
      </tbody>
    </Table>
  );
}
