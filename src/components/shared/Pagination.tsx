import React, { ReactElement } from 'react';
import { Pagination as Paginate } from 'react-bootstrap';
import _ from 'lodash';

interface Props {
  readonly pageCount: number;
  readonly selectedPage: number;
  readonly onSelect: (page: number) => void;
}

export default function Pagination(props: Props): ReactElement | null {
  const pageCount = Math.ceil(props.pageCount);
  const pages = _.range(1, pageCount + 1);

  if (pageCount === 1) return null;

  console.log('rendering pagination...');

  return (
    <Paginate>
      {pages.map((page) => (
        <Paginate.Item
          key={page}
          onClick={() => {
            props.onSelect(page);
          }}
          active={page === props.selectedPage}
        >
          {page}
        </Paginate.Item>
      ))}
    </Paginate>
  );
}
