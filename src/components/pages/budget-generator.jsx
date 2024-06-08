import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, TableFooter, Table } from "@/components/ui/table";
// import { DrawerClose, DrawerFooter, DrawerHeader, DrawerTitle, DrawerDescription, DrawerContent, Drawer, DrawerTrigger } from "@/components/ui/drawer";
// import { Label } from "@/components/ui/label";
// import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import axios from 'axios';
import { APUcard } from '@/components/cards/apucard';
import { TrashIcon } from 'lucide-react';
// import { Dialog, DialogTitle, DialogContent, DialogActions } from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { NewItemForm } from '@/components/menus/NewItemFormDrawer'
// import { NewActivityForm } from '@/components/NewActivityFormDrawer'
import { Navbar } from '@/components/navbars/navbar';

function BudgetGenerator({nameProject, idProject}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resultados, setResultados] = useState([]);
  const [resultados2, setResultados2] = useState([]);
  const [budgetItems, setBudgetItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showNewItemForm, setShowNewItemForm] = useState(false); 
  const [showNewActivityForm, setShowNewActivityForm] = useState(false);
  const router = useRouter();
  const ActivityHandler = async (e) => {
    e.preventDefault();
    try {
      const id = document.getElementById('codigo').value;
      const url = `/api/activities/get?id=${id}`; // Corrected URL
      const url2 = "/api/activities/user/get"; // Corrected URL
  
      const response = await axios.get(url);
      const response2 = await axios.get(url2);
  
      if (response.status === 200) {
        setResultados(response.data);
      } else {
        setResultados([]);
        alert('Error: ' + response.status);
      }
  
      if (response2.status === 200) {
        setResultados2(response2.data);
      } else {
        setResultados2([]);
        alert('Error: ' + response2.status);
      }
    } catch (error) {
      setResultados([]);
      console.error('Error:', error);
    }
  };
  
 

  useEffect(() => {
    console.log(resultados);
  }, [resultados]);

  const addToBudget = (item) => {
    setBudgetItems((prevItems) => [...prevItems, item]);
    //console.log(budgetItems)
  };

  const handleDeleteInsumo = (index) => {
    const updatedBudgetItems = [...budgetItems]; // Copia de los ítems del presupuesto
    updatedBudgetItems.splice(index, 1); // Elimina el ítem en el índice especificado
    setBudgetItems(updatedBudgetItems); // Actualiza el estado con los ítems del presupuesto actualizados
  };

  const handleToggleNewItemForm = () => {
    setShowNewItemForm(!showNewItemForm);
    setShowNewActivityForm(false);
  };
  
  const handleToggleNewActivityForm = () => {
    setShowNewActivityForm(!showNewActivityForm);
    setShowNewItemForm(false);
  };
  const handleRedirect = (path) => {
    router.push(path);
  };
  const handleRedirectWindow = (path) => {
    window.open(path, '_blank');
  };

  return (
    <div key="1" className="flex flex-col h-screen ">
      <Navbar/>
      <div className="flex-1 flex flex-col lg:flex-row dark:bg-zinc-800 bg-zinc-800 text-white">
        <div className="p-4 lg:p-6 border-b lg:border-r lg:border-b-0 border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <form onSubmit={ActivityHandler}>
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input id="codigo" className="bg-gray-800 border-none pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search construction items..." type="text" />
              </form>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="ml-4" variant="outline">
                  <FilterIcon className="w-4 h-4 mr-2" />
                  Filter by Category
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem>Tools</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Materials</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Equipment</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Accessories</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <h2 className="text-lg font-bold mb-4">Construction Activities</h2>
          <div>
            <CardList2 resultados={resultados} resultados2={resultados2} onAddToBudget={addToBudget} />
          </div>
          {/* <div>
            <CardList resultados={resultados2} onAddToBudget={addToBudget} />
          </div> */}
        </div>
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">
            Budget
            <Button className="ml-4" variant="outline">
              <DownloadIcon className="w-4 h-4 mr-2" />
              Export
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="ml-4" size="sm" variant="outline">
                <MenuIcon className="w-4 h-4 mr-2" />
                  Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <NewItemForm buttonClassName={"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 hover:bg-gray-100 hover:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-cyan-600 dark:focus:text-gray-50 dark:hover:bg-cyan-600 dark:hover:text-gray-50"}/>
                <DropdownMenuItem onClick={()=> handleRedirectWindow('/activity')}>New Activity</DropdownMenuItem>
                <DropdownMenuItem onClick={()=> handleRedirect('/home')}>Home</DropdownMenuItem>
                <DropdownMenuItem>About</DropdownMenuItem>
                <DropdownMenuItem>Services</DropdownMenuItem>
                <DropdownMenuItem>Contact</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>  
          </h2>
          <h2 className="text-lg font-bold mb-4">{nameProject}</h2>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budgetItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.descripcion}</TableCell>
                    <TableCell>{item.cantidad}</TableCell>
                    <TableCell>{item.precio}</TableCell>
                    <TableCell>{item.cantidad * item.precio}</TableCell>
                    <TableCell className="px-4 py-2 text-gray-800 dark:text-gray-300">
                      <TrashIcon className="h-5 w-5 cursor-pointer text-red-600 hover:text-red-900" onClick={() => handleDeleteInsumo(index)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3} className="font-bold">Total</TableCell>
                  <TableCell className="font-bold">
                    ${(budgetItems.reduce((sum, item) => sum + (item.cantidad * item.precio), 0)).toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
    </div>
    
  );
}


function DownloadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>)
  );
}


function DrillIcon(props) {
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
      <path d="M14 9c0 .6-.4 1-1 1H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9c.6 0 1 .4 1 1Z" />
      <path d="M18 6h4" />
      <path d="M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3" />
      <path d="m5 10-2 8" />
      <path d="M12 10v3c0 .6-.4 1-1 1H8" />
      <path d="m7 18 2-8" />
      <path d="M5 22c-1.7 0-3-1.3-3-3 0-.6.4-1 1-1h7c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1Z" />
    </svg>)
  );
}


function FilterIcon(props) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>)
  );
}


function HammerIcon(props) {
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
      <path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9" />
      <path d="m18 15 4-4" />
      <path
        d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5" />
    </svg>)
  );
}


function PencilIcon(props) {
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
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
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


function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>)
  );
}



function SwordIcon(props) {
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
      <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
      <line x1="13" x2="19" y1="19" y2="13" />
      <line x1="16" x2="20" y1="16" y2="20" />
      <line x1="19" x2="21" y1="21" y2="19" />
    </svg>)
  );
}
function MenuIcon(props) {
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
      strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon(props) {
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
      strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// function NewItemForm({onClose}) {
//   return (
//     <>
//       <DrawerHeader>
//         <DrawerTitle>Add New Construction Item</DrawerTitle>
//         <DrawerDescription>Enter the details for the new construction item.</DrawerDescription>
//       </DrawerHeader>
//       <div className="px-4">
//         <form className="space-y-4">
//           <div className="grid gap-2">
//             <Label htmlFor="description">Description</Label>
//             <Input id="description" placeholder="Enter item description" />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="unit">Unit</Label>
//               <Input id="unit" placeholder="Enter unit" />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="price">Price</Label>
//               <Input id="price" placeholder="Enter price" type="number" />
//             </div>
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="category">Category</Label>
//             <Select defaultValue="tools" id="category">
//               <SelectTrigger>
//                 <SelectValue placeholder="Select category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="tools">Tools</SelectItem>
//                 <SelectItem value="materials">Materials</SelectItem>
//                 <SelectItem value="equipment">Equipment</SelectItem>
//                 <SelectItem value="accessories">Accessories</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </form>
//       </div>
//       <DrawerFooter>
//         <Button>Save Item</Button>
//         <DrawerClose asChild>
//           <Button onClick={onClose} variant="outline">Cancel</Button>
//         </DrawerClose>
//       </DrawerFooter>
//     </>
//   );
// }
function TableHeaderCell({ children }) {
  return (
    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  );
}


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
        className="bg-white dark:bg-slate-700 shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
export function CardList2({ resultados, resultados2, onAddToBudget }) {
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
        {resultados2.map((item) => (
          <div key={item.ID} className="w-full">
            <ItemCard
              icon={HammerIcon}
              title={item.Descripcion}
              id={item.ID_Actividad_Usuario}
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




export default BudgetGenerator;
