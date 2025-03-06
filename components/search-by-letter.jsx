"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RecipeGrid } from "./recipe-grid"
import { useRecipe } from "./recipe-context"

export function SearchByLetter() {
  const [selectedLetter, setSelectedLetter] = useState("a")
  const [recipes, setRecipes] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { setSelectedRecipe } = useRecipe()

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")

  useEffect(() => {
    fetchRecipesByLetter(selectedLetter)
  }, [selectedLetter])

  const fetchRecipesByLetter = async (letter) => {
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)

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
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {alphabet.map((letter) => (
          <Button
            key={letter}
            variant={selectedLetter === letter ? "default" : "outline"}
            className="w-10 h-10 p-0 font-medium"
            onClick={() => setSelectedLetter(letter)}
          >
            {letter.toUpperCase()}
          </Button>
        ))}
      </div>

      <RecipeGrid recipes={recipes} isLoading={isLoading} error={error} onSelectRecipe={fetchRecipeDetails} />
    </div>
  )
}

