import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Pencil } from 'lucide-react';

interface IngredientListItemProps {
  id: string | number;
  name: string;
  currentQuantity: number;
  unit: string;
  reorderPoint?: number; // If not provided, stock status might be simplified
  onUpdateStock: (ingredientId: string | number) => void; // Callback for initiating stock update
}

const IngredientListItem: React.FC<IngredientListItemProps> = ({
  id,
  name,
  currentQuantity,
  unit,
  reorderPoint,
  onUpdateStock,
}) => {
  console.log(`IngredientListItem loaded for: ${name}, ID: ${id}`);

  const getStockInfo = () => {
    // Handles cases where reorderPoint is not provided or invalid (e.g. 0 or negative)
    if (reorderPoint === undefined || reorderPoint <= 0) {
      const hasStock = currentQuantity > 0;
      return {
        percentage: hasStock ? 100 : 0, // Show full bar if in stock and no reorder point, else empty
        // Using neutral sky for 'in stock' and slate for 'out of stock' or unknown
        progressColorClass: hasStock ? 'bg-sky-500' : 'bg-slate-300', 
        label: hasStock ? 'In Stock' : 'Out of Stock',
        badgeClasses: hasStock 
          ? 'text-sky-700 border-sky-500 dark:text-sky-400 dark:border-sky-600' 
          : 'text-slate-700 border-slate-500 dark:text-slate-400 dark:border-slate-600',
      };
    }

    // Calculate visual "fullness" for the progress bar.
    // We consider stock "visually full" at 2x the reorder point.
    // This provides a dynamic range for the progress bar.
    const maxVisualStock = reorderPoint * 2;
    let percentage = (currentQuantity / maxVisualStock) * 100;
    percentage = Math.min(Math.max(percentage, 0), 100); // Clamp between 0 and 100

    if (currentQuantity <= 0) {
      return { 
        percentage: 0, 
        progressColorClass: 'bg-red-500 dark:bg-red-400', 
        label: 'Out of Stock', 
        badgeClasses: 'text-red-700 border-red-500 dark:text-red-400 dark:border-red-600' 
      };
    }
    // Critical: 50% of reorder point or less
    if (currentQuantity <= reorderPoint * 0.5) {
      return { 
        percentage, 
        progressColorClass: 'bg-red-500 dark:bg-red-400', 
        label: 'Critical Low', 
        badgeClasses: 'text-red-700 border-red-500 dark:text-red-400 dark:border-red-600' 
      };
    }
    // Low: Above 50% of reorder point, up to reorder point
    if (currentQuantity <= reorderPoint) {
      return { 
        percentage, 
        progressColorClass: 'bg-orange-500 dark:bg-orange-400', 
        label: 'Low Stock', 
        badgeClasses: 'text-orange-700 border-orange-500 dark:text-orange-400 dark:border-orange-600' 
      };
    }
    // Good: Above reorder point
    return { 
      percentage, 
      progressColorClass: 'bg-green-500 dark:bg-green-400', 
      label: 'Good Stock', 
      badgeClasses: 'text-green-700 border-green-500 dark:text-green-400 dark:border-green-600' 
    };
  };

  const stockInfo = getStockInfo();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 my-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-sm transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.01] dark:hover:shadow-slate-700/50">
      {/* Ingredient Info */}
      <div className="flex-1 mb-3 sm:mb-0 text-center sm:text-left">
        <h3 className="text-lg font-medium text-gray-800 dark:text-slate-100">{name}</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400">
          Quantity: {currentQuantity.toLocaleString()} {unit}
          {reorderPoint !== undefined && reorderPoint > 0 && (
            <span className="block sm:inline sm:ml-2 text-xs text-gray-400 dark:text-slate-500">
              (Reorder at: {reorderPoint.toLocaleString()} {unit})
            </span>
          )}
        </p>
      </div>

      {/* Stock Level Indicator */}
      <div className="w-full sm:w-auto sm:flex-1 sm:max-w-xs mx-0 sm:mx-4 mb-3 sm:mb-0 flex items-center space-x-3">
        <Progress 
          value={stockInfo.percentage} 
          // The color class targets the direct child div (indicator) of the Progress component.
          className={`h-2.5 flex-grow [&>div]:${stockInfo.progressColorClass}`}
          aria-label={`Stock level for ${name}: ${stockInfo.label}`}
        />
        <Badge variant="outline" className={`whitespace-nowrap ${stockInfo.badgeClasses}`}>
          {stockInfo.label}
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex-shrink-0">
        <Button variant="outline" size="sm" onClick={() => onUpdateStock(id)} aria-label={`Update stock for ${name}`}>
          <Pencil className="mr-2 h-4 w-4" />
          Update
        </Button>
      </div>
    </div>
  );
};

export default IngredientListItem;