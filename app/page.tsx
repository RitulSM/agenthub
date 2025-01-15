import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Globe2, MapPin, Users, ArrowRight, Building2 } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Building2 className="h-6 w-6" />
          <span className="ml-2 text-xl font-bold">AgentHub</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Sign In
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/signup">
            Register
          </Link>
        </nav>
      </header>
      
      {/* Hero Section */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Manage All Your Orders in One Place
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  The ultimate platform for agents to track, manage, and grow their buy and sell orders across local, state, and global markets.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/signup">
                  <Button>Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription Tiers */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your View Level</h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-xl shadow-sm">
                <div className="p-4 bg-blue-100 rounded-full">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Local View</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Perfect for agents focusing on their personal orders. Track and manage your individual buy and sell orders.
                </p>
                <p className="text-2xl font-bold">$29/mo</p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-xl shadow-sm border-2 border-blue-500">
                <div className="p-4 bg-blue-100 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">State View</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Access to all orders within your state. Perfect for agents looking to expand their reach.
                </p>
                <p className="text-2xl font-bold">$99/mo</p>
                <span className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">Popular</span>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-xl shadow-sm">
                <div className="p-4 bg-blue-100 rounded-full">
                  <Globe2 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Global View</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Full access to orders worldwide. Ideal for agents working with international clients.
                </p>
                <p className="text-2xl font-bold">$299/mo</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 AgentHub. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

