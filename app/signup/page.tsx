"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email") || "",  // Making email optional
      password: formData.get("password"),
      contact_number: formData.get("contact_number"),
      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      country: formData.get("country"),
    }

    // Validation
    if (!data.name || data.name.toString().trim().length < 2) {
      alert("Full Name must be at least 2 characters long.")
      setIsLoading(false)
      return
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.toString())) {  // Validating email only if provided
      alert("Enter a valid email address.")
      setIsLoading(false)
      return
    }
    if (!data.contact_number || !/^\d{10}$/.test(data.contact_number.toString())) {
      alert("Enter a valid 10-digit contact number.")
      setIsLoading(false)
      return
    }
    if (!data.address || data.address.toString().trim().length < 5) {
      alert("Address must be at least 5 characters long.")
      setIsLoading(false)
      return
    }
    if (!data.city || data.city.toString().trim().length < 2) {
      alert("City must be at least 2 characters long.")
      setIsLoading(false)
      return
    }
    if (!data.state || data.state.toString().trim().length < 2) {
      alert("State must be at least 2 characters long.")
      setIsLoading(false)
      return
    }
    if (!data.country || data.country.toString().trim().length < 2) {
      alert("Country must be at least 2 characters long.")
      setIsLoading(false)
      return
    }
    if (!data.password || data.password.toString().length < 6) {
      alert("Password must be at least 6 characters long.")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push("/dashboard")
      } else {
        throw new Error("Registration failed")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold">AgentHub</h1>
          <p className="text-gray-600 mt-2">Create your account</p>
        </div>

        <div className="flex space-x-2 bg-gray-50 p-1 rounded-lg">
          <Link href="/login" className="w-1/2 text-center py-2 text-gray-600 hover:text-gray-900">
            Login
          </Link>
          <div className="w-1/2 text-center bg-white py-2 rounded-md shadow-sm">Register</div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter Full Name"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Email id"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="contact_number">Contact Number</Label>
              <Input
                id="contact_number"
                name="contact_number"
                type="tel"
                required
                placeholder="Your phone number"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                type="text"
                required
                placeholder="Your street address"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  required
                  placeholder="Your city"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  type="text"
                  required
                  placeholder="Your state"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                type="text"
                required
                placeholder="Your country"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="mt-1"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
      </div>
    </div>
  )
}
