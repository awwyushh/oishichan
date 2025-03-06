"use client"

import { useState, useEffect } from "react"
import { RecipeGrid } from "./recipe-grid"
import { useRecipe } from "./recipe-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SearchByCategory() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [recipes, setRecipes] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { setSelectedRecipe } = useRecipe()

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      fetchRecipesByCategory(selectedCategory)
    }
  }, [selectedCategory])

  const fetchCategories = async () => {
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")

      if (!res.ok) {
        throw new Error("Failed to fetch categories")
      }

      const data = await res.json()
      setCategories(data.categories || [])

      if (data.categories && data.categories.length > 0) {
        setSelectedCategory(data.categories[0].strCategory)
      }
    } catch (err) {
      setError("An error occurred while fetching categories")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchRecipesByCategory = async (category) => {
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)

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

  if (categories.length === 0 && !isLoading) {
    return <div>No categories found</div>
  }

  return (
    <div>
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
        <TabsList className="flex flex-wrap h-auto p-1 mb-4">
          {categories.map((category) => (
            <TabsTrigger key={category.strCategory} value={category.strCategory} className="px-3 py-1.5 m-1">
              {category.strCategory}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.strCategory} value={category.strCategory}>
            <div className="mb-6 bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <img
                  src={category.strCategoryThumb || "/placeholder.svg"}
                  alt={category.strCategory}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <p className="text-sm">{category.strCategoryDescription}</p>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <RecipeGrid recipes={recipes} isLoading={isLoading} error={error} onSelectRecipe={fetchRecipeDetails} />
    </div>
  )
}

