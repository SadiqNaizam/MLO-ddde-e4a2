import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import Footer from '@/components/layout/Footer';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

// Icons
import { Search, PlusCircle, Filter, BookOpen, Clock, Utensils, Tag } from 'lucide-react';

interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[]; // Keep as array for potential mapping
  instructions: string;
  category: string;
  prepTime?: string;
  cookTime?: string;
  servings?: number;
  imageUrl?: string; // Placeholder image from the internet
}

const initialRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Classic Sourdough Bread',
    description: 'A rustic loaf with a tangy flavor and chewy crumb.',
    ingredients: ['500g bread flour', '350g water', '100g sourdough starter', '10g salt'],
    instructions: '1. Mix ingredients. 2. Bulk ferment. 3. Shape and proof. 4. Bake until golden brown.',
    category: 'Bread',
    prepTime: '30 mins (plus fermentation)',
    cookTime: '45 mins',
    servings: 12,
    imageUrl: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Chocolate Chip Cookies',
    description: 'The perfect chewy and gooey chocolate chip cookies.',
    ingredients: ['200g butter', '300g sugar', '2 eggs', '300g flour', '200g chocolate chips'],
    instructions: '1. Cream butter and sugar. 2. Beat in eggs. 3. Fold in flour and chocolate chips. 4. Bake at 180°C.',
    category: 'Cookies',
    prepTime: '20 mins',
    cookTime: '12 mins',
    servings: 24,
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Croissants',
    description: 'Flaky, buttery, and delicate French pastries.',
    ingredients: ['500g flour', '50g sugar', '10g salt', '250g butter (for lamination)', '10g yeast', '250ml milk'],
    instructions: '1. Make dough. 2. Laminate with butter. 3. Shape and proof. 4. Bake until golden.',
    category: 'Pastry',
    prepTime: '3 hours (plus proofing)',
    cookTime: '20 mins',
    servings: 10,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop', // Using a generic pastry image if specific not found
  },
];

const RecipeManagementPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddRecipeDialogOpen, setIsAddRecipeDialogOpen] = useState(false);
  const [newRecipe, setNewRecipe] = useState<Partial<Recipe>>({
    name: '',
    description: '',
    ingredients: [],
    instructions: '',
    category: '',
    prepTime: '',
    cookTime: '',
    servings: undefined,
  });
  // For pagination, usually more complex state is needed (currentPage, itemsPerPage)
  // For this example, we'll just display the component.
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 6;

  useEffect(() => {
    console.log('RecipeManagementPage loaded');
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRecipe(prev => ({ ...prev, [name]: name === 'ingredients' ? value.split(',').map(s => s.trim()) : value }));
  };
  
  const handleServingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRecipe(prev => ({ ...prev, servings: e.target.value ? parseInt(e.target.value) : undefined }));
  };

  const handleSaveNewRecipe = () => {
    if (newRecipe.name && newRecipe.description) {
      const recipeToAdd: Recipe = {
        id: String(Date.now()), // Simple ID generation
        name: newRecipe.name || 'Unnamed Recipe',
        description: newRecipe.description || 'No description.',
        ingredients: newRecipe.ingredients || [],
        instructions: newRecipe.instructions || '',
        category: newRecipe.category || 'Uncategorized',
        prepTime: newRecipe.prepTime,
        cookTime: newRecipe.cookTime,
        servings: newRecipe.servings,
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop', // Default new recipe image
      };
      setRecipes(prev => [recipeToAdd, ...prev]);
      setIsAddRecipeDialogOpen(false);
      setNewRecipe({ name: '', description: '', ingredients: [], instructions: '', category: '' }); // Reset form
      console.log('New recipe saved:', recipeToAdd);
    } else {
      console.error('Recipe name and description are required.');
      // Optionally, show a toast notification here
    }
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen bg-amber-50/20 dark:bg-slate-900/50">
      <Header bakeryName="Artisan Bakery Dashboard" userName="Chef Baker" userInitials="CB" />
      <div className="flex flex-1">
        <CollapsibleSidebar />
        <ScrollArea className="flex-1">
          <main className="p-6 container mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h1 className="text-3xl font-semibold text-amber-800 dark:text-amber-300 flex items-center">
                <BookOpen className="mr-3 h-8 w-8" /> Recipe Management
              </h1>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <DialogTrigger asChild>
                   <Button onClick={() => setIsAddRecipeDialogOpen(true)} className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white">
                    <PlusCircle className="mr-2 h-5 w-5" /> Add New Recipe
                  </Button>
                </DialogTrigger>
                <Button variant="outline" className="border-amber-400 text-amber-700 hover:bg-amber-100 dark:border-amber-600 dark:text-amber-300 dark:hover:bg-slate-700">
                  <Filter className="mr-2 h-5 w-5" /> Filter
                </Button>
              </div>
            </div>

            <div className="mb-6 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <Input
                type="search"
                placeholder="Search recipes by name, category, or ingredients..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 w-full border-amber-300 dark:border-slate-600 focus:border-amber-500 dark:focus:border-amber-400 ring-offset-background focus-visible:ring-amber-500"
              />
            </div>

            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map(recipe => (
                  <Card key={recipe.id} className="flex flex-col bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden border-amber-200 dark:border-slate-700">
                    {recipe.imageUrl && (
                      <div className="h-48 w-full overflow-hidden">
                        <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-amber-700 dark:text-amber-400">{recipe.name}</CardTitle>
                      <CardDescription className="text-sm text-gray-600 dark:text-slate-400 h-10 overflow-hidden text-ellipsis">
                        {recipe.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-3">
                      <div>
                        <h4 className="text-xs font-semibold uppercase text-gray-500 dark:text-slate-500 mb-1">Category</h4>
                        <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-slate-700 dark:text-amber-300">{recipe.category}</Badge>
                      </div>
                      { (recipe.prepTime || recipe.cookTime || recipe.servings) &&
                        <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 dark:text-slate-400">
                          {recipe.prepTime && <div className="flex items-center"><Clock size={14} className="mr-1"/> {recipe.prepTime}</div>}
                          {recipe.cookTime && <div className="flex items-center"><Utensils size={14} className="mr-1"/> {recipe.cookTime}</div>}
                          {recipe.servings && <div className="flex items-center"><Tag size={14} className="mr-1"/> {recipe.servings} serv.</div>}
                        </div>
                      }
                       <div>
                        <h4 className="text-xs font-semibold uppercase text-gray-500 dark:text-slate-500 mb-1">Key Ingredients</h4>
                        <p className="text-sm text-gray-600 dark:text-slate-300 truncate">
                            {recipe.ingredients.slice(0, 3).join(', ')}{recipe.ingredients.length > 3 ? '...' : ''}
                        </p>
                       </div>
                    </CardContent>
                    <CardFooter className="p-4 border-t border-amber-100 dark:border-slate-700">
                      <Button variant="outline" className="w-full border-amber-500 text-amber-600 hover:bg-amber-50 dark:border-amber-500 dark:text-amber-400 dark:hover:bg-slate-700">
                        View Recipe Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400 dark:text-slate-500 mb-4" />
                <p className="text-lg text-gray-600 dark:text-slate-300">No recipes found matching "{searchTerm}".</p>
                <p className="text-sm text-gray-500 dark:text-slate-400">Try a different search term or add a new recipe!</p>
              </div>
            )}

            {/* Pagination Example */}
            {filteredRecipes.length > 0 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </main>
        </ScrollArea>
      </div>
      <Footer />

      {/* Add/Edit Recipe Dialog */}
      <Dialog open={isAddRecipeDialogOpen} onOpenChange={setIsAddRecipeDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white dark:bg-slate-800 border-amber-300 dark:border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-2xl text-amber-700 dark:text-amber-400">Add New Recipe</DialogTitle>
            <DialogDescription className="text-slate-600 dark:text-slate-400">
              Fill in the details of your new culinary creation.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-slate-700 dark:text-slate-300">Name</Label>
              <Input id="name" name="name" value={newRecipe.name || ''} onChange={handleInputChange} className="col-span-3 border-amber-300 dark:border-slate-600" placeholder="e.g., Sourdough Bread"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right text-slate-700 dark:text-slate-300">Description</Label>
              <Textarea id="description" name="description" value={newRecipe.description || ''} onChange={handleInputChange} className="col-span-3 border-amber-300 dark:border-slate-600" placeholder="A short summary of the recipe"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ingredients" className="text-right text-slate-700 dark:text-slate-300">Ingredients</Label>
              <Textarea id="ingredients" name="ingredients" value={(newRecipe.ingredients || []).join(', ')} onChange={handleInputChange} className="col-span-3 border-amber-300 dark:border-slate-600" placeholder="Comma-separated, e.g., flour, water, salt"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="instructions" className="text-right text-slate-700 dark:text-slate-300">Instructions</Label>
              <Textarea id="instructions" name="instructions" value={newRecipe.instructions || ''} onChange={handleInputChange} className="col-span-3 min-h-[100px] border-amber-300 dark:border-slate-600" placeholder="Step-by-step instructions"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right text-slate-700 dark:text-slate-300">Category</Label>
              <Input id="category" name="category" value={newRecipe.category || ''} onChange={handleInputChange} className="col-span-3 border-amber-300 dark:border-slate-600" placeholder="e.g., Bread, Pastry, Dessert"/>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-2 items-center gap-2">
                    <Label htmlFor="prepTime" className="text-right text-slate-700 dark:text-slate-300">Prep Time</Label>
                    <Input id="prepTime" name="prepTime" value={newRecipe.prepTime || ''} onChange={handleInputChange} className="border-amber-300 dark:border-slate-600" placeholder="e.g., 30 mins"/>
                </div>
                <div className="grid grid-cols-2 items-center gap-2">
                    <Label htmlFor="cookTime" className="text-right text-slate-700 dark:text-slate-300">Cook Time</Label>
                    <Input id="cookTime" name="cookTime" value={newRecipe.cookTime || ''} onChange={handleInputChange} className="border-amber-300 dark:border-slate-600" placeholder="e.g., 45 mins"/>
                </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="servings" className="text-right text-slate-700 dark:text-slate-300">Servings</Label>
                <Input id="servings" name="servings" type="number" value={newRecipe.servings || ''} onChange={handleServingsChange} className="col-span-1 border-amber-300 dark:border-slate-600" placeholder="e.g., 4"/>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRecipeDialogOpen(false)} className="border-slate-400 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">Cancel</Button>
            <Button onClick={handleSaveNewRecipe} className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white">Save Recipe</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecipeManagementPage;