import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from '@/components/ui/table';
import { TrashIcon } from 'lucide-react';

export function APUcard({ onClose, id, onAddToBudget }) {
  const [data, setData] = useState(null);

 

  useEffect(() => {
    axios.get(`api/activities/apu/get?id=${id}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleAddToBudget = () => {
    const cantidad = document.getElementById("cantidad").value
    onAddToBudget({
      descripcion: data.Descripcion,
      precio: data.PrecioBase,
      id: data.ID,
      cantidad: cantidad// Ensure this is the correct price field
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl h-3/4 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Análisis de Precios Unitarios</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-full">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Actividad: {data.Descripcion}</p>
          <div className="grid gap-6 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-300">Unidad</label>
                <p className="text-gray-500 dark:text-gray-400">{data.Unidad}</p>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-300">Cantidad</label>
                <div className="flex items-center">
                  <Input type="number" className="flex-1 h-10 rounded-md border border-gray-300 bg-gray-100 dark:bg-gray-700 dark:text-white px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none" id="cantidad"/>
                  <Button className="ml-2" variant="outline" onClick={() => handleAddToBudget()}>
                    Crear memoria
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full mb-4">
            <div className="overflow-x-auto max-h-40">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400">Insumo</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400">Cantidad</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400">Unidad</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400">Precio Unitario</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400">Precio Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data.Insumos.map((insumo, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{insumo.Descripcion}</td>
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{insumo.Cantidad}</td>
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{insumo.Unidad}</td>
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{insumo.PrecioBase}</td>
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{(insumo.Cantidad * insumo.PrecioBase).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button variant="outline" onClick={handleAddToBudget}>
              Agregar al presupuesto
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}