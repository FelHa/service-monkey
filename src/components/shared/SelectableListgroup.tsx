import React, { ReactElement, useState } from 'react';
import { ListGroup } from 'react-bootstrap';

interface Props<ObjectType> {
  readonly objects: ObjectType[];
  readonly content: keyof ObjectType;
  readonly onSelect: (item: ObjectType) => void;
}

export default function SelectableListgroup<ObjectType extends { _id: string }>(
  props: Props<ObjectType>
): ReactElement {
  const [selectedObject, setSelectedObject] = useState('');

  return (
    <ListGroup>
      {props.objects.map((object) => {
        return (
          <ListGroup.Item
            key={object._id}
            onClick={() => {
              setSelectedObject(object._id);
              props.onSelect(object);
            }}
            active={object._id === selectedObject}
          >
            {object[props.content]}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

/* import React from "react";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect
}) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup; */

/* =============================================== */

/* interface Props<ObjectType> {
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
          <GenericTableRow<ObjectType>
            key={object._id}
            object={object}
            properties={properties}
          />
        ))}
      </tbody>
    </Table>
  );
}
  */
