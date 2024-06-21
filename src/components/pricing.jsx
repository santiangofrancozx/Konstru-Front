import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import autoTable plugin for jsPDF
import { Navbar } from "./navbars/navbar";

export function Pricing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const tableRef = useRef(null);

  // Cargar los productos desde la API al montar el componente
  useEffect(() => {
    axios.get("api/insumos")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddToCart = (product) => {
    setCart([...cart, { ...product, cantidad: 1 }]);
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const handleQuantityChange = (e, index) => {
    const newCart = [...cart];
    newCart[index].cantidad = parseInt(e.target.value, 10);
    setCart(newCart);
  };

  const calculateTotal = (product) => {
    const item = cart.find(item => item.ID === product.ID);
    if (!item) return 0;
    return (item.PrecioBase * item.cantidad).toFixed(2);
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();

    // Add title
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFontSize(18);
    doc.setTextColor(40);
    const textWidth = doc.getStringUnitWidth("Lista de Compras") * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const textOffset = (pageWidth - textWidth) / 2;
    doc.text("Lista de Compras", textOffset, 22);

    // Define table columns and data
    const headers = ['Producto', 'Precio', 'Cantidad', 'Total'];
    const data = cart.map(product => [
      product.Descripcion,
      `$${product.PrecioBase.toFixed(2)}`,
      product.cantidad,
      `$${calculateTotal(product)}`
    ]);

    // Add table using autoTable plugin
    doc.autoTable({
      head: [headers],
      body: data,
      startY: 30,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255], fontSize: 12 },
      bodyStyles: { fontSize: 10, cellPadding: 2 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
    });

    doc.save("lista_de_compras.pdf");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 text-white">
      <div className="p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Buscar productos</h2>
        <div className="relative">
          <Input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-8 w-full"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mt-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {products.filter(product => product.Descripcion.toLowerCase().includes(searchTerm.toLowerCase())).map(product => (
            <div
              key={product.ID}
              className="bg-slate-700 p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h3 className="text-lg font-bold text-white">{product.Descripcion}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{product.Descripcion}</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-900 font-bold dark:text-gray-200">${product.PrecioBase.toFixed(2)}</span>
                <Button size="sm" onClick={() => handleAddToCart(product)} variant="outline">
                  Agregar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Lista de compras</h2>
        <Table ref={tableRef}>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Total</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{product.Descripcion}</TableCell>
                <TableCell>${product.PrecioBase.toFixed(2)}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min={0}
                    value={product.cantidad}
                    onChange={(e) => handleQuantityChange(e, index)}
                    className="w-20"
                  />
                </TableCell>
                <TableCell>${calculateTotal(product)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveFromCart(index)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end mt-4">
          <Button onClick={handleExportToPDF} size="lg" variant="outline">Guardar lista</Button>
        </div>
      </div>
    </div>
  );
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function Trash2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}
