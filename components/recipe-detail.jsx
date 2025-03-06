"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRecipe } from "./recipe-context"
import { ExternalLink, UtensilsCrossed } from "lucide-react"
import { motion } from "framer-motion"

export function RecipeDetail() {
  const { selectedRecipe, setSelectedRecipe } = useRecipe()

  if (!selectedRecipe) return null

  // Extract ingredients and measurements
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = selectedRecipe[`strIngredient${i}`]
    const measure = selectedRecipe[`strMeasure${i}`]

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        name: ingredient,
        measure: measure || "",
      })
    }
  }

  // Format instructions into steps
  const instructions = selectedRecipe.strInstructions
    .split(/\r\n|\n|\r/)
    .filter((step) => step.trim() !== "")
    .map((step) => step.trim())

  return (
    <Dialog open={!!selectedRecipe} onOpenChange={(open) => !open && setSelectedRecipe(null)}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{selectedRecipe.strMeal}</DialogTitle>
          <DialogDescription className="flex flex-wrap gap-2 mt-2">
            {selectedRecipe.strCategory && (
              <Badge
                variant="outline"
                className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 border-amber-200 dark:border-amber-800"
              >
                {selectedRecipe.strCategory}
              </Badge>
            )}
            {selectedRecipe.strArea && (
              <Badge
                variant="outline"
                className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 border-orange-200 dark:border-orange-800"
              >
                {selectedRecipe.strArea}
              </Badge>
            )}
            {selectedRecipe.strTags &&
              selectedRecipe.strTags.split(",").map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 border-blue-200 dark:border-blue-800"
                >
                  {tag.trim()}
                </Badge>
              ))}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg overflow-hidden"
          >
            <img
              src={selectedRecipe.strMealThumb || "/placeholder.svg"}
              alt={selectedRecipe.strMeal}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </motion.div>

          <div>
            <Tabs defaultValue="ingredients">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
              </TabsList>

              <TabsContent value="ingredients" className="mt-4">
                <ul className="space-y-2">
                  {ingredients.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="flex items-center gap-2 p-2 rounded-md bg-amber-50 dark:bg-amber-950/30"
                    >
                      <UtensilsCrossed className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      <span className="font-medium">{item.measure}</span>
                      <span>{item.name}</span>
                    </motion.li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="instructions" className="mt-4">
                <ol className="space-y-4">
                  {instructions.map((step, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="flex gap-3"
                    >
                      <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 font-medium text-sm">
                        {index + 1}
                      </span>
                      <p>{step}</p>
                    </motion.li>
                  ))}
                </ol>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {selectedRecipe.strYoutube && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Video Tutorial</h3>
            <Button variant="outline" className="gap-2" asChild>
              <a href={selectedRecipe.strYoutube} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Watch on YouTube
              </a>
            </Button>
          </div>
        )}

        {selectedRecipe.strSource && (
          <div className="mt-4">
            <Button variant="outline" className="gap-2" asChild>
              <a href={selectedRecipe.strSource} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                View Original Source
              </a>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

