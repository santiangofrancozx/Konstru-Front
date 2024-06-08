import { Button } from "@/components/ui/button";
import {
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
  DrawerHeader,
  DrawerClose,
  DrawerFooter,
  DrawerContent,
  Drawer,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const CreateProjectDrawerMenuItem = ({ buttonClassName }) => {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const router = useRouter();

  const handleCreateProject = async () => {
    const projectData = {
      name,
      descripcion: description,
      valor: 0, // Actualiza este campo según sea necesario
      tipo_obra: type,
    };

    try {
      const response = await axios.post("/api/insertProject", projectData);
      console.log("Proyecto creado:", response.data);
      setIsOpen(false);
      router.push("/search");
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
    }
  };

  return (
    <>
      <DropdownMenuItem>
        <button className={buttonClassName} onClick={() => setIsOpen(true)}>
          <PlusIcon className="w-5 h-5" />
          Crear Nuevo Proyecto
        </button>
      </DropdownMenuItem>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="bg-gray-900 text-gray-50 p-6 rounded-lg shadow-lg">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold">
              Nuevo Proyecto de Construcción
            </DrawerTitle>
            <DrawerDescription className="text-gray-400">
              Ingrese los detalles de su proyecto.
            </DrawerDescription>
          </DrawerHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300" htmlFor="name">
                Nombre del Proyecto
              </Label>
              <Input
                className="bg-gray-800 border-gray-700 text-gray-50"
                id="name"
                placeholder="Ingrese el nombre del proyecto"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-gray-300" htmlFor="description">
                Descripción
              </Label>
              <Textarea
                className="bg-gray-800 border-gray-700 text-gray-50"
                id="description"
                placeholder="Ingrese la descripción del proyecto"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-gray-300" htmlFor="type">
                Tipo de Proyecto
              </Label>
              <Select
                className="bg-gray-800 border-gray-700 text-gray-50"
                id="type"
                value={type}
                onValueChange={(value) => setType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el tipo de proyecto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    className="hover:bg-gray-800 hover:text-gray-50"
                    value="residential"
                  >
                    Residencial
                  </SelectItem>
                  <SelectItem
                    className="hover:bg-gray-800 hover:text-gray-50"
                    value="commercial"
                  >
                    Comercial
                  </SelectItem>
                  <SelectItem
                    className="hover:bg-gray-800 hover:text-gray-50"
                    value="industrial"
                  >
                    Industrial
                  </SelectItem>
                  <SelectItem
                    className="hover:bg-gray-800 hover:text-gray-50"
                    value="infrastructure"
                  >
                    Infraestructura
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DrawerFooter>
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold"
              variant="primary"
              onClick={handleCreateProject}
            >
              Crear Proyecto
            </Button>
            <DrawerClose asChild>
              <Button
                className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-gray-50"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

export default CreateProjectDrawerMenuItem;
