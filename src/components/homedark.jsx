import { Button } from "@/components/ui/button"
import React, { useState, useEffect } from 'react';
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Proyecto from "@/components/project"
import CreateProjectDrawer from "@/components/ProjectDrawer"
import axios from 'axios';

const Homedark = () =>  {
  const [proyectos, setProyectos] = useState([]);
  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await axios.get('http://localhost:8082/projects', { withCredentials: true });
        setProyectos(response.data);
      } catch (error) {
        console.error('Error al obtener los proyectos:', error);
      }
    }; 
    fetchProyectos();
  }, []);
  return (
    (<div className="bg-gray-900 text-gray-200 font-[Roboto]">
      <header className="py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <image alt="Logo" className="h-8 mr-4" src="/logo.svg" />
            <span className="text-2xl">Awesome Konstru</span>
          </div>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-full bg-gray-700 hover:bg-gray-600 text-gray-200"
                  size="icon"
                  variant="outline">
                  <PlusIcon className="h-6 w-6" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-800 text-gray-200">
                <DropdownMenuItem>
                  <Link className="text-gray-200 hover:bg-gray-700" href="#">
                    Crear Proyecto
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link className="text-gray-200 hover:bg-gray-700" href="#">
                    Ver Proyectos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link className="text-gray-200 hover:bg-gray-700" href="#">
                    Banco de Precios
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link className="text-gray-200 hover:bg-gray-700" href="#">
                    Crear Factura
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link className="text-gray-200 hover:bg-gray-700" href="#">
                    Perfil de Usuario
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <button
              aria-label="Toggle navigation"
              className="block lg:hidden focus:outline-none"
              id="navbar-toggle">
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto my-12 px-4 sm:px-6 lg:px-8 font-[Roboto]">
        <section className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Bienvenido a Awesome Konstru</h1>
          <p className="text-gray-400 mb-6">
            Nuestra aplicación te ayuda a generar presupuestos de construcción de manera rápida y eficiente.
          </p>
          <CreateProjectDrawer buttonClassName="bg-[#FFDD00] hover:bg-[#FFD700] text-gray-900 font-bold py-3 px-6 rounded font-[Roboto_Sans]"/>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Tus Últimos Proyectos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyectos.slice(0, 3).map((proyecto, index) => (
            <Proyecto
              key={index}
              nombre={proyecto.Descripcion}
              estado={proyecto.State}
              fechaCreacion={proyecto.created_at}
            />
          ))}
          </div>
        </section>
      </main>
      <footer className="py-6 px-6 text-center font-[Roboto]">
        <p className="text-gray-400">© 2023 Awesome Konstru. Todos los derechos reservados.</p>
      </footer>
    </div>)
  );
}



function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>)
  );
}


function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>)
  );
}

export default Homedark 