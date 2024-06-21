import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function EditProfile() {
  return (
    (<div className="w-full max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="bg-white bg-zinc-800 shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Editar perfil</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Actualiza tu información personal.</p>
            <form className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="photo">
                  Foto de perfil
                </label>
                <div className="mt-1 flex items-center">
                  <span
                    className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <img
                      alt="Foto de perfil"
                      className="h-full w-full text-gray-300"
                      src="/placeholder.svg" />
                  </span>
                  <Button className="ml-5" variant="outline">
                    Cambiar
                  </Button>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="name">
                  Nombre
                </label>
                <div className="mt-1">
                  <Input defaultValue="John Doe" id="name" type="text" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="email">
                  Correo electrónico
                </label>
                <div className="mt-1">
                  <Input defaultValue="john@example.com" id="email" type="email" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="password">
                  Contraseña
                </label>
                <div className="mt-1">
                  <Input id="password" type="password" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="confirm-password">
                  Confirmar contraseña
                </label>
                <div className="mt-1">
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <div className="sm:col-span-6">
                <Button className="w-full" type="submit">
                  Guardar cambios
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>)
  );
}
