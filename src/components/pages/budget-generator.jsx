import { useState, useEffect, useMemo, useRef} from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, TableFooter, Table } from "@/components/ui/table";
import axios from 'axios';
import Swal from 'sweetalert2';
import { CardList2 } from '../cards/ItemCard';
import { TrashIcon } from 'lucide-react';
import { SearchIcon, FilterIcon, MenuIcon, DownloadIcon, HammerIcon } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { NewItemForm } from '@/components/menus/NewItemFormDrawer'

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import BudgetTable from '../tables/budget-table';
import { DragTable } from '../tables/drag-table';

function BudgetGenerator({nameProject, idProject}) {
  const [resultados, setResultados] = useState([]);
  const [resultados2, setResultados2] = useState([]);
  const [budgetItems, setBudgetItems] = useState([]);
  const tableRef = useRef(null);


  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const activitiesProjectResponse  = await axios.get(`api/projects/activities/get?id_proyecto=${idProject}`);
        if(activitiesProjectResponse.data !== null){
          setBudgetItems(activitiesProjectResponse.data);
        }
      } catch (error) {
        console.error('Error al obtener los proyectos:', error);
      }
    };
    fetchProjectData();
  }, [idProject]);




  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Add title
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFontSize(18);
    doc.setTextColor(40);
    const textWidth = doc.getStringUnitWidth(nameProject) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const textOffset = (pageWidth - textWidth) / 2;
    doc.text(nameProject, textOffset, 22);

    // Define table columns and data
    const head = [['Descripción', 'Cantidad', 'Precio Base', 'Total']];
    const body = budgetItems.map(item => [
      item.Descripcion,
      item.Cantidad,
      item.PrecioBase.toFixed(2),
      (item.Cantidad * item.PrecioBase).toFixed(2)
    ]);

    // Add table
    doc.autoTable({
      head: head,
      body: body,
      startY: 30,
      theme: 'striped',
      headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255], fontSize: 12 },
      bodyStyles: { fontSize: 10, cellPadding: 2 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      tableLineColor: [0, 0, 0],
      tableLineWidth: 0.1,
    });

    doc.save(`${nameProject}_budget.pdf`);
  };


  const ActivityHandler = async (e) => {
    e.preventDefault();
    try {
      const id = document.getElementById('codigo').value;
      const url = `/api/activities/get?id=${id}`;
      // const url2 = "/api/activities/user/get";

      // const [response, response2] = await Promise.all([
      //   axios.get(url),
      //   axios.get(url2),
      // ]);
      const response = await axios.get(url)
      if (response.status === 200) {
        setResultados(response.data);
      } else {
        setResultados([]);
        alert('Error: ' + response.status);
      }

      // if (response2.status === 200) {
      //   setResultados2(response2.data);
      // } else {
      //   setResultados2([]);
      //   alert('Error: ' + response2.status);
      // }

    } catch (error) {
      setResultados([]);
      console.error('Error:', error);
    }
  };

  const saveBudget = async () => {
    try {
      let activities = budgetItems.map(item => ({
        "Id_activity": item.ID,
        "Quantity": parseFloat(item.Cantidad)
      }));
  
      const jsonData = {
        "Id_project": idProject,
        "Activities": activities
      };
  
      const response = await axios.put('/api/projects/activities/update', jsonData);
  
      if (response.status === 200) {
        // Handle successful response
        Swal.fire('Budget saved successfully');
      } else {
        // Handle non-successful response
        Swal.fire('Failed to save budget');
      }
    } catch (error) {
      Swal.fire('Error saving budget:', error.message);
    }
  };
  

  const addToBudget = (item) => {
    // Verificar si el item ya existe en budgetItems
    const itemExists = budgetItems.some(existingItem => {
      // Imprimir existingItem y item.ID para verificación
      console.log('existingItem:', existingItem.ID);
      console.log('item.ID:', item.ID);
      
      return existingItem.ID === item.ID;
    });
  
    // Si el item no existe, agregarlo a budgetItems
    if (!itemExists) {
      const newItem = { ...item };
      setBudgetItems(prevItems => [...prevItems, newItem]);
    } else {
      Swal.fire(`El item ${item.Descripcion} ya existe en el presupuesto.`);
      // Puedes manejar la lógica adicional para duplicados aquí si es necesario
    }
  };
  
  
  const handleDeleteInsumo = (ID) => {
    // Buscar el elemento a eliminar
    const deletedItem = budgetItems.find(item => item.ID === ID);
    // Filtrar budgetItems para excluir el elemento con el ID proporcionado
    const updatedBudgetItems = budgetItems.filter(item => item.ID !== ID);
    // Actualizar el estado con el nuevo array sin el elemento eliminado
    setBudgetItems(updatedBudgetItems);
  };
  
  

  const handleRedirectWindow = (path) => {
    window.open(path, '_blank');
  };

  const NewChapterButton = () => {
    Swal.fire({
      title: 'Ingrese el nombre del capítulo:',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar',
      preConfirm: (chapterName) => {
        if (!chapterName) {
          Swal.showValidationMessage('Debe ingresar un nombre de capítulo');
        }
        return chapterName;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const chapterName = result.value;
        const newChapter = [chapterName];
        Swal.fire('Nuevo capítulo creado:', newChapter);
        // Aquí puedes hacer lo que quieras con el nuevo array, por ejemplo, guardarlo en estado o enviarlo a otra función
      }
    });
  }
  

  return (
    <div key="1" className="flex flex-col h-screen">
      <div className="flex-1 flex flex-col lg:flex-row bg-zinc-800 text-white">
        <div className="p-4 lg:p-6 border-b lg:border-r lg:border-b-0 border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <form onSubmit={ActivityHandler}>
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input id="codigo" className="bg-zinc-500 border-none pl-10 pr-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search construction items..." type="text" />
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
          <CardList2 resultados={resultados} resultados2={resultados2} onAddToBudget={addToBudget} />
        </div>
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <input
            className="w-full rounded-md bg-zinc-500 border-gray-200 shadow-sm px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white font-bold mb-4"
            placeholder="Ingresa el nombre del proyecto"
            type="text"
            defaultValue={nameProject}
          />
          <h2 className="text-lg font-bold mb-4">
            Budget
            <Button className="ml-4" variant="outline" onClick={handleExportPDF}>
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
                <NewItemForm buttonClassName={"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 hover:bg-gray-100 hover:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-cyan-600 dark:focus:text-gray-50 dark:hover:bg-cyan-600 dark:hover:text-gray-50"} />
                <DropdownMenuItem onClick={() => handleRedirectWindow('/activity')}>New Activity</DropdownMenuItem>
                <DropdownMenuItem onClick={NewChapterButton}>
                  Nuevo Capitulo
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </h2>
          <div className="border rounded-lg overflow-hidden mb-4">
            <BudgetTable budgetItems={budgetItems} handleDeleteInsumo={handleDeleteInsumo}/>
          </div>
          <Button onClick={saveBudget} variant="outline">Save Budget</Button>
        </div>
      </div>
    </div>
    
  );
}

export default BudgetGenerator;
