import React from 'react';
import { StyledTr, TotalRow } from '../min-table.styles';
import { TableProps } from '../min-table';
import { RequiredDataProps } from '../types';
import { StyledTd } from '../table-body/table-body.styles';
import { StyledTfoot } from './table-footer.styles';
import { PickNonNullable } from '#/typings';

type Props<TData extends RequiredDataProps> = Pick<TableProps<TData>, 'headers'> &
  PickNonNullable<TableProps<TData>, 'summary'> & { selectable?: boolean };

function TableFooter<TData extends RequiredDataProps>({ headers, summary, selectable }: Readonly<Props<TData>>) {
  if (!summary) throw new Error('Missing summary');
  return (
    <StyledTfoot>
      <TotalRow>
        {selectable && <StyledTd />}
        {Object.values(headers).map((header) => {
          return (
            <StyledTd
              key={`total-${String(header.dataProp)}`}
              colSpan={header.colSpan}
              $textAlign={header.colTextAlign}
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
