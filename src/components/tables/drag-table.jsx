import React, { useMemo, useState } from "react";
import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody, TableFooter } from '@/components/ui/table';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useTable } from "react-table";
import { DraggableTableRow } from "./DraggableTableRow";
import { StaticTableRow } from "./StaticTableRow";

export function DragTable({ columns, data, setData }) {
  const [activeId, setActiveId] = useState();
  const items = useMemo(() => data?.map(({ id }) => id), [data]);
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setData((data) => {
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

  // Render the UI for your table
  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
    >
      <Table
        {...getTableProps()}
        // style={{
        //   borderCollapse: "collapse",
        //   width: "100%",
        //   border: "1px solid #ccc"
        // }}
      >
        <TableHeader>
          {headerGroups.map((headerGroup, index) => (
            <TableRow key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHead
                  key={column.id}
                  {...column.getHeaderProps()}
                  // style={{
                  //   padding: "8px",
                  //   borderBottom: "1px solid #ccc",
                  //   background: "#f2f2f2",
                  //   textAlign: "left"
                  // }}
                >
                  {column.render("Header")}
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
          <Table >
            <TableBody>
              <StaticTableRow row={selectedRow} />
            </TableBody>
          </Table>
        )}
      </DragOverlay>
    </DndContext>
  );
}
