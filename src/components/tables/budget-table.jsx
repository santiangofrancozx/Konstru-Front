import React, { useMemo } from 'react';
import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody, TableFooter } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import { TableDrag } from '../drag-and-drop-table/drag-table';

const BudgetTable = ({ budgetItems, handleDeleteInsumo }) => {
  const totalBudget = useMemo(() => {
    return budgetItems.reduce((sum, item) => sum + (item.Cantidad * item.PrecioBase), 0).toFixed(2);
  }, [budgetItems]);

  return (
    <Table id="budgetTable">
      <TableHeader>
        <TableRow>
          <TableHead>Artículo</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead>Precio unitario</TableHead>
          <TableHead>Total</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {budgetItems.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.codigo}</TableCell>
            <TableCell>{item.Descripcion}</TableCell>
            <TableCell>{item.Cantidad}</TableCell>
            <TableCell>{item.PrecioBase}</TableCell>
            <TableCell>{(item.Cantidad * item.PrecioBase).toFixed(2)}</TableCell>
            <TableCell className="text-right">
              <Button onClick={() => handleDeleteInsumo(item.ID)} className="text-red-500 hover:text-red-700">
                <TrashIcon className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan="4" className="text-right font-bold">Total:</TableCell>
          <TableCell colSpan="2" className="font-bold">${totalBudget}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default BudgetTable;
