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
    const [description, setDescription] = useState("");
    const [unit, setUnit] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("tools");

    const InsumoHandler = async (e) => {
        e.preventDefault();

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
                resetForm(); // Resetear el formulario después de guardar
            } else {
                Swal.fire('Error!', 'Hubo un problema al guardar el insumo.', 'error');
            }
        } catch (error) {
            Swal.fire('Error!', 'Hubo un problema al guardar el insumo.', 'error');
        }
    };

    const resetForm = () => {
        setDescription("");
        setUnit("");
        setPrice("");
        setCategory("tools");
    };

    const handleOpenChange = (open) => {
        setIsOpen(open);
        if (open) {
            resetForm(); // Resetear el formulario cuando se abre
        }
    };

    return (
        <Drawer open={isOpen} onOpenChange={handleOpenChange}>
            <DrawerTrigger asChild>
                <Button className="m-4" variant="outline" onClick={() => setIsOpen(true)}>
                    Crear Insumo
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Añadir nuevo insumo de construcción</DrawerTitle>
                    <DrawerDescription>Ingresa los detalles para el nuevo insumo de construcción.</DrawerDescription>
                </DrawerHeader>
                <div className="px-4">
                    <form onSubmit={InsumoHandler} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="description">Descripción</Label>
                            <Input
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Ingresa la descripciónn del insumo"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="unit">Unidad</Label>
                                <Input
                                    id="unit"
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value)}
                                    placeholder="Ingrese la unidad de medida"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="price">Precio</Label>
                                <Input
                                    id="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Ingresa el precio"
                                    type="number"
                                    min="0"
                                    step="any"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Categoría</Label>
                            <Select
                                value={category}
                                onValueChange={(value) => setCategory(value)}
                                id="category"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar categoría" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="tools">Herramientas</SelectItem>
                                    <SelectItem value="materials">Materiales</SelectItem>
                                    <SelectItem value="equipment">Equipos</SelectItem>
                                    <SelectItem value="accessories">Accesorios</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <DrawerFooter>
                            <Button type="submit" variant="outline">Guardar insumo</Button>
                            <DrawerClose asChild>
                                <Button type="button" onClick={() => setIsOpen(false)} variant="cancels">Cancelar</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
