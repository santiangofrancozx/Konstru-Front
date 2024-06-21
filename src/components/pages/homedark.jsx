import React, { useState, useEffect } from 'react';
import Proyecto from "@/components/menus/project"
import CreateProjectDrawer from "@/components/cards/ProjectDrawer"
import axios from 'axios';
import { useRouter } from 'next/navigation';

// import Header from "./headers/ProfileHeader";
import { Navbar } from '@/components/navbars/navbar';
import { Navbar2 } from '../navbars/navbar2';

const Homedark = () =>  {
  
  const router = useRouter();
  const [proyectos, setProyectos] = useState([]);
  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await axios.get('api/projects/get');
        setProyectos(response.data);
    
      } catch (error) {
        console.error('Error al obtener los proyectos:', error);
      }
      
    }; 
    fetchProyectos();
  }, []);
  return (
    <div className="font-[Roboto] bg-zinc-800">
      {/* <Header username={user.Nombre}/> */}
      <Navbar2/>
      <main className="container mx-auto my-12 px-4 sm:px-6 lg:px-8 font-[Roboto]">
        <section className="mb-12">
          <h1 className="text-3xl font-bold mb-4 text-gray-50">Bienvenido a Awesome Konstru</h1>
          <p className="mb-6 text-gray-50">
            Nuestra aplicación te ayuda a generar presupuestos de construcción de manera rápida y eficiente.
          </p>
          <CreateProjectDrawer buttonClassName="font-bold py-3 px-6 rounded bg-cyan-700 hover:bg-cyan-600 text-white font-[Roboto_Sans]"/>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-200">Tus Últimos Proyectos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyectos.slice(0, 3).map((proyecto, index) => (
            <Proyecto
              key={index}
              nombre={proyecto.Name}
              estado={proyecto.State}
              fechaCreacion={proyecto.created_at}
              id={proyecto.IDProyecto}
            />
          ))}
          </div>
        </section>
      </main>
      <footer className="py-6 px-6 text-center text-gray-200 font-[Roboto]">
        <p>© 2023 Awesome Konstru. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Homedark;
