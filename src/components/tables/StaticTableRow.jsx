import React from "react";
import { DragHandle } from "./DragHandle.jsx";
import { Table } from "lucide-react";
import { TableCell, TableRow } from "../ui/table.jsx";

export const StaticTableRow = ({ row }) => {
  return (
    <TableRow {...row.getRowProps()}>
      {row.cells.map((cell, i) => {
        return (
          <TableCell key={i} {...cell.getCellProps()}>
            {i === 0 && (
              <>
                <DragHandle isDragging={false} />
                <span>{cell.render("Cell")}</span>
              </>
            )}
            {i !== 0 && cell.render("Cell")}
          </TableCell>
        );
      })}
    </TableRow>
  );
};
