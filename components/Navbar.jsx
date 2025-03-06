"use client"

import React from 'react'
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, LogIn, Menu, X } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 p-5">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="Oishi"
                            width={58}
                            height={58}
                            className="rounded-md"
                        />
                        <span className="hidden font-bold sm:inline-block text-[2rem] select-none">Oishi</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center justify-between gap-14">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search recipes..."
                            className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
                        />
                    </div>
                    <div className='flex gap-4 items-center'>
                    <Link href="/recipes" className="text-sm font-medium hover:text-primary">
                        Recipes
                    </Link>
                    <Link href="/categories" className="text-sm font-medium hover:text-primary">
                        Categories
                    </Link>
                    <Link href="/about" className="text-sm font-medium hover:text-primary">
                        About
                    </Link>
                    <Link href="/login">
                        <Button variant="outline" size="sm" className="flex-1 gap-1">
                            <LogIn className="h-4 w-4" />
                            <span>Login</span>
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button size="sm" className="flex-1">Sign Up</Button>
                    </Link>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={toggleMenu} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="container md:hidden p-6 py-4 pb-6">
                    <div className="relative mb-4">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search recipes..." className="w-full bg-background pl-8" />
                    </div>
                    <nav className="flex flex-col space-y-4">
                        <Link
                            href="/recipes"
                            className="text-sm font-medium hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Recipes
                        </Link>
                        <Link
                            href="/categories"
                            className="text-sm font-medium hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Categories
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-medium hover:text-primary"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>
                        <div className="flex gap-2 pt-2">
                            <Link href="/login">
                                <Button variant="outline" size="sm" className="flex-1 gap-1">
                                    <LogIn className="h-4 w-4" />
                                    <span>Login</span>
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button size="sm" className="flex-1">Sign Up</Button>
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}

export default Navbar