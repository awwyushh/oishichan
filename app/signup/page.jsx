"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EyeIcon, EyeOffIcon, ChefHat, User, Mail, Lock, Utensils, ArrowRight, } from "lucide-react"
import { FcGoogle } from "react-icons/fc";
import { RiFacebookBoxFill } from "react-icons/ri";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-muted/50 to-background p-4 md:p-8">
      <Link href="/" className="absolute top-4 left-4 flex items-center gap-2 text-primary font-medium">
        <ChefHat className="h-5 w-5" />
        <span>OishiChan</span>
      </Link>

      <div className="w-full max-w-5xl grid gap-8 md:grid-cols-2 items-center">
        <Card className="w-full shadow-lg border-muted">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Utensils className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardDescription>Join our cooking community and start your culinary adventure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="name" placeholder="Chef Gordon" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" placeholder="chef@example.com" type="email" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="password" type={showPassword ? "text" : "password"} className="pl-10 pr-10" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cooking-level">Cooking Experience</Label>
              <Select>
                <SelectTrigger id="cooking-level">
                  <SelectValue placeholder="Select your cooking level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner - I burn toast</SelectItem>
                  <SelectItem value="intermediate">Intermediate - I can follow a recipe</SelectItem>
                  <SelectItem value="advanced">Advanced - I improvise in the kitchen</SelectItem>
                  <SelectItem value="professional">Professional - I am a chef</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button className="w-full">
              Create Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">
                <FcGoogle/>
                Google
              </Button>
              <Button variant="outline">
                <RiFacebookBoxFill/>
                Facebook
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>

        <div className="hidden md:flex flex-col items-center justify-center space-y-6">
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/oishi_login.jpeg"
              alt="Cooking ingredients"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h2 className="text-white text-2xl font-bold">Join Our Foodie Community</h2>
              <p className="text-white/90 mt-2">
                Create an account to save recipes, share your culinary creations, and get personalized recommendations
                from OishiChan.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full">
            <div className="bg-muted/80 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center text-center">
              <Utensils className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Save Recipes</h3>
              <p className="text-xs text-muted-foreground mt-1">Build your personal cookbook</p>
            </div>
            <div className="bg-muted/80 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center text-center">
              <ChefHat className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Get Inspired</h3>
              <p className="text-xs text-muted-foreground mt-1">Discover new dishes daily</p>
            </div>
            <div className="bg-muted/80 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center text-center">
              <User className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Connect</h3>
              <p className="text-xs text-muted-foreground mt-1">Join a community of food lovers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

