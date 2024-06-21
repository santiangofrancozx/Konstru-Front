import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DrawerClose, DrawerFooter, DrawerHeader, DrawerTitle, DrawerDescription, DrawerContent, Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import Swal from 'sweetalert2';
import axios from "axios";

export function NewItemForm({ buttonClassName }) {
    const [isOpen, setIsOpen] = useState(false);
    const [category, setCategory] = useState("tools");

    const InsumoHandler = async (e) => {
        e.preventDefault();
        const description = document.getElementById("description").value;
        const unit = document.getElementById("unit").value;
        const price = document.getElementById("price").value;

        // Validaciones
        if (!description || !unit || !price) {
            Swal.fire('Error!', 'Todos los campos son obligatorios.', 'error');
            return;
        }

        if (isNaN(price) || parseFloat(price) <= 0) {
            Swal.fire('Error!', 'El precio debe ser un número positivo.', 'error');
            return;
        }

        const jsonData = {
            Descripcion: description,
            Unidad: unit,
            Precio_Base: parseFloat(price), // Asegurarse de que el precio se envíe como número
            Categoria: category
        };

        try {
            const response = await axios.post('/api/insumos', jsonData);
            if (response.status === 200) {
                setIsOpen(false); // Cerrar el Drawer si el insumo se guarda correctamente
                Swal.fire('Guardado!', 'El insumo se ha guardado correctamente.', 'success');
            } else {
                Swal.fire('Error!', 'Hubo un problema al guardar el insumo.', 'error');
            }
        } catch (error) {
            Swal.fire('Error!', 'Hubo un problema al guardar el insumo.', 'error');
        }
    };

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
                <button className={buttonClassName} onClick={() => setIsOpen(true)}>
                    Crear Insumo
                </button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Add New Construction Item</DrawerTitle>
                    <DrawerDescription>Enter the details for the new construction item.</DrawerDescription>
                </DrawerHeader>
                <div className="px-4">
                    <form onSubmit={InsumoHandler} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" placeholder="Enter item description" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="unit">Unit</Label>
                                <Input id="unit" placeholder="Enter unit" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="price">Price</Label>
                                <Input id="price" placeholder="Enter price" type="number" min="0" step="any" required />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <Select defaultValue="tools" id="category" onValueChange={(value) => setCategory(value)}>
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
                        <DrawerFooter>
                            <Button type="submit" variant="outline">Save Item</Button>
                            <DrawerClose asChild>
                                <Button type="button" onClick={() => setIsOpen(false)} variant="cancels">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
