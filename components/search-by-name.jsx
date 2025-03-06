"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RecipeGrid } from "./recipe-grid"
import { useRecipe } from "./recipe-context"
import { Search } from "lucide-react"

export function SearchByName() {
  const [search, setSearch] = useState("")
  const [recipes, setRecipes] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { setSelectedRecipe } = useRecipe()

  const fetchRecipes = async () => {
    if (!search.trim()) return

    setIsLoading(true)
    setError("")

    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchRecipes()
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-8 max-w-xl mx-auto">
        <Input
          placeholder="Search for a recipe (e.g., pasta, chicken, curry)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" disabled={isLoading} className="gap-2">
          <Search className="h-4 w-4" />
          Search
        </Button>
      </form>

      <RecipeGrid recipes={recipes} isLoading={isLoading} error={error} onSelectRecipe={fetchRecipeDetails} />
    </div>
  )
}

