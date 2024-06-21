import { APUcard } from "./apucard";
import { HammerIcon } from "lucide-react";
import { useState } from "react";
export function ItemCard({ icon: Icon, title, id, price,  onAddToBudget }) {
    const [showAPUcard, setShowAPUcard] = useState(false);
  
    const handleCardClick = () => {
      setShowAPUcard(true);
    };
  
    const handleCloseAPUcard = () => {
      setShowAPUcard(false);
    };
  
    return (
      <>
        <div
          className="bg-slate-700 shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
          onClick={handleCardClick}
        >
          <div className="flex items-center">
            <Icon className="w-8 h-8 mr-4 text-neutral-300" />
            <div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="text-gray-500 dark:text-gray-400">{id}</p>
              <p className="text-gray-500 dark:text-gray-400">{price}</p>
            </div>
          </div>
        </div>
        {showAPUcard && <APUcard onClose={handleCloseAPUcard} id={id} onAddToBudget={onAddToBudget} />}
      </>
    );
  }
  export function CardList2({ resultados, onAddToBudget }) {
    return (
      <div className="max-w-md overflow-x-hidden overflow-y-scroll max-h-[50vh]">
        <div className="flex flex-col gap-4">
          {resultados.map((item) => (
            <div key={item.ID} className="w-full">
              <ItemCard
                icon={HammerIcon}
                title={item.Descripcion}
                id={item.ID}
                price={item.PrecioBase}
                onAddToBudget={onAddToBudget}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export function CardList({ resultados, resultados2, onAddToBudget }) {
    return (
      <div className="max-w-md overflow-x-hidden overflow-y-scroll max-h-[50vh]">
        <div className="flex flex-col gap-4">
        {resultados2.map((item) => (
            <div key={item.id} className="w-full">
              <ItemCard
                icon={HammerIcon}
                title={item.Descripcion}
                id={item.ID}
                price={item.PrecioBase}
                onAddToBudget={onAddToBudget}
              />
            </div>
          ))}
          {resultados.map((item) => (
            <div key={item.id} className="w-full">
              <ItemCard
                icon={HammerIcon}
                title={item.Descripcion}
                id={item.ID}
                price={item.PrecioBase}
                onAddToBudget={onAddToBudget}
              />
            </div>
          ))}
          
        </div>
      </div>
    );
  }
  