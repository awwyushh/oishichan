"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchByName } from "@/components/search-by-name"
import { SearchByLetter } from "@/components/search-by-letter"
import { SearchByCategory } from "@/components/search-by-category"
import { SearchByArea } from "@/components/search-by-area"
import { SearchByIngredient } from "@/components/search-by-ingredient"
import { RecipeProvider } from "@/components/recipe-context"

export default function RecipeApp() {
  return (
    <RecipeProvider>
      <div className="min-h-[90vh] bg-gradient-to-b from-amber-50 to-orange-50 dark:from-zinc-950 dark:to-zinc-900">
        

        <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
          <Tabs defaultValue="name" className="w-full">
            <TabsList className="w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="name">By Name</TabsTrigger>
              <TabsTrigger value="letter">By Letter</TabsTrigger>
              <TabsTrigger value="category">By Category</TabsTrigger>
              <TabsTrigger value="area">By Area</TabsTrigger>
              <TabsTrigger value="ingredient">By Ingredient</TabsTrigger>
            </TabsList>

            <TabsContent value="name">
              <SearchByName />
            </TabsContent>

            <TabsContent value="letter">
              <SearchByLetter />
            </TabsContent>

            <TabsContent value="category">
              <SearchByCategory />
            </TabsContent>

            <TabsContent value="area">
              <SearchByArea />
            </TabsContent>

            <TabsContent value="ingredient">
              <SearchByIngredient />
            </TabsContent>
          </Tabs>
        </main>

      </div>
    </RecipeProvider>
  )
}

