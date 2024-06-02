import React from 'react';
import { StyledTbody, StyledTd, StyledTr } from '../min-table.styles';
import { TableProps } from '../min-table';
import { RequiredDataProps } from '../types';

type Props<TData extends RequiredDataProps> = Pick<TableProps<TData>, 'data' | 'headers'>;

function TableBody<TData extends RequiredDataProps>({ data, headers }: Readonly<Props<TData>>) {
  // xd
  return (
    <StyledTbody>
      {data.map((entry) => (
        <StyledTr key={entry.id}>
          {Object.values(headers).map((header) => {
            return (
              <StyledTd
                key={`${entry.id} ${String(header.dataProp)}`}
                colSpan={header.colSpan}
                textAlign={header.colTextAlign}
              >
                {entry[String(header.dataProp)]}
              </StyledTd>
            );
          })}
        </StyledTr>
      ))}
    </StyledTbody>
  );
}

export default TableBody;
TableBody.defaultName = 'ZUITableBody';
