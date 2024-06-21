'use client'
import Homedark from '@/components/pages/homedark'; // Ruta absoluta al componente homee
import PrivateRoute from "@/components/auth/PrivateRoute";

export default function HomePage() {
  return (
    <div>
      <PrivateRoute>
        <Homedark /> 
      </PrivateRoute>
    </div>
  );
}
// 'use client'
// import React, { useMemo, useState } from "react";
// import { DragTable } from "@/components/tables/drag-table"; // Asegúrate de que la ruta sea correcta

// export default function Home() {
//   const columns = useMemo(
//     () => [
//       { Header: "ID", accessor: "id" },
//       { Header: "Nombre", accessor: "nombre" },
//       { Header: "Descripción", accessor: "descripcion" },
//     ],
//     []
//   );

//   const [data, setData] = useState([
//     { id: 1, nombre: "Ejemplo 1", descripcion: "Descripción del Ejemplo 1" },
//     { id: 2, nombre: "Ejemplo 2", descripcion: "Descripción del Ejemplo 2" },
//     { id: 3, nombre: "Ejemplo 3", descripcion: "Descripción del Ejemplo 3" },
//     { id: 4, nombre: "Ejemplo 4", descripcion: "Descripción del Ejemplo 4" },
//   ]);

//   return (
//     <div>
//       <h1>Tabla Arrastrable en Next.js</h1>
//       <DragTable columns={columns} data={data} setData={setData} />
//     </div>
//   );
// }


