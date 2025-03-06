"use client"

import { createContext, useContext, useState } from "react"

const RecipeContext = createContext(undefined)

export function RecipeProvider({ children }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <RecipeContext.Provider value={{ selectedRecipe, setSelectedRecipe, isLoading, setIsLoading }}>
      {children}
    </RecipeContext.Provider>
  )
}

export function useRecipe() {
  const context = useContext(RecipeContext)
  if (context === undefined) {
    throw new Error("useRecipe must be used within a RecipeProvider")
  }
  return context
}

