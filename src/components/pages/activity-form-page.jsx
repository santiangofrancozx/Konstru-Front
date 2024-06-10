import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { SearchIcon, Table } from "lucide-react";
import { TrashIcon } from 'lucide-react';
import { Navbar } from "../navbars/navbar";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, TableFooter } from "@/components/ui/table";



export function ActivityFormPage() {
  const [resultados, setResultados] = useState([]);
  const [budgetItems, setBudgetItems] = useState([]);
  const [activityData, setActivityData] = useState({
    ActivityDescripcion: "",
    ActivityUnit: "",
    ActivityBasePrice: 0,
  });

  const ActivityHandler = async (e) => {
    e.preventDefault();
    try {
      const id = document.getElementById("codigo").value;
      const url = `api/insumos?id=${id}`;
      const response = await axios.get(url);

      if (response.status === 200) {
        setResultados(response.data);
      } else {
        setResultados([]);
        alert('Error: ' + response.status);
      }
    } catch (error) {
      setResultados([]);
      console.error('Error:', error);
    }
  };

  const addToBudget = (item) => {
    setBudgetItems((prevItems) => [...prevItems, item]);
  };

  const calculateTotalCost = () => {
    return budgetItems.reduce((total, item) => total + (item.PrecioBase * item.cantidad), 0);
  };

  const handleDeleteInsumo = (index) => {
    const updatedBudgetItems = [...budgetItems]; // Copia de los ítems del presupuesto
    updatedBudgetItems.splice(index, 1); // Elimina el ítem en el índice especificado
    setBudgetItems(updatedBudgetItems); // Actualiza el estado con los ítems del presupuesto actualizados
  };
  

  const handleSave = async (e) => {
    e.preventDefault();

    if (!activityData.ActivityDescripcion || !activityData.ActivityUnit || budgetItems.length === 0) {
      Swal.fire('Error!', 'Todos los campos son obligatorios y debe haber al menos un insumo en el presupuesto.', 'error');
      return;
    }

    const desca = activityData.ActivityDescripcion;
    const unita = activityData.ActivityUnit;
    const basePrice = calculateTotalCost();

    const jsonData = {
      ActivityDescripcion: desca,
      ActivityUnit: unita,
      ActivityBasePrice: parseFloat(basePrice), // conversión a float
      APU: budgetItems.map(item => ({
        insumo_id: item.ID,
        cantidad: parseFloat(item.cantidad) // conversión a float
      }))
    };

    try {
      const response = await axios.post('api/apu/create', jsonData);
      if (response.status === 200) {
        Swal.fire('Guardado!', 'El APU se ha guardado correctamente.', 'success');
      } else {
        Swal.fire('Error!', 'Hubo un problema al guardar el APU.', 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'Hubo un problema al guardar el APU.', 'error');
    }
  };

  return (
  <div className="min-h-screen flex flex-col bg-zinc-800 text-white">
  <Navbar/>
  <br></br>
  <h1 className="text-2xl font-bold">Análisis de Precios Unitarios</h1>
  <main className="flex-1 p-6 space-y-6">
    <section className="rounded-lg p-6 space-y-4">  
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className="block font-medium mb-2"
            htmlFor="descA">
            Nombre del APU
          </label>
          <input
            className="w-full border rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 bg-zinc-600"
            id="descA"
            placeholder="Ingrese el nombre del APU"
            type="text"
            value={activityData.ActivityDescripcion}
            required
            onChange={(e) => setActivityData({ ...activityData, ActivityDescripcion: e.target.value })}
          />
        </div>
        <div>
          <label
            className="block font-medium mb-2"
            htmlFor="unitA">
            Unidad de Medida
          </label>
          <input
            className="w-full border rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 bg-zinc-600"
            id="unitA"
            placeholder="Ingrese la unidad de medida"
            type="text"
            value={activityData.ActivityUnit}
            required="true"
            onChange={(e) => setActivityData({ ...activityData, ActivityUnit: e.target.value })}
          />
        </div>
      </div>
    </section>
    <section className="rounded-lg p-6 space-y-4">
      <form className="flex items-center" onSubmit={ActivityHandler}>
        <input
          className="flex-1 max-w-xl mr-4 border rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 bg-zinc-600"
          placeholder="Buscar insumo"
          id="codigo"
          type="text" 
          required="true"/>
        <Button variant="outline" type="submit">
        <SearchIcon/>
        </Button>
      </form>

      <div className="grid gap-4 overflow-x-hidden overflow-y-scroll max-h-[50vh]">
        <NewCardList resultados={resultados} onAddToBudget={addToBudget} />
      </div>
    </section>
    <section className="rounded-lg p-6 space-y-4">
      <h2 className="text-lg font-medium">Composición del APU</h2>
      <div className="overflow-x-auto border rounded-lg overflow-hidden">
        <table className="w-full table-auto ">
          <thead>
            <tr className="border">
              <th className="px-4 py-2 text-left">Insumo</th>
              <th className="px-4 py-2 text-left">Cantidad</th>
              <th className="px-4 py-2 text-left">Unidad</th>
              <th className="px-4 py-2 text-left">Precio Unitario</th>
              <th className="px-4 py-2 text-left">Precio Total</th>
            </tr>
          </thead>
          <tbody>
            {budgetItems.map((item, index) => (
              <TableRow key={index}>
              <TableCell>{item.Descripcion}</TableCell>
              <TableCell>{item.cantidad}</TableCell>
              <TableCell>{item.Unidad}</TableCell>
              <TableCell>{item.cantidad * item.PrecioBase}</TableCell>
              <TableCell className="px-4 py-2 text-gray-800 dark:text-gray-300">
                <TrashIcon className="h-5 w-5 cursor-pointer text-red-600 hover:text-red-900" onClick={() => handleDeleteInsumo(index)} />
              </TableCell>
            </TableRow>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-right font-medium text-2xl">Costo Total: ${calculateTotalCost()}</div>
    </section>
  </main>
  <footer className="py-4 px-6 text-center">
    <Button variant="outline" onClick={handleSave}>
      Guardar APU
    </Button>
  </footer>
</div>);
}

export function NewItemCard({ title, unit, price, code, onAddToBudget }) {
  const handleAddClick = async () => {
    const { value: quantity } = await Swal.fire({
      title: 'Ingrese la cantidad',
      input: 'number',
      inputLabel: 'Cantidad',
      inputPlaceholder: 'Ingrese la cantidad',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || value <= 0) {
          return 'Debe ingresar una cantidad válida';
        }
      }
    });

    if (quantity) {
      onAddToBudget({ Descripcion: title, Unidad: unit, PrecioBase: price, ID: code, cantidad: quantity });
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 space-y-2 cursor-pointer">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 ml-4">{unit}</p>
      </div>
      <p className="text-gray-500 dark:text-gray-400">Precio: {price}</p>
      <p className="text-gray-500 dark:text-gray-400">Código: {code}</p>
      <Button
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md"
        onClick={handleAddClick}
        variant="def"
      >
        Agregar
      </Button>
    </div>
  );
}

export function NewCardList({ resultados, onAddToBudget }) {
  return (
    <>
      {resultados.map((item) => (
        <div key={item.ID}>
          <NewItemCard
            title={item.Descripcion}
            unit={item.Unidad}
            price={item.PrecioBase}
            code={item.ID}
            onAddToBudget={onAddToBudget}
          />
        </div>
      ))}
    </>
  );
}


export function NewTableItem({ title, unit, price, quantity, index }) {
  const totalPrice = price * quantity;

  return (
    <>
      <tr className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 border">
        <td className="border-b border-gray-200 dark:border-white px-4 py-2">{title}</td>
        <td className="border-b border-gray-200 dark:border-white px-4 py-2">{quantity}</td>
        <td className="border-b border-gray-200 dark:border-white px-4 py-2">{unit}</td>
        <td className="border-b border-gray-200 dark:border-white px-4 py-2">{price}</td>
        <td className="border-b border-gray-200 dark:border-white px-4 py-2">{totalPrice}</td>
        <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
          <TrashIcon className="h-5 w-5 cursor-pointer text-red-600 hover:text-red-900" onClick={() => handleDeleteInsumo(index)} />
        </td>
      </tr>
    </>
  );
}
