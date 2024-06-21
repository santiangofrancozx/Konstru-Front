import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { DragHandle } from "./DragHandle.jsx";
import { TableCell, TableRow } from "../ui/table.jsx";

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

  const transformStyle = transform
    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
    : "translate3d(0px, 0px, 0)";

  const style = {
    transform: transformStyle,
    transition,
  };

  return (
    <TableRow ref={setNodeRef} style={style} {...row.getRowProps()}>
      {isDragging ? (
        <td colSpan={row.cells.length}>&nbsp;</td>
      ) : (
        row.cells.map((cell, i) => (
          <TableCell
            key={i}
            style={{ background: "white", minWidth: i === 0 ? "20ch" : "auto"}}
            {...cell.getCellProps()}
          >
            {i === 0 && (
              <>
                <DragHandle {...attributes} {...listeners} />
                <span>{cell.render("Cell")}</span>
              </>
            )}
            {i !== 0 && cell.render("Cell")}
          </TableCell>
        ))
      )}
    </TableRow>
  );
};
