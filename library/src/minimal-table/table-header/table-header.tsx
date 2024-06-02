import React from 'react';
import { StyledTr } from '../min-table.styles';
import { TableProps } from '../min-table';
import { RequiredDataProps } from '../types';
import { getTypedEntries, isHeaderContent, isHeaderElement } from '../min-table.utils';
import { StyledTh, StyledThead } from './table-header.styles';

type Props<TData extends RequiredDataProps> = Pick<TableProps<TData>, 'headers'>;

function TableHeader<TData extends RequiredDataProps>({ headers }: Readonly<Props<TData>>) {
  // xd
  return (
    <StyledThead>
      <StyledTr>
        {getTypedEntries(headers).map(([id, headerEntry]) => {
          const { colTextAlign, colSpan, width } = headerEntry;
          return (
            <StyledTh key={id} $textAlign={colTextAlign} colSpan={colSpan} $width={width}>
              {isHeaderContent(headerEntry) && headerEntry.content}
              {isHeaderElement(headerEntry) && headerEntry.renderHeaderContent(id)}
            </StyledTh>
          );
        })}
      </StyledTr>
    </StyledThead>
  );
}

export default TableHeader;
TableHeader.defaultName = 'ZUITableHeader';
