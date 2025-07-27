import { Button } from "@/shared/components/ui/button";
import { Category } from "@/shared/types";
import { Skeleton } from "@/shared/components/ui/skeleton";

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  isLoading?: boolean;
}

export function CategorySelector({ categories, selectedCategory, onCategoryChange, isLoading = false }: CategorySelectorProps) {
  if (isLoading) {
    return (
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 9 }).map((_, index) => (
            <Skeleton key={index} className="h-9 w-24 rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category._id}
            variant={selectedCategory === category._id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category._id)}
            className="text-sm capitalize"
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
} 