import React from 'react';
import { StyledTr } from '../min-table.styles';
import { TableProps } from '../min-table';
import { RequiredDataProps } from '../types';
import { StyledTbody, StyledTd } from '#/minimal-table/table-body/table-body.styles';

type Props<TData extends RequiredDataProps> = Pick<TableProps<TData>, 'data' | 'headers'>;

function TableBody<TData extends RequiredDataProps>({ data, headers }: Readonly<Props<TData>>) {
  // xd
  return (
    <StyledTbody>
      {data.map((entry, rowIndex) => (
        <StyledTr key={entry.id}>
          {Object.values(headers).map(({ renderCellContent, ...header }) => {
            const cellData = entry[String(header.dataProp)];
            return (
              <StyledTd
                key={`${entry.id}-${String(header.dataProp)}`}
                colSpan={header.colSpan}
                $textAlign={header.colTextAlign}
                $width={header.width}
              >
                {renderCellContent ? renderCellContent(rowIndex, cellData) : cellData}
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
