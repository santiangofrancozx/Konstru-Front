import React, { useMemo, useState } from 'react';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { useTable } from 'react-table';
import { DraggableTableRow } from './DraggableTableRow';
import { StaticTableRow } from './StaticTableRow';
import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody, TableFooter } from '@/components/ui/table'; // Ajusta la ruta según la estructura de tu proyecto

export function TableDrag({ columns, data, setData }) {
  const [activeId, setActiveId] = useState(null);
  const items = useMemo(() => data?.map(({ id }) => id), [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns: useMemo(
      () =>
        columns.map(column => ({
          ...column,
          id: column.accessor // Assuming accessor is unique for each column
        })),
      [columns]
    ),
    data
  });

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setData(data => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  const selectedRow = useMemo(() => {
    if (!activeId) {
      return null;
    }
    const row = rows.find(({ original }) => original.id === activeId);
    prepareRow(row);
    return row;
  }, [activeId, rows, prepareRow]);

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
    >
      <Table {...getTableProps()}>
        <TableHeader>
          {headerGroups.map(headerGroup => (
            <TableRow key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableHead key={column.id} {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody {...getTableBodyProps()}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {rows.map((row, i) => {
              prepareRow(row);
              return <DraggableTableRow key={row.original.id} row={row} />;
            })}
          </SortableContext>
        </TableBody>
      </Table>
      <DragOverlay>
        {activeId && (
          <Table style={{ width: '100%' }}>
            <TableBody>
              <StaticTableRow row={selectedRow} />
            </TableBody>
          </Table>
        )}
      </DragOverlay>
    </DndContext>
  );
}
