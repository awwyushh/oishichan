import { RecipeCard } from "./recipe-card"
import { RecipeDetail } from "./recipe-detail"
import { RecipeSkeleton } from "./recipe-skeleton"
import { useRecipe } from "./recipe-context"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function RecipeGrid({ recipes, isLoading, error, onSelectRecipe }) {
  const { isLoading: contextLoading } = useRecipe()

  if (isLoading || contextLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <RecipeSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!recipes || recipes.length === 0) {
    return (
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No recipes found</AlertTitle>
        <AlertDescription>Try a different search term or filter.</AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} onSelect={onSelectRecipe} />
        ))}
      </div>
      <RecipeDetail />
    </>
  )
}

