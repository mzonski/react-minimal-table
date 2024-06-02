import React, { Fragment, useEffect } from 'react';
import { StyledTr } from '../min-table.styles';
import { TableProps } from '../min-table';
import { RequiredDataProps } from '../types';
import { StyledTbody, StyledTd } from '#/minimal-table/table-body/table-body.styles';
import { useSelectedKeysContext } from '#/minimal-table/contexts/selected-id-context';

type Props<TData extends RequiredDataProps> = Pick<TableProps<TData>, 'data' | 'headers' | 'options'>;

function TableBody<TData extends RequiredDataProps>({ data, headers }: Readonly<Props<TData>>) {
  const { toggleKey, registerRef, removeRef } = useSelectedKeysContext();

  useEffect(() => {
    return () => data.forEach((entry) => removeRef(entry.id));
  }, [data, removeRef]);

  // xd
  return (
    <StyledTbody>
      {data.map((entry, rowIndex) => (
        <Fragment key={entry.id}>
          <input ref={(newRef) => registerRef(entry.id, newRef)} type="checkbox" onChange={() => toggleKey(entry.id)} />
          <StyledTr>
            {Object.values(headers).map(({ renderCellContent, ...header }) => {
              const cellData = entry[String(header.dataProp)];
              return (
                <StyledTd
                  key={`${entry.id}-${String(header.dataProp)}`}
                  colSpan={header.colSpan}
                  $textAlign={header.colTextAlign}
                  $width={header.width}
                  onClick={() => toggleKey(entry.id)}
                >
                  {renderCellContent ? renderCellContent(rowIndex, cellData) : cellData}
                </StyledTd>
              );
            })}
          </StyledTr>
        </Fragment>
      ))}
    </StyledTbody>
  );
}

export default TableBody;
TableBody.defaultName = 'ZUITableBody';
