"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export function RecipeCard({ meal, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
        onClick={() => onSelect(meal.idMeal)}
      >
        <div className="relative pb-[56.25%]">
          <img
            src={meal.strMealThumb || "/placeholder.svg"}
            alt={meal.strMeal}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <CardContent className="flex-grow flex flex-col justify-between p-4">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2">{meal.strMeal}</h3>
          <div className="flex justify-between items-center mt-auto">
            {meal.strCategory && (
              <span className="text-xs px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 rounded-full">
                {meal.strCategory}
              </span>
            )}
            {meal.strArea && (
              <span className="text-xs px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 rounded-full">
                {meal.strArea}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

