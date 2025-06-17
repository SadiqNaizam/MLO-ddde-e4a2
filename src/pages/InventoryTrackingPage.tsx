import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For any internal page links if needed
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { PlusCircle, Edit3 } from 'lucide-react';

// Custom Components
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';
import IngredientListItem from '@/components/IngredientListItem';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Define Ingredient type
interface Ingredient {
  id: string;
  name: string;
  currentQuantity: number;
  unit: string;
  reorderPoint?: number;
}

// Zod schema for adding/editing an ingredient
const ingredientFormSchema = z.object({
  name: z.string().min(2, { message: "Ingredient name must be at least 2 characters." }),
  currentQuantity: z.coerce.number().min(0, { message: "Quantity must be a non-negative number." }),
  unit: z.string().min(1, { message: "Please select a unit." }),
  reorderPoint: z.coerce.number().min(0, { message: "Reorder point must be non-negative." }).optional().or(z.literal('')), // Allow empty string, coerce to number
});

type IngredientFormData = z.infer<typeof ingredientFormSchema>;

// Zod schema for updating stock
const updateStockFormSchema = z.object({
  newQuantity: z.coerce.number().min(0, { message: "Quantity must be a non-negative number." }),
});
type UpdateStockFormData = z.infer<typeof updateStockFormSchema>;

// Sample ingredient units
const ingredientUnits = ["g", "kg", "ml", "l", "pcs", "tbsp", "tsp", "cup"];

const InventoryTrackingPage: React.FC = () => {
  console.log('InventoryTrackingPage loaded');

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: 'Organic Spelt Flour', currentQuantity: 5000, unit: 'g', reorderPoint: 1000 },
    { id: '2', name: 'Vanilla Extract', currentQuantity: 50, unit: 'ml', reorderPoint: 100 },
    { id: '3', name: 'Belgian Chocolate Chips', currentQuantity: 800, unit: 'g', reorderPoint: 200 },
    { id: '4', name: 'Fresh Yeast', currentQuantity: 20, unit: 'g', reorderPoint: 50 },
    { id: '5', name: 'Unsalted Butter', currentQuantity: 1000, unit: 'g', reorderPoint: 500 },
  ]);

  const [isAddIngredientDialogOpen, setIsAddIngredientDialogOpen] = useState(false);
  const [isUpdateStockDialogOpen, setIsUpdateStockDialogOpen] = useState(false);
  const [ingredientToUpdate, setIngredientToUpdate] = useState<Ingredient | null>(null);

  const addIngredientForm = useForm<IngredientFormData>({
    resolver: zodResolver(ingredientFormSchema),
    defaultValues: {
      name: "",
      currentQuantity: 0,
      unit: "",
      reorderPoint: undefined,
    },
  });

  const updateStockForm = useForm<UpdateStockFormData>({
    resolver: zodResolver(updateStockFormSchema),
    defaultValues: {
      newQuantity: 0,
    },
  });

  useEffect(() => {
    // Pre-fill update form when ingredientToUpdate changes
    if (ingredientToUpdate) {
      updateStockForm.reset({ newQuantity: ingredientToUpdate.currentQuantity });
    }
  }, [ingredientToUpdate, updateStockForm]);

  const handleAddIngredientSubmit = (data: IngredientFormData) => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(), // Simple ID generation
      name: data.name,
      currentQuantity: data.currentQuantity,
      unit: data.unit,
      reorderPoint: data.reorderPoint ? Number(data.reorderPoint) : undefined,
    };
    setIngredients(prev => [newIngredient, ...prev]);
    toast.success(`"${newIngredient.name}" added to inventory.`);
    setIsAddIngredientDialogOpen(false);
    addIngredientForm.reset();
  };

  const handleOpenUpdateStockDialog = (ingredientId: string | number) => {
    const ingredient = ingredients.find(ing => ing.id === ingredientId.toString());
    if (ingredient) {
      setIngredientToUpdate(ingredient);
      setIsUpdateStockDialogOpen(true);
    }
  };

  const handleUpdateStockSubmit = (data: UpdateStockFormData) => {
    if (!ingredientToUpdate) return;
    setIngredients(prev =>
      prev.map(ing =>
        ing.id === ingredientToUpdate.id ? { ...ing, currentQuantity: data.newQuantity } : ing
      )
    );
    toast.success(`Stock for "${ingredientToUpdate.name}" updated to ${data.newQuantity} ${ingredientToUpdate.unit}.`);
    setIsUpdateStockDialogOpen(false);
    setIngredientToUpdate(null);
    updateStockForm.reset();
  };

  return (
    <div className="flex flex-col h-screen bg-amber-50/20 dark:bg-slate-900">
      <Header bakeryName="Artisan Bakery" userName="Chef Remy" userInitials="CR" />
      <div className="flex flex-1 overflow-hidden">
        <CollapsibleSidebar />
        <ScrollArea className="flex-1 p-4 md:p-6 lg:p-8">
          <main className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-amber-200 dark:border-slate-700">
              <h1 className="text-2xl md:text-3xl font-semibold text-amber-800 dark:text-amber-300">
                Inventory Tracking
              </h1>
              <Button onClick={() => setIsAddIngredientDialogOpen(true)} className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add New Ingredient
              </Button>
            </div>

            {ingredients.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-slate-400 py-10">
                No ingredients found. Start by adding some!
              </p>
            ) : (
              <div className="space-y-4">
                {ingredients.map(ingredient => (
                  <IngredientListItem
                    key={ingredient.id}
                    id={ingredient.id}
                    name={ingredient.name}
                    currentQuantity={ingredient.currentQuantity}
                    unit={ingredient.unit}
                    reorderPoint={ingredient.reorderPoint}
                    onUpdateStock={() => handleOpenUpdateStockDialog(ingredient.id)}
                  />
                ))}
              </div>
            )}
          </main>
        </ScrollArea>
      </div>
      <Footer />

      {/* Add Ingredient Dialog */}
      <Dialog open={isAddIngredientDialogOpen} onOpenChange={setIsAddIngredientDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-slate-800">
          <DialogHeader>
            <DialogTitle className="text-amber-800 dark:text-amber-300">Add New Ingredient</DialogTitle>
            <DialogDescription>
              Fill in the details for the new ingredient.
            </DialogDescription>
          </DialogHeader>
          <Form {...addIngredientForm}>
            <form onSubmit={addIngredientForm.handleSubmit(handleAddIngredientSubmit)} className="space-y-4">
              <FormField
                control={addIngredientForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 dark:text-slate-300">Ingredient Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., All-Purpose Flour" {...field} className="dark:bg-slate-700 dark:text-white dark:border-slate-600" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addIngredientForm.control}
                name="currentQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 dark:text-slate-300">Current Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} className="dark:bg-slate-700 dark:text-white dark:border-slate-600" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addIngredientForm.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 dark:text-slate-300">Unit</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="dark:bg-slate-700 dark:text-white dark:border-slate-600">
                          <SelectValue placeholder="Select a unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                        {ingredientUnits.map(unit => (
                          <SelectItem key={unit} value={unit} className="hover:!bg-amber-100 dark:hover:!bg-slate-700">
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addIngredientForm.control}
                name="reorderPoint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 dark:text-slate-300">Reorder Point (Optional)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 100" {...field} value={field.value ?? ''} className="dark:bg-slate-700 dark:text-white dark:border-slate-600" />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Leave blank or 0 if not applicable.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600">Save Ingredient</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Update Stock Dialog */}
      {ingredientToUpdate && (
        <Dialog open={isUpdateStockDialogOpen} onOpenChange={(isOpen) => {
          setIsUpdateStockDialogOpen(isOpen);
          if (!isOpen) setIngredientToUpdate(null);
        }}>
          <DialogContent className="sm:max-w-xs bg-white dark:bg-slate-800">
            <DialogHeader>
              <DialogTitle className="text-amber-800 dark:text-amber-300">Update Stock: {ingredientToUpdate.name}</DialogTitle>
              <DialogDescription>
                Enter the new current quantity for this ingredient.
              </DialogDescription>
            </DialogHeader>
            <Form {...updateStockForm}>
              <form onSubmit={updateStockForm.handleSubmit(handleUpdateStockSubmit)} className="space-y-4">
                <FormField
                  control={updateStockForm.control}
                  name="newQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 dark:text-slate-300">New Quantity ({ingredientToUpdate.unit})</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} className="dark:bg-slate-700 dark:text-white dark:border-slate-600" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <DialogClose asChild>
                     <Button type="button" variant="outline" className="dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600">Update Stock</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default InventoryTrackingPage;