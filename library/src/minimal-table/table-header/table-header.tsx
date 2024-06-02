import React from 'react';
import { StyledTh, StyledThead, StyledTr } from '../min-table.styles';
import { TableProps } from '../min-table';
import { RequiredDataProps } from '../types';
import { getTypedEntries, isHeaderContent, isHeaderElement } from '../min-table.utils';

type Props<TData extends RequiredDataProps> = Pick<TableProps<TData>, 'headers'>;

function TableHeader<TData extends RequiredDataProps>({ headers }: Readonly<Props<TData>>) {
  // xd
  return (
    <StyledThead>
      <StyledTr>
        {getTypedEntries(headers).map(([id, headerEntry]) => {
          const { colTextAlign, colSpan } = headerEntry;
          return (
            <StyledTh key={id} textAlign={colTextAlign} colSpan={colSpan}>
              {isHeaderContent(headerEntry) && headerEntry.content}
              {isHeaderElement(headerEntry) && headerEntry.renderHeader(id)}
            </StyledTh>
          );
        })}
      </StyledTr>
    </StyledThead>
  );
}

export default TableHeader;
TableHeader.defaultName = 'ZUITableHeader';
