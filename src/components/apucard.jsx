import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"

export function APUcard() {
  return (
    (<Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Actividad de Presupuesto</CardTitle>
        <CardDescription>Esta actividad de presupuesto incluye los siguientes conceptos:</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Agregar
                <PlusIcon className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Agregar Capítulo</DropdownMenuItem>
              <DropdownMenuItem>Crear</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center space-x-2">
            <Checkbox id="create-memo" />
            <Label htmlFor="create-memo">Crear Memoria</Label>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Concepto</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Unidad</TableHead>
              <TableHead>Precio Unitario</TableHead>
              <TableHead>Precio Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Mano de Obra</TableCell>
              <TableCell>100</TableCell>
              <TableCell>Horas</TableCell>
              <TableCell>$20.00</TableCell>
              <TableCell>$2,000.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Materiales</TableCell>
              <TableCell>500</TableCell>
              <TableCell>Unidades</TableCell>
              <TableCell>$5.00</TableCell>
              <TableCell>$2,500.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Equipos</TableCell>
              <TableCell>50</TableCell>
              <TableCell>Horas</TableCell>
              <TableCell>$30.00</TableCell>
              <TableCell>$1,500.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>)
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
