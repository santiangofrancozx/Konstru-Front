
import styled from "styled-components";

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragHandle } from './DragHandle';
import { TableRow, TableData } from '@/components/ui/table'; // Ajusta la ruta según la estructura de tu proyecto

const DraggingRow = styled.td`
  background: rgba(127, 207, 250, 0.3);
`;

// const TableData = styled.td`
//   background: white;
//   &:first-of-type {
//     min-width: 20ch;
//   }
// `;

export const DraggableTableRow = ({ row }) => {
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging,
  } = useSortable({
    id: row.original.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  };
  return (
    <TableRow ref={setNodeRef} style={style} {...row.getRowProps()}>
      {isDragging ? (
        <DraggingRow colSpan={row.cells.length}>&nbsp;</DraggingRow>
      ) : (
        row.cells.map((cell, i) => {
          if (i === 0) {
            return (
              <TableData key={cell.column.id} {...cell.getCellProps()}>
                <DragHandle {...attributes} {...listeners} />
                <span>{cell.render('Cell')}</span>
              </TableData>
            );
          }
          return (
            <TableData key={cell.column.id} {...cell.getCellProps()}>
              {cell.render('Cell')}
            </TableData>
          );
        })
      )}
    </TableRow>
  );
};
