import React from 'react';
import { StyledTd, StyledTfoot, TotalRow } from '../min-table.styles';
import { TableProps } from '../min-table';
import { RequiredDataProps } from '../types';

type Props<TData extends RequiredDataProps> = Pick<TableProps<TData>, 'headers' | 'summary'>;

function TableFooter<TData extends RequiredDataProps>({ headers, summary }: Readonly<Props<TData>>) {
  // xd
  return (
    <StyledTfoot>
      <TotalRow>
        {Object.values(headers).map((header) => {
          return (
            <StyledTd
              key={`footer-${String(header.dataProp)}`}
              colSpan={header.colSpan}
              textAlign={header.colTextAlign}
            >
              {summary[String(header.dataProp)]}
            </StyledTd>
          );
        })}
      </TotalRow>
    </StyledTfoot>
  );
}

export default TableFooter;
TableFooter.defaultName = 'ZUITableFooter';
