import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
// import "./project.css"; // Importa el archivo CSS aquí

const Proyecto = ({ nombre, estado, fechaCreacion, id }) => {
  const url = `/search?nameProject=${nombre}&idProject=${id}`;

  const handleDeleteClickProject = async () => {
    // Mostrar el mensaje de confirmación con Swal
    const confirmDelete = await Swal.fire({
      title: `¿Estás seguro de borrar el proyecto: ${nombre}?`,
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
        const response = await axios.delete(`api/projects/delete?id=${id}`);
        if (response.status === 200) {
          // Mostrar un mensaje de éxito si la eliminación fue exitosa
          Swal.fire('¡Eliminado!', 'El proyecto ha sido eliminado.', 'success');
          // Aquí podrías realizar cualquier otra acción necesaria después de la eliminación
        } else {
          // Mostrar un mensaje de error si hubo algún problema con la eliminación
          Swal.fire('Error', 'Hubo un problema al eliminar el proyecto.', 'error');
        }
      } catch (error) {
        // Capturar y mostrar errores de Axios o de la petición
        console.error('Error al intentar eliminar:', error);
        Swal.fire('Error', 'Hubo un problema al intentar eliminar el proyecto.', 'error');
      }
    }
  };
  return (
    <div className="proyecto-container rounded-lg shadow-md p-6 bg-zinc-600 text-gray-200">
      <h3 className="proyecto-nombre text-lg font-bold text-white mb-2">{nombre}</h3>
      <p className="proyecto-estado mb-4">Estado: {estado ? 'true' : 'false'}</p>
      <p className="proyecto-fecha">Fecha de Creación: {fechaCreacion}</p>
      <div className="proyecto-acciones mt-4 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="proyecto-boton rounded-full" size="icon" variant="outline">
              <DotIcon className="proyecto-icono h-6 w-6" />
              <span className="sr-only">Acciones</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="proyecto-menu w-56">
            <DropdownMenuItem className="proyecto-menu-item">
              <button className="proyecto-menu-boton">
                <Link href={url}>Editar</Link>
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem className="proyecto-menu-item">
              <button onClick={handleDeleteClickProject} className="proyecto-menu-boton">Eliminar</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

function DotIcon(props) {
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
      className="proyecto-dot-icon"
    >
      <circle cx="12.1" cy="12.1" r="1" />
    </svg>
  );
}

export default Proyecto;
