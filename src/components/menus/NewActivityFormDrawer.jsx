import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DrawerClose, DrawerFooter, DrawerHeader, DrawerTitle, DrawerDescription, DrawerContent, Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, TableFooter, Table } from "@/components/ui/table";
import { TrashIcon } from 'lucide-react';
import { Card } from "@/components/ui/card";
import {CardList, ItemCard} from "@/components/pages/budget-generator"
import axios from 'axios';
import { fromJSON } from "postcss";


export function NewActivityForm({buttonClassName}) {
    const [insumos, setInsumos] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [foundInsumos, setFoundInsumos] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [budgetItems, setBudgetItems] = useState([]);

    const addToBudget = (item) => {
        setBudgetItems((prevItems) => [...prevItems, item]);
        //console.log(budgetItems)
      };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
          const id = document.getElementById("codigo").value;
          const url = `api/consultaActividad?id=${id}`;
          const response = await axios.get(url);
      
          if (response.status === 200) {
            setFoundInsumos(response.data);
          } else {
            setFoundInsumos([]);
            alert('Error: ' + response.status);
          }
        } catch (error) {
            setFoundInsumos([]);
          console.error('Error:', error);
        }
      };
  
    // const handleSearch = () => {
    //   // Placeholder for search function
    //   const results = []; // Fetch insumos based on searchQuery
    //   setFoundInsumos(results);
    // };
  
    const addInsumo = (insumo) => {
      setInsumos([...insumos, insumo]);
    };
    
    return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
        <button className={buttonClassName} onClick={() => setIsOpen(true)}>
          Crear Actividad
        </button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[100vh]">
        <DrawerHeader>
          <DrawerTitle>Add New Construction Activity</DrawerTitle>
          <DrawerDescription>Enter the details for the new construction activity.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 overflow-y-auto" style={{ maxHeight: '70vh' }}>
          <form className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Enter item description" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="unit">Unit</Label>
                <Input id="unit" placeholder="Enter unit" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" placeholder="Enter price" type="number" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue="tools" id="category">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tools">Tools</SelectItem>
                  <SelectItem value="materials">Materials</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="searchInsumo">Search Insumo</Label>
              <Input
                id="codigo"
                placeholder="Search for an insumo"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button onClick={handleSearch}>Search</Button>
            </div>
            <div className="grid gap-4 max-h-[27vh] overflow-y-auto">
              {foundInsumos.map((insumo) => (
                <Card key={insumo.ID} className="flex items-center p-4">
                  <HammerIcon className="w-8 h-8 mr-4 text-blue-500" />
                  <div>
                    <h3 className="text-lg font-bold ">{insumo.Descripcion}</h3>
                    <p className="text-gray-500">${insumo.PrecioBase.toFixed(2)}</p>
                  </div>
                  <Button className="ml-auto" onClick={() => addInsumo(insumo)}>Add</Button>
                </Card>
                
              ))}
            </div>
            <div className="grid gap-2">
              <Label>Added Insumos</Label>

              <Table className="min-w-full divide-y divide-gray-200">
                <TableHead className="bg-gray-50">
                  <TableRow>
                    <TableHeaderCell>ID</TableHeaderCell>
                    <TableHeaderCell>Description</TableHeaderCell>
                    <TableHeaderCell>Unit</TableHeaderCell>
                    <TableHeaderCell>Price</TableHeaderCell>
                    <TableHeaderCell>Classification</TableHeaderCell>
                    <TableHeaderCell>Action</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody className="bg-white divide-y divide-gray-200">
                  {insumos.map((insumo) => (
                    <TableRow key={insumo.ID}>
                      <TableCell className="px-4 py-2">{insumo.ID}</TableCell>
                      <TableCell className="px-4 py-2">{insumo.Descripcion}</TableCell>
                      <TableCell className="px-4 py-2">{insumo.Unidad}</TableCell>
                      <TableCell className="px-4 py-2">${insumo.PrecioBase.toFixed(2)}</TableCell>
                      <TableCell className="px-4 py-2">{insumo.Clasificacion}</TableCell>
                      <TableCell className="px-4 py-2 text-gray-800 dark:text-gray-300">
                        <TrashIcon className="h-5 w-5 cursor-pointer text-red-600 hover:text-red-900" onClick={() => handleDeleteInsumo(index)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Save Activity</Button>
          <DrawerClose asChild>
            <Button onClick={() => setIsOpen(false)} variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
        </DrawerContent>
        
      </Drawer>
    );
}
function TableHeaderCell({ children }) {
    return (
      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {children}
      </th>
    );
  }

  function HammerIcon(props) {
    return (
      (<svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9" />
        <path d="m18 15 4-4" />
        <path
          d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5" />
      </svg>)
    );
  }