import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Proyecto from "./menus/project"
import { Navbar } from "./navbars/navbar"
import axios from "axios"
import Swal from "sweetalert2"

export function UserEditProfile() {
  const [proyectos, setProyectos] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const userResponse = await axios.get('api/user/data')
        const response = await axios.get('api/projects/get');
        setProyectos(response.data);
        setUser(userResponse.data)
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
      
    }; 
    fetchProyectos();
  }, []);


  const updateUserDataHandler = () => {
      let userData = {
        name: document.getElementById("name").value,
        lastname: document.getElementById("lastName").value,
        email: document.getElementById("email").value
      }
      let updateResponse = axios.post('api/user/update', userData)
      if (updateResponse.status == 200){
        Swal.fire("Datos del usuario actualizados exitosamente!!!")
      } else{
        Swal.fire("Error al actualizar datos del usuario: ", updateResponse.status)
      }
  }

  const updatePasswordHandler = () => {
    let userPasswordData = {
      currentPassword: document.getElementById("current-password").value,
      newPassword1: document.getElementById("confirm-password").value,
      newPassword2: document.getElementById("new-password").value
    }
    if(userPasswordData.newPassword1 === userPasswordData.newPassword2){
      let updatePassword = axios.post('api/user/update/password', userPasswordData)
      if (updatePassword.status == 200){
        Swal.fire("Contraseña actualizada exitosamete!!!")
      } else{
        Swal.fire("Error al actualizar la contraseña: ", updatePassword.status)
      }
    }else {
      Swal.fire("La contraseña no coincide")
    }
    
}
  return (
    (<div className="flex flex-col h-full bg-zinc-800 text-white">
      <Navbar/>
      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <section className="space-y-6">
            <h2 className="text-xl font-bold">Información de Usuario</h2>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" defaultValue={user.Nombre} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Apellido</Label>
                <Input id="lastName" defaultValue={user.Apellido} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.Email} />
              </div>
              <Button className="ml-auto" variant="outline" onClick={updateUserDataHandler}>Guardar cambios</Button>
            </div>
          </section>
          <section className="space-y-6">
            <h2 className="text-xl font-bold">Cambiar contraseña</h2>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Contraseña actual</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">Nueva contraseña</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button className="ml-auto" variant="outline" onClick={updatePasswordHandler}>Guardar cambios</Button>
            </div>
          </section>
          <section className="space-y-6">
            <h2 className="text-xl font-bold">Proyectos</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {proyectos.slice(0, proyectos.length).map((proyecto, index) => (
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
        </div>
      </main>
    </div>)
  );
}
