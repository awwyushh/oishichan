import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronRight, MessageCircle, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getTopRecipes } from "@/lib/dailyrecipes";
import RecipeCard from "@/components/Recipecard";



export default async function Landing() {

  const recipes = await getTopRecipes();

  return (
    <div>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover Delicious Recipes for Every Taste
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Find, save, and share your favorite recipes. Get personalized recommendations and cooking tips from
                    OishiChan AI.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1">
                    <span>Explore Recipes</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Link href="/oishichan">
                    <Button variant="outline" size="lg" className="gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>Chat with OishiChan</span>
                    </Button>
                  </Link>
                </div>
              </div>
              <Image
                src="/collage.jpg"
                width={550}
                height={550}
                alt="Delicious food collage"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full"
              />
            </div>
          </div>
        </section>

        {/* OishiChan AI Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[400px_1fr] lg:gap-12 xl:grid-cols-[500px_1fr]">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Avatar className="h-40 w-40">
                  <AvatarImage src="/logo.png" alt="OishiChan" />
                  <AvatarFallback>OC</AvatarFallback>
                </Avatar>
                <div className="space-y-2 text-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet OishiChan</h2>
                  <p className="text-muted-foreground md:text-xl">Your AI cooking assistant</p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">AI-Powered</div>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    OishiChan helps you find recipes based on ingredients you have, dietary restrictions, or cuisine
                    preferences. Ask questions about cooking techniques, ingredient substitutions, or get personalized
                    meal plans.
                  </p>
                </div>
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/logo.png" alt="OishiChan" />
                      <AvatarFallback>OC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">OishiChan</p>
                      <p className="text-sm text-muted-foreground">
                        Hello! I can help you find the perfect recipe. What ingredients do you have on hand today?
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button className="w-full gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <Link href="/oishichan">Chat with OishiChan</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Login/Signup Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Join Our Cooking Community
                </h2>
                <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl/relaxed">
                  Create an account to save your favorite recipes, share your own creations, and get personalized
                  recommendations.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="lg" className="w-full">
                    Login
                  </Button>
                  <Button size="lg" className="w-full">
                    Sign Up
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Recipes Section */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <RecipeCard key={recipe.idMeal} recipe={recipe} />
              ))
            ) : (
              <p className="text-center col-span-full">
                Unable to load recipes at this time. Please try again later.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

