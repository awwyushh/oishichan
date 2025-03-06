"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { EyeIcon, EyeOffIcon, ChefHat, Mail, Lock, ArrowRight } from "lucide-react"
import { FcGoogle } from "react-icons/fc";
import { RiFacebookBoxFill } from "react-icons/ri";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-muted/50 to-background p-4 md:p-8">
      <Link href="/" className="absolute top-4 left-4 flex items-center gap-2 text-primary font-medium">
        <ChefHat className="h-5 w-5" />
        <span>OishiChan</span>
      </Link>

      <div className="w-full max-w-5xl grid gap-8 md:grid-cols-2 items-center">
        <div className="hidden md:flex flex-col items-center justify-center space-y-4">
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/oishi_log.jpeg"
              alt="Delicious food spread"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h2 className="text-white text-2xl font-bold">Welcome Back, Food Lover!</h2>
              <p className="text-white/90 mt-2">
                Sign in to access your saved recipes, meal plans, and continue your culinary journey.
              </p>
            </div>
          </div>

          <div className="bg-muted/80 backdrop-blur-sm rounded-lg p-4 w-full">
            <blockquote className="italic text-muted-foreground">
              "Cooking is like love. It should be entered into with abandon or not at all."
              <footer className="text-right mt-2 font-medium">— Harriet Van Horne</footer>
            </blockquote>
          </div>
        </div>

        <Card className="w-full shadow-lg border-muted">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Login</CardTitle>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ChefHat className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardDescription>Enter your credentials to access your recipe collection</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" placeholder="chef@example.com" type="email" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
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
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            <Button className="w-full">
              Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">
                <FcGoogle className="h-6 w-6" />
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
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
            <div className="text-xs text-muted-foreground text-center">
              By logging in, you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

