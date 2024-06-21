import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

function EditorApus({ id, onClose }) {
  const [apuName, setApuName] = useState("");
  const [apuUnit, setApuUnit] = useState("");
  const [apuItems, setApuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [apuResponse, insumosResponse] = await Promise.all([
          axios.get(`api/activities/apu/get?id=${id}`),
          axios.get("api/insumos")
        ]);

        const apuData = apuResponse.data;
        setApuItems(apuData.Insumos || []);
        setApuName(apuData.Descripcion || "");
        setApuUnit(apuData.Unidad || "");
        setSearchResults(insumosResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleApuNameChange = (e) => {
    setApuName(e.target.value);
  };

  const handleApuUnitChange = (e) => {
    setApuUnit(e.target.value);
  };

  const handleItemQuantityChange = (id, quantity) => {
    setApuItems(
      apuItems.map((item) =>
        item.ID === id ? { ...item, Cantidad: parseFloat(quantity) || 0 } : item
      )
    );
  };

  const handleItemDelete = (id) => {
    setApuItems(apuItems.filter((item) => item.ID !== id));
  };

  const handleItemAdd = (item) => {
    setApuItems([...apuItems, { ...item, Cantidad: 1 }]);
    setSearchTerm("");
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const calculateTotalPrice = () => {
    let totalPrice = apuItems.reduce((total, item) => {
      return total + item.Cantidad * item.PrecioBase;
    }, 0);
    return totalPrice.toFixed(2); // Redondear el total a 2 decimales
  };

  const updateApuHandler = async () => {
    let apuItemsList = apuItems.map((item) => ({
      insumo_id: item.ID,
      cantidad: item.Cantidad
    }));

    let updateApu = {
      ID: id,
      ActivityDescripcion: apuName,
      ActivityUnit: apuUnit,
      ActivityBasePrice: parseFloat(calculateTotalPrice()),
      APU: apuItemsList
    };

    try {
      let response = await axios.put('api/apu/update', updateApu);
      if (response.status === 200) {
        Swal.fire("APU actualizada con éxito");
      } else {
        Swal.fire("Error al actualizar APU");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      Swal.fire("Error al actualizar APU");
    }
  };

  const filteredSearchResults = searchResults.filter((item) =>
    item.Descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full h-full max-h-screen max-w-screen-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit APU</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[calc(100vh-16rem)]">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="apuName">APU Name</Label>
              <Input
                id="apuName"
                value={apuName}
                onChange={handleApuNameChange}
                className="w-full bg-zinc-700 px-3 py-2 rounded"
              />
            </div>
            <div>
              <Label htmlFor="apuUnit">Unit</Label>
              <Input
                id="apuUnit"
                value={apuUnit}
                onChange={handleApuUnitChange}
                className="w-full bg-zinc-700 px-3 py-2 rounded"
              />
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Inputs</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Insumo</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Unidad</TableHead>
                    <TableHead>Precio unitario</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apuItems.map((item) => (
                    <TableRow key={item.ID}>
                      <TableCell>{item.Descripcion}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.Cantidad}
                          onChange={(e) => handleItemQuantityChange(item.ID, e.target.value)}
                          className="w-full bg-zinc-700 px-3 py-2 rounded"
                        />
                      </TableCell>
                      <TableCell>{item.Unidad}</TableCell>
                      <TableCell>${item.PrecioBase}</TableCell>
                      <TableCell>${(item.Cantidad * item.PrecioBase).toFixed(2)}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="small"
                          onClick={() => handleItemDelete(item.ID)}
                          className="flex items-center"
                        >
                          <TrashIcon className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan="4" className="font-bold text-right">Total:</TableCell>
                    <TableCell className="font-bold">${calculateTotalPrice()}</TableCell>
                    <TableCell></TableCell> {/* Empty cell for Actions column */}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Add New Input</h2>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for an item..."
                value={searchTerm}
                onChange={handleSearchTermChange}
                className="w-full bg-zinc-700 px-3 py-2 rounded"
              />
              {filteredSearchResults.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-zinc-800 shadow-lg rounded-md mt-2 mb-4 z-10 max-h-48 overflow-y-auto">
                  {filteredSearchResults.map((item) => (
                    <div
                      key={item.ID}
                      className="p-4 hover:bg-zinc-600 cursor-pointer"
                      onClick={() => handleItemAdd(item)}
                    >
                      <div className="flex">
                        <div className="flex-1">
                          <h3 className="font-bold">{item.Descripcion}</h3>
                          <p className="text-gray-500">{item.Unidad}</p>
                        </div>
                        <div className="flex-1 text-right">
                          <p className="text-gray-500">${item.PrecioBase}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center p-4 border-t">
          <Button variant="outline" onClick={updateApuHandler}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditorApus;
