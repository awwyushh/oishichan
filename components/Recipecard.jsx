// components/RecipeCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function RecipeCard({ recipe }) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{recipe.strMeal}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal} 
          width={400} 
          height={300} 
          className="rounded-lg"
        />
        <p className="mt-2 text-sm text-gray-600">{recipe.strCategory}</p>
        <p className="mt-2 text-gray-800">{recipe.strInstructions.slice(0, 100)}...</p>
      </CardContent>
    </Card>
  );
}
