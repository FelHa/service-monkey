import React, { ReactElement } from 'react';
import { ListGroup } from 'react-bootstrap';

type Item = {
  _id: string;
  content: string;
};

interface Props {
  readonly items: Item[];
  readonly selectedItem?: Item;
  readonly onItemSelect?: (item: Item) => void;
}

export default function SelectableListgroup(props: Props): ReactElement {
  return (
    <ListGroup>
      {props.items.map((item) => (
        <ListGroup.Item key={item._id}>{item.content}</ListGroup.Item>
      ))}
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
