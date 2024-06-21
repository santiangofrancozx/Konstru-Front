export function CardNameProject({name}) {
  return (
    (<div className="bg-zinc-700 rounded-lg shadow-md p-2 max-w-sm">
      <h2 className="text-2xl font-bold mb-4 text-white">{name}</h2>
      <div className="relative">
        <input
          className="w-full rounded-md bg-zinc-800 border-gray-200 shadow-sm px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ingresa el nombre del proyecto"
          type="text" />
      </div>
    </div>)
  );
}
