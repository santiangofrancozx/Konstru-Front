import React from 'react';
import { DragHandle } from './DragHandle';
import styled from "styled-components";
import { TableRow, TableCell } from '@/components/ui/table'; // Ajusta la ruta según la estructura de tu proyecto

const StyledStaticData = styled.td`
  background: white;
  &:first-of-type {
    min-width: 20ch;
  }
`;

const StyledStaticTableRow = styled.tr`
  box-shadow: rgb(0 0 0 / 10%) 0px 20px 25px -5px,
    rgb(0 0 0 / 30%) 0px 10px 10px -5px;
  outline: #3e1eb3 solid 1px;
`;

export const StaticTableRow = ({ row }) => {
  return (
    <StyledStaticTableRow {...row.getRowProps()}>
      {row.cells.map((cell, i) => {
        if (i === 0) {
          return (
            <StyledStaticData key={cell.column.id} {...cell.getCellProps()}>
              <DragHandle isDragging />
              <span>{cell.render('Cell')}</span>
            </StyledStaticData>
          );
        }
        return (
          <StyledStaticData key={cell.column.id} {...cell.getCellProps()}>
            {cell.render('Cell')}
          </StyledStaticData>
        );
      })}
    </StyledStaticTableRow>
  );
};
