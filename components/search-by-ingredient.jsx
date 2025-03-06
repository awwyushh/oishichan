"use client"

import { useState, useEffect } from "react"
import { RecipeGrid } from "./recipe-grid"
import { useRecipe } from "./recipe-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SearchByIngredient() {
  const [ingredients, setIngredients] = useState([])
  const [selectedIngredient, setSelectedIngredient] = useState("")
  const [recipes, setRecipes] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { setSelectedRecipe } = useRecipe()

  useEffect(() => {
    fetchIngredients()
  }, [])

  useEffect(() => {
    if (selectedIngredient) {
      fetchRecipesByIngredient(selectedIngredient)
    }
  }, [selectedIngredient])

  const fetchIngredients = async () => {
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")

      if (!res.ok) {
        throw new Error("Failed to fetch ingredients")
      }

      const data = await res.json()
      setIngredients(data.meals || [])

      if (data.meals && data.meals.length > 0) {
        setSelectedIngredient(data.meals[0].strIngredient)
      }
    } catch (err) {
      setError("An error occurred while fetching ingredients")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchRecipesByIngredient = async (ingredient) => {
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)

      if (!res.ok) {
        throw new Error("Failed to fetch recipes")
      }

      const data = await res.json()
      setRecipes(data.meals || [])
    } catch (err) {
      setError("An error occurred while fetching recipes")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchRecipeDetails = async (id) => {
    setIsLoading(true)
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)

      if (!res.ok) {
        throw new Error("Failed to fetch recipe details")
      }

      const data = await res.json()
      setSelectedRecipe(data.meals[0])
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="max-w-xs mx-auto mb-8">
        <label className="block text-sm font-medium mb-2">Select Ingredient</label>
        <Select value={selectedIngredient} onValueChange={setSelectedIngredient}>
          <SelectTrigger>
            <SelectValue placeholder="Select an ingredient" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {ingredients.map((ingredient) => (
              <SelectItem key={ingredient.strIngredient} value={ingredient.strIngredient}>
                {ingredient.strIngredient}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <RecipeGrid recipes={recipes} isLoading={isLoading} error={error} onSelectRecipe={fetchRecipeDetails} />
    </div>
  )
}

