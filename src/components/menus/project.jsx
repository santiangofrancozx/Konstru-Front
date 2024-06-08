import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import Link from "next/link";
// import "./project.css"; // Importa el archivo CSS aquí

const Proyecto = ({ nombre, estado, fechaCreacion, id }) => {
  const url = `/search?nameProject=${nombre}&idProject=${id}`;
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
              <button className="proyecto-menu-boton">Eliminar</button>
            </DropdownMenuItem>
            <DropdownMenuItem className="proyecto-menu-item">
              <button className="proyecto-menu-boton">Generar Reporte</button>
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
