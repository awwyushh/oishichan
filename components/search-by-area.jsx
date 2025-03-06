"use client"

import { useState, useEffect } from "react"
import { RecipeGrid } from "./recipe-grid"
import { useRecipe } from "./recipe-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SearchByArea() {
  const [areas, setAreas] = useState([])
  const [selectedArea, setSelectedArea] = useState("")
  const [recipes, setRecipes] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { setSelectedRecipe } = useRecipe()

  useEffect(() => {
    fetchAreas()
  }, [])

  useEffect(() => {
    if (selectedArea) {
      fetchRecipesByArea(selectedArea)
    }
  }, [selectedArea])

  const fetchAreas = async () => {
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")

      if (!res.ok) {
        throw new Error("Failed to fetch areas")
      }

      const data = await res.json()
      setAreas(data.meals || [])

      if (data.meals && data.meals.length > 0) {
        setSelectedArea(data.meals[0].strArea)
      }
    } catch (err) {
      setError("An error occurred while fetching areas")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchRecipesByArea = async (area) => {
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)

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
        <label className="block text-sm font-medium mb-2">Select Cuisine</label>
        <Select value={selectedArea} onValueChange={setSelectedArea}>
          <SelectTrigger>
            <SelectValue placeholder="Select a cuisine" />
          </SelectTrigger>
          <SelectContent>
            {areas.map((area) => (
              <SelectItem key={area.strArea} value={area.strArea}>
                {area.strArea}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <RecipeGrid recipes={recipes} isLoading={isLoading} error={error} onSelectRecipe={fetchRecipeDetails} />
    </div>
  )
}

