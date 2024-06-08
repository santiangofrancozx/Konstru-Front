import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

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
      const url = `api/consultaInsumo?id=${id}`;
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

  const handleSave = async () => {
    const desca = activityData.ActivityDescripcion;
    const unita = activityData.ActivityUnit;
    // const basePrice = activityData.ActivityBasePrice;
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
      const response = await axios.post('api/createapu', jsonData);
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
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Análisis de Precios Unitarios</h1>
      </header>
      <main className="flex-1 p-6 space-y-6">
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                htmlFor="descA">
                Nombre del APU
              </label>
              <input
                className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                id="descA"
                placeholder="Ingrese el nombre del APU"
                type="text"
                value={activityData.ActivityDescripcion}
                onChange={(e) => setActivityData({ ...activityData, ActivityDescripcion: e.target.value })}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                htmlFor="unitA">
                Unidad de Medida
              </label>
              <input
                className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                id="unitA"
                placeholder="Ingrese la unidad de medida"
                type="text"
                value={activityData.ActivityUnit}
                onChange={(e) => setActivityData({ ...activityData, ActivityUnit: e.target.value })}
              />
            </div>
            {/* <div>
              <label
                className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                htmlFor="basePrice">
                Precio Base
              </label>
              <input
                className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                id="basePrice"
                placeholder="Ingrese el precio base"
                type="text"
                value={activityData.ActivityBasePrice}
                onChange={(e) => setActivityData({ ...activityData, ActivityBasePrice: e.target.value })}
              />
            </div> */}
          </div>
        </section>
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
          <form className="flex items-center" onSubmit={ActivityHandler}>
            <input
              className="flex-1 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Buscar insumo"
              id="codigo"
              type="text" />
            <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md ml-4">
              Buscar
            </button>
          </form>

          <div className="grid gap-4 overflow-x-hidden overflow-y-scroll max-h-[50vh]">
            <NewCardList resultados={resultados} onAddToBudget={addToBudget} />
          </div>
        </section>
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-medium">Composición del APU</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 text-left">Insumo</th>
                  <th className="px-4 py-2 text-left">Cantidad</th>
                  <th className="px-4 py-2 text-left">Unidad</th>
                  <th className="px-4 py-2 text-left">Precio Unitario</th>
                  <th className="px-4 py-2 text-left">Precio Total</th>
                </tr>
              </thead>
              <tbody>
                {budgetItems.map((item, index) => (
                  <NewTableItem
                    key={index}
                    title={item.Descripcion}
                    unit={item.Unidad}
                    price={item.PrecioBase}
                    quantity={item.cantidad}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-right font-medium text-2xl">Costo Total: ${calculateTotalCost()}</div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-4 px-6 text-center">
        <button onClick={handleSave} className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md">
          Guardar APU
        </button>
      </footer>
    </div>
  );
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
        <h3 className="font-medium">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 ml-4">{unit}</p>
      </div>
      <p className="text-gray-500 dark:text-gray-400">Precio: {price}</p>
      <p className="text-gray-500 dark:text-gray-400">Código: {code}</p>
      <Button
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md"
        onClick={handleAddClick}
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

export function NewTableItem({ title, unit, price, quantity }) {
  const totalPrice = price * quantity;

  return (
    <>
      <tr className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
        <td className="border-b border-gray-200 dark:border-gray-600 px-4 py-2">{title}</td>
        <td className="border-b border-gray-200 dark:border-gray-600 px-4 py-2">{quantity}</td>
        <td className="border-b border-gray-200 dark:border-gray-600 px-4 py-2">{unit}</td>
        <td className="border-b border-gray-200 dark:border-gray-600 px-4 py-2">{price}</td>
        <td className="border-b border-gray-200 dark:border-gray-600 px-4 py-2">{totalPrice}</td>
      </tr>
    </>
  );
}
