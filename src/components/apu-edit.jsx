import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
import axios from "axios";
import { APUcard2 } from "./cards/apucard";
import { EditorApus } from "./editor-apus";
import { TrashIcon, LayoutGridIcon, ListIcon, FilePenIcon, Link } from "lucide-react";
import { Navbar } from "./navbars/navbar";
import { Router } from "next/router";
import { useRouter } from 'next/navigation'

export function ApuEdit() {
  const [resultados, setResultados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [id, setId] = useState("");
  const [showAPUcard, setShowAPUcard] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const fetchApus = async () => {
      try {
        const activitiesResponse = await axios.get("api/activities/my/get");
        if (activitiesResponse.data !== null) {
          setResultados(activitiesResponse.data);
        }
      } catch (error) {
        Swal.fire('Error al obtener los proyectos:', error);
      }
    };
    fetchApus();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  const handleEditClick = (code) => {
    setId(code);
    setShowAPUcard(true);
  };

  
  const handleDeleteClick = async (ids, name) => {
    // Mostrar el mensaje de confirmación con Swal
    const confirmDelete = await Swal.fire({
      title: `¿Estás seguro de borrar la actividad: ${name}?`,
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrarlo',
      cancelButtonText: 'Cancelar'
    });
  
    // Si el usuario confirma la eliminación
    if (confirmDelete.isConfirmed) {
      try {
        // Realizar la petición DELETE utilizando Axios
        const response = await axios.delete(`api/activities/delete?id=${ids}`);
        if (response.status === 200) {
          // Mostrar un mensaje de éxito si la eliminación fue exitosa
          Swal.fire('¡Eliminado!', 'La actividad ha sido eliminada.', 'success');
          // Aquí podrías realizar cualquier otra acción necesaria después de la eliminación
        } else {
          // Mostrar un mensaje de error si hubo algún problema con la eliminación
          Swal.fire('Error', 'Hubo un problema al eliminar la actividad.', 'error');
        }
      } catch (error) {
        // Capturar y mostrar errores de Axios o de la petición
        console.error('Error al intentar eliminar:', error);
        Swal.fire('Error', 'Hubo un problema al intentar eliminar la actividad.', 'error');
      }
    }
  };

  const handleCloseAPUcard = () => {
    setShowAPUcard(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-zinc-800 text-white">
      <Navbar/>
      <main className="flex-1 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Vista de APU</h1>
            <Button variant="outline" onClick={() => router.push('/activity')}>Crear APU</Button>
          </div>
          <div className="bg-zinc-700 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Input
                  type="search"
                  placeholder="Buscar APU..."
                  className="max-w-mb"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <div className="flex items-center gap-2">
                {/* Botones para cambiar vista (Grid y List) */}
                <Button variant="outline" size="icon">
                  <LayoutGridIcon className="h-4 w-4" />
                  <span className="sr-only">Vista de columnas</span>
                </Button>
                <Button variant="outline" size="icon">
                  <ListIcon className="h-4 w-4" />
                  <span className="sr-only">Lista</span>
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto max-h-screen overflow-y-scroll">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100/20 text-gray-500 dark:bg-gray-800/20 dark:text-gray-400">
                    <th className="px-4 py-3 text-left">Nombre</th>
                    <th className="px-4 py-3 text-left">Código</th>
                    <th className="px-4 py-3 text-left">Unidad</th>
                    <th className="px-4 py-3 text-left">Precio</th>
                    <th className="px-4 py-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {resultados
                    .filter((item) =>
                      item.Descripcion.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((item, index) => (
                      <TableRow
                        key={index}
                        name={item.Descripcion}
                        code={item.ID}
                        unit={item.Unidad}
                        price={item.PrecioBase}
                        onEditClick={() => handleEditClick(item.ID)}
                        onDeleteClick={() => handleDeleteClick(item.ID, item.Descripcion)}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      {showAPUcard && <APUcard2 onClose={handleCloseAPUcard} id={id}/>}
    </div>
  );
}

const TableRow = ({ name, code, unit, price, onEditClick, onDeleteClick }) => {
  return (
    <tr className="border-b border-gray-100/20 hover:bg-gray-100/10 dark:border-gray-800/20 dark:hover:bg-gray-800/10">
      <td className="px-4 py-3 font-medium">{name}</td>
      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{code}</td>
      <td className="px-4 py-3">{unit}</td>
      <td className="px-4 py-3">{price}</td>
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" size="icon" onClick={onEditClick}>
            <FilePenIcon className="h-4 w-4" />
            <span className="sr-only">Editar</span>
          </Button>
          <Button variant="outline" size="icon" onClick={onDeleteClick}>
            <TrashIcon className="h-5 w-5 cursor-pointer text-red-600 hover:text-red-900" />
            <span className="sr-only">Eliminar</span>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ApuEdit;
