import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
const Proyecto = ({ nombre, estado, fechaCreacion }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-2 text-gray-200">{nombre}</h3>
      <p className="text-gray-400 mb-4">Estado: {estado ? 'true' : 'false'}</p>
      <p className="text-gray-400">Fecha de Creación: {fechaCreacion}</p>
      <div className="mt-4 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              className="rounded-full bg-gray-700 hover:bg-gray-600 text-gray-200"
              size="icon"
              variant="outline">
              <DotIcon className="h-6 w-6" />
              <span className="sr-only">Acciones</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-gray-800 text-gray-200">
            <DropdownMenuItem>
              <button className="text-gray-200 hover:bg-gray-700">
                Editar
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button className="text-gray-200 hover:bg-gray-700">
                Eliminar
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button className="text-gray-200 hover:bg-gray-700">
                Generar Reporte
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

function DotIcon(props) {
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
        <circle cx="12.1" cy="12.1" r="1" />
      </svg>)
    );
  }

export default Proyecto;
