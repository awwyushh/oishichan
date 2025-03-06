import React from 'react'
import Link from 'next/link'
import Image from 'next/image'


const Footer = () => {
  return (
    <footer className="w-full border-t bg-background">
        <div className="container flex flex-col gap-6 py-8 md:py-12 p-6">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Explore</h3>
              <ul className="space-y-2">
                <li> 
                  <Link href="/recipes" className="text-sm text-muted-foreground hover:text-foreground">
                    Recipes
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-sm text-muted-foreground hover:text-foreground">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/popular" className="text-sm text-muted-foreground hover:text-foreground">
                    Popular
                  </Link>
                </li>
                <li>
                  <Link href="/new" className="text-sm text-muted-foreground hover:text-foreground">
                    Newest
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Community</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/chefs" className="text-sm text-muted-foreground hover:text-foreground">
                    Chefs
                  </Link>
                </li>
                <li>
                  <Link href="/forum" className="text-sm text-muted-foreground hover:text-foreground">
                    Forum
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-sm text-muted-foreground hover:text-foreground">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Help</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                    Cookies
                  </Link>
                </li>
                <li>
                  <Link href="/licenses" className="text-sm text-muted-foreground hover:text-foreground">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png?height=32&width=32"
                alt="Recipe Finder Logo"
                width={32}
                height={32}
                className="rounded-md"
              />
              <span className="font-bold">Oishi</span>
            </div>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Oishi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer