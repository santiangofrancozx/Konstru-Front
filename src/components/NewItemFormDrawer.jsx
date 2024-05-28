import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DrawerClose, DrawerFooter, DrawerHeader, DrawerTitle, DrawerDescription, DrawerContent, Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";


export function NewItemForm({buttonClassName}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <button className={buttonClassName} onClick={() => setIsOpen(true)}>
          Crear Insumo
        </button>
      </DrawerTrigger>
        <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add New Construction Item</DrawerTitle>
          <DrawerDescription>Enter the details for the new construction item.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <form className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Enter item description" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="unit">Unit</Label>
                <Input id="unit" placeholder="Enter unit" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" placeholder="Enter price" type="number" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select defaultValue="tools" id="category">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tools">Tools</SelectItem>
                  <SelectItem value="materials">Materials</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Save Item</Button>
          <DrawerClose asChild>
            <Button onClick={() => setIsOpen(false)} variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
        </DrawerContent>
        
      </Drawer>
    );
  }